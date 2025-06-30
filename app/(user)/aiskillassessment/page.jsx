import { CodeEditor } from "@/components/CodeEditor";
import { SkillBadge } from "@/components/SkillBadge";

export default function AIAssessmentPage() {
  const codingChallenges = [
    {
      id: "react-001",
      title: "React Component Optimization",
      description: "Improve this component to reduce re-renders by 50%",
      difficulty: "Advanced",
      language: "jsx",
      timeLimit: 25,
      reward: 150, // XP points
    },
    {
      id: "node-003",
      title: "Async Error Handling",
      description: "Refactor this API route to handle all edge cases",
      difficulty: "Intermediate",
      language: "javascript",
      timeLimit: 20,
      reward: 100,
    },
    {
      id: "css-007",
      title: "CSS Layout Challenge",
      description: "Implement this design using modern CSS without JavaScript",
      difficulty: "Beginner",
      language: "css",
      timeLimit: 15,
      reward: 75,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Pulsing AI Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blue-500 opacity-20 blur-md animate-pulse"></div>
              <div className="relative flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <BrainCircuitIcon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Skill Assessment</h1>
              <p className="text-sm text-gray-400">
                Real-time coding challenges evaluated by GPT-4
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Live Assessment Interface */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Challenge Browser */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-blue-400" />
                Available Challenges
              </h2>
              <div className="space-y-4">
                {codingChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 cursor-pointer transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{challenge.title}</h3>
                      <SkillBadge level={challenge.difficulty} />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      {challenge.description}
                    </p>
                    <div className="flex justify-between items-center mt-4 text-xs">
                      <span className="text-gray-500">
                        {challenge.timeLimit} min limit
                      </span>
                      <span className="text-yellow-400">
                        +{challenge.reward} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-yellow-400" />
                Your AI Assessment Stats
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">24</div>
                  <div className="text-xs text-gray-400">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">3,850</div>
                  <div className="text-xs text-gray-400">Total XP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-gray-800">
              {/* Editor Header */}
              <div className="bg-gray-900 px-6 py-3 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-mono text-gray-400 ml-2">
                    challenge-react-001.jsx
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">14:32</span>
                  </div>
                  <button className="px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-sm font-medium transition-all">
                    Submit
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="bg-gray-950 h-[500px]">
                <CodeEditor
                  language="jsx"
                  defaultValue={`import React, { useState } from 'react'

// TODO: Optimize this component to reduce re-renders
const ProductList = ({ products }) => {
  const [favorites, setFavorites] = useState([])
  
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId))
    } else {
      setFavorites([...favorites, productId])
    }
  }

  return (
    <div className="space-y-4">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}

export default ProductList
`}
                />
              </div>
            </div>

            {/* AI Feedback Panel */}
            <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-medium">GPT-4 Analysis</span>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <BotIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h4 className="font-bold text-green-400 mb-2">
                        Performance Issue Detected
                      </h4>
                      <p className="text-sm">
                        The current implementation causes all ProductCards to
                        re-render when any favorite is toggled. Consider using
                        React.memo for ProductCard and moving the toggle logic
                        to individual cards.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h4 className="font-bold text-blue-400 mb-2">
                        Suggested Solution
                      </h4>
                      <pre className="text-xs font-mono bg-gray-950 p-3 rounded overflow-x-auto">
                        {`// Optimized version
const ProductList = React.memo(({ products }) => (
  <div className="space-y-4">
    {products.map(product => (
      <MemoizedProductCard 
        key={product.id}
        product={product}
      />
    ))}
  </div>
))

const MemoizedProductCard = React.memo(({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  
  return (
    <ProductCard
      product={product}
      isFavorite={isFavorite}
      onToggleFavorite={() => setIsFavorite(!isFavorite)}
    />
  )
})`}
                      </pre>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md font-medium transition-all">
                        Accept Suggestion
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium transition-all">
                        Request Clarification
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* XP Progress Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Next rank:{" "}
              <span className="text-yellow-400">Senior Developer</span> (5000
              XP)
            </div>
            <div className="w-1/2 bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full"
                style={{ width: "77%" }}
              ></div>
            </div>
            <div className="text-sm font-medium">
              <span className="text-blue-400">3,850</span>/5,000 XP
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Mock icons (would import from actual icon library in production)
function BrainCircuitIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 4v6m0 0a3 3 0 1 0 3 3m-3-3a3 3 0 1 1-3 3m3-3v10m6-10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM6 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="m18 16-4-4 4-4m-8 0-4 4 4 4m8-12H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6m-3-3h6m-6-9h.01M15 6h.01" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function BotIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 8v4m0 0v4m0-4h4m-4 0H8m10-6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M4 14h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2Z" />
    </svg>
  );
}
