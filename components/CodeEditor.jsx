"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useCodeEvaluation } from "@/hooks/useCodeEvaluation";

export function CodeEditor({ challenge, onEvaluationComplete, ...props }) {
  // Force dark theme for the editor
  const editorTheme = "leetcode-dark";
  const [code, setCode] = useState(challenge?.starterCode || "");
  const { evaluateCode, evaluation, isEvaluating } = useCodeEvaluation();
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [activeTab, setActiveTab] = useState("code"); // 'code' or 'result'

  const handleSubmit = async () => {
    const result = await evaluateCode({
      code,
      challengeId: challenge.id,
      language: challenge.language,
    });

    if (result) {
      onEvaluationComplete?.(result);
      setShowEvaluation(true);
      setActiveTab("result");
    }
  };

  useEffect(() => {
    if (challenge?.starterCode) {
      setCode(challenge.starterCode);
      setShowEvaluation(false);
      setActiveTab("code");
    }
  }, [challenge]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Tabs */}
      <div className="flex border-b border-[#3b4048]">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "code"
              ? "text-white border-b-2 border-[#ffa116]"
              : "text-[#9ca3af] hover:text-white"
          }`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>

        {showEvaluation && (
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "result"
                ? "text-white border-b-2 border-[#ffa116]"
                : "text-[#9ca3af] hover:text-white"
            }`}
            onClick={() => setActiveTab("result")}
          >
            Result
          </button>
        )}
      </div>

      {/* Editor/Result Area */}
      <div className="flex-1 overflow-auto">
        {activeTab === "code" && (
          <div className="h-full">
            <Editor
              height="100%"
              language={challenge?.language || "javascript"}
              theme={editorTheme}
              value={code}
              onChange={setCode}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                fontFamily:
                  "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                lineNumbersMinChars: 3,
                renderLineHighlight: "gutter",
                scrollBeyondLastLine: false,
                padding: { top: 10 },
              }}
              beforeMount={(monaco) => {
                monaco.editor.defineTheme("leetcode-dark", {
                  base: "vs-dark",
                  inherit: true,
                  rules: [
                    { token: "", foreground: "#e0e0e0", background: "#1e1e1e" },
                    {
                      token: "comment",
                      foreground: "#6a9955",
                      fontStyle: "italic",
                    },
                    { token: "keyword", foreground: "#569cd6" },
                    { token: "number", foreground: "#b5cea8" },
                    { token: "string", foreground: "#ce9178" },
                  ],
                  colors: {
                    "editor.background": "#1e1e1e",
                    "editor.foreground": "#e0e0e0",
                    "editor.lineHighlightBackground": "#252526",
                    "editorLineNumber.foreground": "#858585",
                    "editorCursor.foreground": "#ffffff",
                    "editor.selectionBackground": "#264f78",
                  },
                });
              }}
              {...props}
            />
          </div>
        )}

        {activeTab === "result" && evaluation && (
          <div className="p-4 h-full overflow-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Test Results
              </h3>

              <div className="flex items-center mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    evaluation.score >= 80
                      ? "bg-[#4CAF50]"
                      : evaluation.score >= 50
                      ? "bg-[#FFC107]"
                      : "bg-[#F44336]"
                  }`}
                >
                  <span className="text-white font-medium">
                    {evaluation.score}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">
                    {evaluation.score >= 80
                      ? "Success"
                      : evaluation.score >= 50
                      ? "Partial Success"
                      : "Failure"}
                  </p>
                  <p className="text-sm text-[#9ca3af]">
                    Runtime: {evaluation.runtime || "N/A"} • Memory:{" "}
                    {evaluation.memory || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {evaluation.testCases?.map((testCase, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${
                      testCase.passed ? "border-[#4CAF50]" : "border-[#F44336]"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {testCase.passed ? (
                        <svg
                          className="w-4 h-4 text-[#4CAF50] mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-[#F44336] mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span
                        className={`font-medium ${
                          testCase.passed ? "text-[#4CAF50]" : "text-[#F44336]"
                        }`}
                      >
                        Test Case {index + 1}{" "}
                        {testCase.passed ? "Passed" : "Failed"}
                      </span>
                    </div>
                    {!testCase.passed && (
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Input:</span>{" "}
                          {testCase.input}
                        </p>
                        <p>
                          <span className="font-medium">Expected:</span>{" "}
                          {testCase.expected}
                        </p>
                        <p>
                          <span className="font-medium">Output:</span>{" "}
                          {testCase.actual}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Feedback
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded border border-[#3b4048]">
                  <div className="text-sm font-medium mb-1 text-[#9ca3af]">
                    Correctness
                  </div>
                  <div
                    className={`text-lg font-medium ${
                      evaluation.feedback.correctness === "excellent"
                        ? "text-[#4CAF50]"
                        : evaluation.feedback.correctness === "good"
                        ? "text-[#8BC34A]"
                        : evaluation.feedback.correctness === "fair"
                        ? "text-[#FFC107]"
                        : "text-[#F44336]"
                    }`}
                  >
                    {evaluation.feedback.correctness}
                  </div>
                </div>
                <div className="p-3 rounded border border-[#3b4048]">
                  <div className="text-sm font-medium mb-1 text-[#9ca3af]">
                    Efficiency
                  </div>
                  <div
                    className={`text-lg font-medium ${
                      evaluation.feedback.efficiency === "excellent"
                        ? "text-[#4CAF50]"
                        : evaluation.feedback.efficiency === "good"
                        ? "text-[#8BC34A]"
                        : evaluation.feedback.efficiency === "fair"
                        ? "text-[#FFC107]"
                        : "text-[#F44336]"
                    }`}
                  >
                    {evaluation.feedback.efficiency}
                  </div>
                </div>
                <div className="p-3 rounded border border-[#3b4048]">
                  <div className="text-sm font-medium mb-1 text-[#9ca3af]">
                    Best Practices
                  </div>
                  <div
                    className={`text-lg font-medium ${
                      evaluation.feedback.bestPractices === "excellent"
                        ? "text-[#4CAF50]"
                        : evaluation.feedback.bestPractices === "good"
                        ? "text-[#8BC34A]"
                        : evaluation.feedback.bestPractices === "fair"
                        ? "text-[#FFC107]"
                        : "text-[#F44336]"
                    }`}
                  >
                    {evaluation.feedback.bestPractices}
                  </div>
                </div>
              </div>

              {evaluation.suggestions?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-white">
                    Suggestions for Improvement:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[#e0e0e0]">
                    {evaluation.suggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {evaluation.optimizedSolution && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Optimized Solution
                </h3>
                <div className="bg-[#252526] p-3 rounded text-sm overflow-x-auto border border-[#3b4048]">
                  <pre className="text-[#e0e0e0]">
                    {evaluation.optimizedSolution}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with submit button */}
      <div className="p-3 border-t border-[#3b4048] bg-[#1e1e1e]">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#9ca3af]">
            {challenge?.timeLimit &&
              `Time remaining: ${challenge.timeLimit} min`}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isEvaluating}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isEvaluating
                ? "bg-[#3e4451] text-[#9ca3af] cursor-not-allowed"
                : "bg-[#ffa116] hover:bg-[#ff8c00] text-white"
            }`}
            type="button"
          >
            {isEvaluating ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
