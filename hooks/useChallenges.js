import { useEffect, useState } from "react";

export function useChallenges({ difficulty, language } = {}) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0); // Debug counter

  useEffect(() => {
    const controller = new AbortController(); // For request cancellation
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setRequestCount((prev) => prev + 1); // Track calls
        console.log(`API call #${requestCount + 1}`); // Debug log

        let url = "/api/challenges";
        const params = new URLSearchParams();

        if (difficulty) params.append("difficulty", difficulty);
        if (language) params.append("language", language);

        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch challenges");

        const data = await response.json();
        setChallenges(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();

    return () => controller.abort(); // Cleanup function
  }, [difficulty, language]); // Proper dependencies

  return { challenges, loading, error, requestCount };
}
