export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Glowing Grid Background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Cyberpunk Header */}
      <header className="relative z-10 border-b border-purple-900/50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-500">
              SkillProof
            </span>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li className="hover:text-yellow-400 transition-all cursor-pointer">
                Certifications
              </li>
              <li className="hover:text-yellow-400 transition-all cursor-pointer">
                Verify
              </li>
              <li className="hover:text-yellow-400 transition-all cursor-pointer">
                DAO
              </li>
              <li className="px-4 py-2 bg-purple-900/50 rounded-md border border-purple-500 hover:bg-purple-900 transition-all cursor-pointer">
                Connect Wallet
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Holographic Hero */}
      <section className="relative z-10 pt-32 pb-48 text-center">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="inline-block mb-6 px-4 py-1 bg-purple-900/30 rounded-full border border-purple-500 text-sm">
            <span className="text-yellow-400">✦</span> WEB3 NATIVE
            CERTIFICATIONS <span className="text-yellow-400">✦</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              Skills
            </span>
            <span className="text-white"> </span>
            <span className="underline decoration-yellow-400 decoration-wavy">
              Permanently
            </span>
            <span className="text-white"> </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-400">
              Proven
            </span>
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Traditional certs die with the issuing platform.{" "}
            <span className="text-yellow-400">SkillProof NFTs</span> live
            forever on-chain, with{" "}
            <span className="underline">zero-trust verification</span> and
            decentralized skill validation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="relative overflow-hidden group px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-all">
              <span className="relative z-10">Start Skill Challenge</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-all"></div>
            </button>
            <button className="px-8 py-4 border-2 border-yellow-400 hover:bg-yellow-400/10 font-bold rounded-lg transition-all flex items-center justify-center space-x-2">
              <span>Verify Credential</span>
              <span className="text-yellow-400">↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Certification Demo */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <span className="text-yellow-400">On-Chain</span> Skill Verification
          </h2>

          <div className="max-w-6xl mx-auto bg-gray-900/50 border border-purple-900/50 rounded-xl p-1">
            <div className="flex flex-col lg:flex-row">
              {/* NFT Preview */}
              <div className="lg:w-1/2 p-8 border-r border-purple-900/50">
                <div className="bg-gradient-to-br from-purple-900/30 to-black rounded-xl border border-purple-500/30 p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400 rounded-full animate-pulse"></div>
                    <h3 className="text-2xl font-bold mb-2">
                      Advanced Solidity Developer
                    </h3>
                    <p className="text-gray-400 mb-4">Issued: 12 May 2024</p>
                    <div className="inline-block px-3 py-1 bg-purple-900/50 rounded-full text-sm border border-purple-500">
                      Token ID: #42791
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Panel */}
              <div className="lg:w-1/2 p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Live Verification
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Wallet Address
                    </label>
                    <div className="bg-gray-900 p-3 rounded-md font-mono text-sm truncate">
                      0x892...4d7f1
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Skills Validated
                    </label>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-900 rounded-md">
                        <span>Smart Contract Security</span>
                        <span className="text-green-400">✓</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-900 rounded-md">
                        <span>Gas Optimization</span>
                        <span className="text-green-400">✓</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-900 rounded-md">
                        <span>DeFi Protocols</span>
                        <span className="text-green-400">✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-900/50">
                    <button className="w-full py-3 bg-purple-900 hover:bg-purple-800 rounded-md flex items-center justify-center space-x-2 transition-all">
                      <span>View Full Transaction History</span>
                      <span className="text-purple-300">↓</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Radical Transparency Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <span className="text-yellow-400">No</span> Gatekeeping.{" "}
            <span className="text-yellow-400">No</span> Bullshit.
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="border border-yellow-400/30 rounded-xl p-6 hover:bg-yellow-400/10 transition-all">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-yellow-400 mr-2">⚡</span>
                Open Validation
              </h3>
              <p className="text-gray-300">
                Every test case and evaluation rubric is publicly verifiable on
                IPFS. No hidden criteria.
              </p>
            </div>

            <div className="border border-purple-400/30 rounded-xl p-6 hover:bg-purple-400/10 transition-all">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-purple-400 mr-2">🔓</span>
                Community Audits
              </h3>
              <p className="text-gray-300">
                Certifications can be challenged by the community. Fraudulent
                claims get slashed.
              </p>
            </div>

            <div className="border border-green-400/30 rounded-xl p-6 hover:bg-green-400/10 transition-all">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-green-400 mr-2">📜</span>
                Soulbound Tokens
              </h3>
              <p className="text-gray-300">
                Non-transferable NFTs mean your credentials are permanently tied
                to your wallet identity.
              </p>
            </div>

            <div className="border border-pink-400/30 rounded-xl p-6 hover:bg-pink-400/10 transition-all">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-pink-400 mr-2">💎</span>
                Skill Mining
              </h3>
              <p className="text-gray-300">
                Earn token rewards for maintaining/updating certifications as
                tech stacks evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Glowing CTA */}
      <section className="relative z-10 py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-8">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              Mint Your Reputation
            </span>
            ?
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            Join the 12,843 developers who've moved beyond paper certificates.
          </p>
          <button className="relative overflow-hidden group px-12 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-bold rounded-full text-lg transition-all">
            <span className="relative z-10">Connect Wallet & Begin</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all"></div>
          </button>
        </div>
      </section>

      {/* Cyberpunk Footer */}
      <footer className="relative z-10 py-12 border-t border-purple-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              <span className="text-lg font-bold">SkillProof</span>
            </div>
            <div className="flex space-x-6">
              <span className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                GitHub
              </span>
              <span className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                Litepaper
              </span>
              <span className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                DAO Governance
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
