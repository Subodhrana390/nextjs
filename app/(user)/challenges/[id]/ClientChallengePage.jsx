"use client";
import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { SkillBadge } from "@/components/SkillBadge";

export function ClientChallengePage({ challenge }) {
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleEvaluationComplete = (result) => {
    setEvaluationResult(result);
  };

  return (
    <div className="px-4 py-8 bg-[#0a0a0f]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Challenge Details Section */}
        <section className="flex-1 space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold text-[#f0f0ff]">
              {challenge.title}
            </h1>
            <div className="flex items-center gap-3">
              <SkillBadge level={challenge.difficulty} />
              <span className="text-sm text-[#a0a0c0] font-mono">
                {challenge.language.toUpperCase()} • {challenge.timeLimit} min
              </span>
            </div>
          </header>

          <article className="prose prose-invert max-w-none">
            <p className="text-[#d0d0e0] leading-relaxed">
              {challenge.description}
            </p>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-[#e0e0ff] mb-3">
                Evaluation Criteria
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-[#c0c0e0]">
                {challenge.evaluationCriteria.map((criteria, index) => (
                  <li key={`criteria-${index}`}>{criteria}</li>
                ))}
              </ul>
            </section>
          </article>
        </section>

        {/* Code Editor Section */}
        <section className="flex-1">
          <div className="h-[500px]">
            <CodeEditor
              challenge={challenge}
              onEvaluationComplete={handleEvaluationComplete}
              className="border border-[#252535] rounded-lg overflow-hidden"
            />

            {evaluationResult && (
              <div className="mt-6 p-5 bg-[#151520]/90 backdrop-blur-sm rounded-lg border border-[#303040]">
                <h3 className="font-bold text-lg text-[#f0f0ff] mb-3">
                  Evaluation Results
                </h3>
                <div className="p-3 bg-[#101018] rounded-md overflow-auto max-h-60">
                  <pre className="text-sm font-mono text-[#d0d0e0]">
                    {JSON.stringify(evaluationResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
