import { useState } from "react";

export function useCodeEvaluation() {
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState(null);

  const evaluateCode = async ({ code, challengeId, language }) => {
    setIsEvaluating(true);
    setError(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, challengeId, language }),
      });

      if (!response.ok) {
        throw new Error("Evaluation failed");
      }

      const result = await response.json();
      setEvaluation(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsEvaluating(false);
    }
  };

  return { evaluateCode, evaluation, isEvaluating, error };
}
