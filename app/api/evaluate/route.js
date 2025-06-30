import { query } from "@/lib/db";
import { OpenAI } from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function getChallengeById(id) {
  const result = await query(
    `SELECT 
      id,
      title,
      description,
      difficulty,
      language,
      time_limit as "timeLimit",
      evaluation_criteria as "evaluationCriteria"
    FROM challenges 
    WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error(`Challenge not found`);
  }

  return result.rows[0];
}

export async function POST(request) {
  const { code, challengeId, language } = await request.json();

  try {
    // Get challenge details from your database
    const challenge = await getChallengeById(challengeId);

    const prompt = `
      You are a senior ${language} developer evaluating a coding challenge for SkillProof.
      Challenge: ${challenge.description}
      Evaluation Criteria: ${challenge.evaluationCriteria.join(", ")}

      Analyze this submission:
      ${code}

      Provide feedback in this JSON format:
      {
        "score": 0-100,
        "feedback": {
          "correctness": "Does the code work as intended?",
          "efficiency": "How optimal is the solution?",
          "bestPractices": "Does it follow language best practices?",
          "edgeCases": "Does it handle edge cases properly?"
        },
        "suggestions": ["specific improvement suggestions"],
        "optimizedSolution": "show an optimized version if applicable"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a code evaluation AI that provides strict, professional feedback on programming challenges.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    return Response.json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
