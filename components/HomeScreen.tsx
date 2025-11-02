import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Search, Sparkles, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const categories = [
  {
    name: "Cleaning",
    icon: "🧹",
    color: "from-blue-400 to-cyan-400",
    image:
      "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc2MjAxMjI3NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Repair",
    icon: "🔧",
    color: "from-orange-400 to-red-400",
    image:
      "https://images.unsplash.com/photo-1603114595741-e60bf9486e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmVwYWlyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MjA4OTk2MHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Tutor",
    icon: "📚",
    color: "from-purple-400 to-pink-400",
    image:
      "https://images.unsplash.com/photo-1589995635011-078e0bb91d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MjA4OTk2MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Tech Support",
    icon: "💻",
    color: "from-green-400 to-teal-400",
    image:
      "https://images.unsplash.com/photo-1758519290233-a03c1d17ecc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlJTIwcHJvdmlkZXJ8ZW58MXx8fHwxNzYyMDg5OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const aiRecommendations = [
  {
    name: "AC Repair Expert",
    rating: 4.9,
    jobs: 234,
    price: "৳500-800",
    trustScore: 96,
    responseTime: "15 min",
  },
  {
    name: "Home Cleaning Pro",
    rating: 4.8,
    jobs: 456,
    price: "৳300-600",
    trustScore: 94,
    responseTime: "20 min",
  },
];

export function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://servi-sphere-ai-core.lovable.app/assets/hero-bg-CAVfZJ6i.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/80 to-purple-50/70 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 transition-colors duration-300" />
      </div>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2F6CFF] rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient
            id="line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2F6CFF" />
            <stop offset="100%" stopColor="#FF8C42" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#line-gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-[#2F6CFF]" />
            </motion.div>
            <h1 className="text-[#1F2937] dark:text-white transition-colors duration-300">
              ServiSphere AI
            </h1>
          </div>

          <h2 className="text-[#1F2937] dark:text-white mb-3 transition-colors duration-300">
            Find Trusted Local Experts — Powered by AI 🤖
          </h2>

          <p className="text-[#6B7280] dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Connect with verified service providers in your area. Our AI ensures
            trust, quality, and instant matching.
          </p>
        </motion.div>

        {/* Voice Search Bar */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            {/* Glassmorphism Search Bar */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-600/50 rounded-3xl shadow-2xl p-2 relative overflow-hidden transition-colors duration-300">
              {/* Glow Effect */}
              {isListening && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2F6CFF]/20 to-[#FF8C42]/20"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              <div className="relative flex items-center gap-3 px-4 py-3">
                <Search className="w-5 h-5 text-[#6B7280] dark:text-gray-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Tell me what you need..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#1F2937] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-gray-400 transition-colors duration-300"
                />
                <motion.button
                  onClick={handleVoiceSearch}
                  className={`p-3 rounded-full relative ${
                    isListening
                      ? "bg-gradient-to-r from-[#2F6CFF] to-[#FF8C42]"
                      : "bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#2F6CFF]"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <Mic
                    className={`w-5 h-5 relative z-10 ${
                      isListening ? "text-white" : "text-white"
                    }`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#1F2937] dark:text-white transition-colors duration-300">
              Popular Services
            </h3>
            <Button variant="ghost" className="text-[#2F6CFF]">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="cursor-pointer group"
              >
                <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/60 dark:border-gray-600/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Category Image */}
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-40 group-hover:opacity-50 transition-opacity`}
                    />

                    {/* AI Recommended Badge */}
                    {index < 2 && (
                      <div className="absolute top-3 right-3 bg-[#FF8C42] text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-xs">AI Pick</span>
                      </div>
                    )}
                  </div>

                  {/* Category Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{category.icon}</span>
                      <h4 className="text-[#1F2937] dark:text-white transition-colors duration-300">
                        {category.name}
                      </h4>
                    </div>
                    <p className="text-[#6B7280] dark:text-gray-300 text-sm transition-colors duration-300">
                      200+ verified providers
                    </p>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-[#2F6CFF] to-[#FF8C42] rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-[#1F2937] dark:text-white transition-colors duration-300">
              AI Recommended For You
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiRecommendations.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-600/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-[#1F2937] dark:text-white mb-2 transition-colors duration-300">
                      {provider.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FF8C42] text-[#FF8C42]" />
                        <span>{provider.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{provider.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Trust Score */}
                  <div className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white px-3 py-2 rounded-xl text-center">
                    <div className="text-xs">AI Trust</div>
                    <div>{provider.trustScore}%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#6B7280]">Price Range</div>
                    <div className="text-[#2F6CFF]">{provider.price}</div>
                  </div>

                  <Button className="bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] hover:from-[#2557CC] to-[#3D6FCC] text-white rounded-xl">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
