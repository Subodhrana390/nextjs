import Link from "next/link";
import {
  Code as CodeIcon,
  Clock as ClockIcon,
  Star as StarIcon,
  Award as AwardIcon,
} from "lucide-react";

const fetchChallenges = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/challenges`,
    {
      next: {
        revalidate: 60,
        tags: ["challenges"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch challenges");
  }

  return res.json();
};

export default async function ChallengesPage() {
  const challenges = await fetchChallenges();

  return (
    <div className="w-full p-4 md:p-8 bg-[#f5f5f5] dark:bg-[#0a0a0a] min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-[#f0f0f0] mb-2">
              Coding Challenges
            </h1>
            <p className="text-[#6b7280] dark:text-[#9ca3af]">
              Sharpen your skills with these programming challenges
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="px-4 py-2 text-sm rounded-md bg-white dark:bg-[#1e1e1e] border border-[#e5e7eb] dark:border-[#3b4048] text-[#1a1a1a] dark:text-[#f0f0f0] hover:bg-[#f5f5f5] dark:hover:bg-[#252525] transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 text-sm rounded-md bg-white dark:bg-[#1e1e1e] border border-[#e5e7eb] dark:border-[#3b4048] text-[#1a1a1a] dark:text-[#f0f0f0] hover:bg-[#f5f5f5] dark:hover:bg-[#252525] transition-colors">
              Sort
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-lg border border-[#e5e7eb] dark:border-[#3b4048]">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#e6f7ff] dark:bg-[#003a6c] mr-3">
                <CodeIcon
                  className="text-[#1890ff] dark:text-[#40a9ff]"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  Total
                </p>
                <p className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                  {challenges.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-lg border border-[#e5e7eb] dark:border-[#3b4048]">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#fff7e6] dark:bg-[#612500] mr-3">
                <StarIcon
                  className="text-[#fa8c16] dark:text-[#ffc069]"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  Easy
                </p>
                <p className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                  {challenges.filter((c) => c.difficulty === "easy").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-lg border border-[#e5e7eb] dark:border-[#3b4048]">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#fff1f0] dark:bg-[#5c0011] mr-3">
                <ClockIcon
                  className="text-[#f5222d] dark:text-[#ff7875]"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  Medium
                </p>
                <p className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                  {challenges.filter((c) => c.difficulty === "medium").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-lg border border-[#e5e7eb] dark:border-[#3b4048]">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#f6ffed] dark:bg-[#092b00] mr-3">
                <AwardIcon
                  className="text-[#52c41a] dark:text-[#95de64]"
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  Hard
                </p>
                <p className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
                  {challenges.filter((c) => c.difficulty === "hard").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* All Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Challenge Card Component
function ChallengeCard({ challenge }) {
  const difficultyColors = {
    easy: {
      text: "text-[#00b8a3]",
      bg: "bg-[#00b8a3]/10",
      border: "border-[#00b8a3]/20",
    },
    medium: {
      text: "text-[#ffb800]",
      bg: "bg-[#ffb800]/10",
      border: "border-[#ffb800]/20",
    },
    hard: {
      text: "text-[#ff375f]",
      bg: "bg-[#ff375f]/10",
      border: "border-[#ff375f]/20",
    },
  };

  const colors =
    difficultyColors[challenge.difficulty] || difficultyColors.easy;

  return (
    <Link
      href={`/challenges/${challenge.id}`}
      className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-[#1e1e1e] border border-[#e5e7eb] dark:border-[#3b4048] hover:border-[#d1d5db] dark:hover:border-[#4b5563] group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#1a1a1a] dark:text-[#f0f0f0] group-hover:text-[#2563eb] dark:group-hover:text-[#3b82f6] transition-colors">
            {challenge.title}
          </h2>
          <span
            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${colors.bg} ${colors.border} ${colors.text}`}
          >
            {challenge.difficulty}
          </span>
        </div>

        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4 line-clamp-2">
          {challenge.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text}`}
            >
              {challenge.language}
            </span>
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af] flex items-center">
              <ClockIcon className="mr-1" size={12} />
              {challenge.timeLimit} min
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium text-[#10b981] dark:text-[#34d399] flex items-center">
              <AwardIcon className="mr-1" size={14} />
              {challenge.reward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar for completion status (optional) */}
      <div className="h-1 w-full bg-[#e5e7eb] dark:bg-[#3b4048]">
        <div
          className={`h-full ${colors.bg}`}
          style={{ width: `${Math.random() * 100}%` }} // Replace with actual completion data
        ></div>
      </div>
    </Link>
  );
}
