export function SkillBadge({ level = "Beginner", className = "" }) {
  const getLevelStyles = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-900/50 text-green-400 border-green-800";
      case "intermediate":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-800";
      case "advanced":
        return "bg-red-900/50 text-red-400 border-red-800";
      case "expert":
        return "bg-purple-900/50 text-purple-400 border-purple-800";
      default:
        return "bg-gray-900/50 text-gray-400 border-gray-800";
    }
  };

  const getShortLevel = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "BEG";
      case "intermediate":
        return "INT";
      case "advanced":
        return "ADV";
      case "expert":
        return "EXP";
      default:
        return level.slice(0, 3).toUpperCase();
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`text-xs font-mono font-bold px-2 py-1 rounded border ${getLevelStyles()}`}
        title={level}
      >
        {getShortLevel()}
      </span>
    </div>
  );
}

// Optional: ProBadge variant for showing professional skill levels
export function ProBadge({ level = 1, maxLevel = 5, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxLevel)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? "bg-yellow-400" : "bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}
