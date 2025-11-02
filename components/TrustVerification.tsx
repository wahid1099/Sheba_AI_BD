import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  Lock,
  FileCheck,
  Award,
  Sparkles,
  AlertTriangle,
  Eye,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const verificationLevels = [
  {
    level: "Bronze",
    icon: "🥉",
    color: "from-amber-600 to-amber-800",
    requirements: ["Phone Verified", "Email Verified", "Profile Complete"],
    benefits: ["Basic Trust Badge", "Listed in Search"],
    completed: true,
    progress: 100,
  },
  {
    level: "Silver",
    icon: "🥈",
    color: "from-gray-400 to-gray-600",
    requirements: ["Identity Document", "5+ Reviews", "10+ Completed Jobs"],
    benefits: [
      "Enhanced Visibility",
      "Priority Support",
      "Featured in Category",
    ],
    completed: true,
    progress: 100,
  },
  {
    level: "Gold",
    icon: "🥇",
    color: "from-yellow-400 to-yellow-600",
    requirements: [
      "Background Check",
      "50+ Jobs",
      "4.8+ Rating",
      "Skill Certification",
    ],
    benefits: [
      "Top Rankings",
      "Premium Badge",
      "Price Premium +20%",
      "AI Recommendations",
    ],
    completed: false,
    progress: 75,
  },
];

const securityFeatures = [
  {
    icon: Shield,
    title: "Identity Verification",
    description: "Government-issued ID verification with facial recognition",
    status: "verified",
  },
  {
    icon: FileCheck,
    title: "Background Check",
    description: "Criminal record and employment history verification",
    status: "verified",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "All transactions encrypted and fraud-protected",
    status: "active",
  },
  {
    icon: Eye,
    title: "Real-time Monitoring",
    description: "AI monitors all interactions for suspicious activity",
    status: "active",
  },
];

const trustMetrics = [
  {
    label: "Identity Verified",
    value: 100,
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    label: "Background Check",
    value: 100,
    icon: Shield,
    color: "text-blue-500",
  },
  {
    label: "Skill Certification",
    value: 85,
    icon: Award,
    color: "text-purple-500",
  },
  {
    label: "Customer Reviews",
    value: 92,
    icon: Sparkles,
    color: "text-yellow-500",
  },
];

export function TrustVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] via-[#EEF2F6] to-[#E0E7FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated Shield Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="w-full h-full text-[#2F6CFF]" />
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="p-4 bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(47, 108, 255, 0.3)",
                  "0 0 40px rgba(47, 108, 255, 0.6)",
                  "0 0 20px rgba(47, 108, 255, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h1 className="text-[#1F2937] mb-3">Trust & Verification Center</h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Multi-layer verification system powered by AI to ensure safety and
            trust for all users
          </p>
        </motion.div>

        {/* Trust Score Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#2F6CFF]" />
                <h2 className="text-[#1F2937]">Your Trust Score</h2>
              </div>

              <div className="relative inline-flex">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#E0E7FF"
                    strokeWidth="16"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#trust-gradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 552" }}
                    animate={{ strokeDasharray: "509 552" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient
                      id="trust-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2F6CFF" />
                      <stop offset="100%" stopColor="#4F88FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] bg-clip-text text-transparent">
                      92
                    </div>
                    <div className="text-sm text-[#6B7280]">out of 100</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Badge className="bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white border-0">
                  Top 5% Trusted Providers
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-[#1F2937] mb-4">Trust Components</h3>
              <div className="space-y-4">
                {trustMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="text-[#1F2937]">{metric.label}</span>
                      </div>
                      <span className="text-[#2F6CFF]">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification Levels */}
        <div className="mb-8">
          <h2 className="text-[#1F2937] mb-6">NFT Verification Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verificationLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <Card
                  className={`bg-white/70 backdrop-blur-xl border-2 ${
                    level.completed ? "border-[#2F6CFF]" : "border-white/50"
                  } shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                  {/* Glow Effect */}
                  {level.completed && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-5`}
                      animate={{ opacity: [0.05, 0.15, 0.05] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-4xl">{level.icon}</span>
                          <CardTitle className="text-[#1F2937]">
                            {level.level}
                          </CardTitle>
                        </div>
                        {level.completed && (
                          <Badge className="bg-green-100 text-green-700 border-0">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Achieved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-4">
                      <div className="text-sm text-[#6B7280] mb-2">
                        Requirements
                      </div>
                      <div className="space-y-2">
                        {level.requirements.map((req, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-[#1F2937]"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                level.completed
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }`}
                            />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-[#6B7280] mb-2">
                        Benefits
                      </div>
                      <div className="space-y-1">
                        {level.benefits.map((benefit, idx) => (
                          <div key={idx} className="text-sm text-[#2F6CFF]">
                            • {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {!level.completed && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#6B7280]">
                            Progress
                          </span>
                          <span className="text-sm text-[#2F6CFF]">
                            {level.progress}%
                          </span>
                        </div>
                        <Progress value={level.progress} className="h-2 mb-3" />
                        <Button className="w-full bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] hover:from-[#2557CC] to-[#3D6FCC] text-white rounded-xl">
                          Continue Verification
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-[#1F2937]">
                  Security Features
                </CardTitle>
                <CardDescription className="text-[#6B7280]">
                  Multi-layer protection for your safety
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-[#F7F9FB] rounded-2xl hover:bg-white transition-colors"
                    >
                      <div className="p-3 bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-xl">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-[#1F2937]">{feature.title}</h4>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#6B7280]">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fraud Protection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white shadow-xl h-full border-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertTriangle className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-white">
                      AI Fraud Protection
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      Active 24/7 monitoring
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3">Real-time Detection</h4>
                    <p className="text-sm text-blue-100 mb-4">
                      Our AI analyzes behavior patterns to detect and prevent
                      fraud before it happens.
                    </p>
                    <div className="space-y-3">
                      {[
                        { label: "Scam Prevention", value: "99.8%" },
                        { label: "Identity Theft Protection", value: "100%" },
                        { label: "Payment Security", value: "99.9%" },
                      ].map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{stat.label}</span>
                          <span className="text-white">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-blue-400/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5" />
                      <h4>Response Time</h4>
                    </div>
                    <div className="text-3xl mb-1">{"<"} 2 minutes</div>
                    <p className="text-sm text-blue-100">
                      Average time to detect and flag suspicious activity
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm">
                      <strong>100% Money-Back Guarantee</strong> if you're
                      affected by fraud on our platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Blockchain Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-300/50 rounded-3xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-12 h-12 text-purple-600" />
            </motion.div>
          </div>
          <h2 className="text-[#1F2937] mb-3">
            Blockchain-Verified Credentials
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto mb-6">
            All verification badges are stored on the blockchain, making them
            tamper-proof and permanently verifiable. Your trust score is
            immutable and transparent.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 to-pink-700 text-white rounded-xl">
            View on Blockchain
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
