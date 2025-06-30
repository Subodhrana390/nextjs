import { query, rowToChallenge } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get("difficulty");
    const language = searchParams.get("language");

    let queryText = "SELECT * FROM challenges";
    const queryParams = [];

    if (difficulty || language) {
      queryText += " WHERE ";
      const conditions = [];

      if (difficulty) {
        conditions.push(`difficulty = $${queryParams.length + 1}`);
        queryParams.push(difficulty);
      }

      if (language) {
        conditions.push(`language = $${queryParams.length + 1}`);
        queryParams.push(language);
      }

      queryText += conditions.join(" AND ");
    }

    queryText += " ORDER BY created_at DESC";

    const result = await query(queryText, queryParams);
    const challenges = result.rows.map(rowToChallenge);

    return Response.json(challenges);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      title,
      description,
      difficulty,
      language,
      timeLimit,
      reward,
      starterCode,
      evaluationCriteria,
    } = await request.json();

    const result = await query(
      `INSERT INTO challenges (
        title, description, difficulty, language, 
        time_limit, reward, starter_code, evaluation_criteria
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        title,
        description,
        difficulty,
        language,
        timeLimit,
        reward,
        starterCode,
        JSON.stringify(evaluationCriteria),
      ]
    );

    return Response.json(rowToChallenge(result.rows[0]), { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
