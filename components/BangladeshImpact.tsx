import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Heart,
  Zap,
  DollarSign,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const cityData = [
  {
    city: "Dhaka",
    providers: 2340,
    jobs: 12450,
    growth: 45,
    color: "bg-[#2F6CFF]",
  },
  {
    city: "Chittagong",
    providers: 890,
    jobs: 4230,
    growth: 38,
    color: "bg-[#FF8C42]",
  },
  {
    city: "Sylhet",
    providers: 560,
    jobs: 2890,
    growth: 42,
    color: "bg-purple-500",
  },
  {
    city: "Rajshahi",
    providers: 420,
    jobs: 1950,
    growth: 35,
    color: "bg-green-500",
  },
  {
    city: "Khulna",
    providers: 380,
    jobs: 1720,
    growth: 40,
    color: "bg-pink-500",
  },
];

const getImpactStats = () => [
  {
    icon: Users,
    value: "5,000+",
    labelKey: "impact.providersEmpowered",
    description: "Active service providers earning through the platform",
    color: "from-[#2F6CFF] to-[#4F88FF]",
  },
  {
    icon: Clock,
    value: "60%",
    labelKey: "impact.fasterBooking",
    description: "Reduced time from search to service delivery",
    color: "from-[#FF8C42] to-[#FF6B35]",
  },
  {
    icon: DollarSign,
    value: "৳45M+",
    labelKey: "impact.totalEarnings",
    description: "Income generated for local providers",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Heart,
    value: "98%",
    labelKey: "impact.satisfactionRate",
    description: "Users satisfied with their service experience",
    color: "from-pink-500 to-rose-500",
  },
];

const socialImpact = [
  {
    title: "Women Empowerment",
    value: "35%",
    description: "Female service providers on platform",
    icon: "👩‍💼",
    trend: "+12% this year",
  },
  {
    title: "Rural Employment",
    value: "28%",
    description: "Providers from rural areas",
    icon: "🌾",
    trend: "+18% growth",
  },
  {
    title: "Youth Employment",
    value: "42%",
    description: "Providers under 30 years old",
    icon: "👨‍🎓",
    trend: "+22% this quarter",
  },
  {
    title: "Digital Inclusion",
    value: "15,000+",
    description: "First-time digital service users",
    icon: "📱",
    trend: "Growing fast",
  },
];

export function BangladeshImpact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] via-[#EEF2F6] to-[#E0E7FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#2F6CFF]/10 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], x: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.span
              className="text-5xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🇧🇩
            </motion.span>
          </div>
          <h1 className="text-[#1F2937] dark:text-white mb-3 transition-colors duration-300">
            {t("impact.title")}
          </h1>
          <p className="text-[#6B7280] dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            {t("impact.subtitle")}
          </p>
        </motion.div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getImpactStats().map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full">
                <CardContent className="p-4 md:p-6">
                  <div
                    className={`inline-flex p-3 md:p-4 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div
                    className={`text-3xl md:text-4xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 font-bold`}
                  >
                    {stat.value}
                  </div>
                  <h3 className="text-[#1F2937] dark:text-white mb-2 transition-colors duration-300 text-lg">
                    {t(stat.labelKey)}
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* City Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#1F2937] dark:text-white transition-colors duration-300">
                    Service Usage Heatmap
                  </CardTitle>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300 mt-1 transition-colors duration-300">
                    Real-time activity across major cities
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0">
                  <Zap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityData.map((city, index) => (
                  <motion.div
                    key={city.city}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#2F6CFF]" />
                        <div>
                          <div className="text-[#1F2937] dark:text-white transition-colors duration-300">
                            {city.city}
                          </div>
                          <div className="text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                            {city.providers.toLocaleString()} providers •{" "}
                            {city.jobs.toLocaleString()} jobs
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 border-0">
                          <TrendingUp className="w-3 h-3 mr-1" />+{city.growth}%
                        </Badge>
                      </div>
                    </div>

                    {/* Activity Bar */}
                    <div className="relative h-12 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl overflow-hidden transition-colors duration-300">
                      <motion.div
                        className={`h-full ${city.color} opacity-20`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(city.jobs / 12450) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      />
                      <motion.div
                        className={`absolute inset-0 ${city.color} opacity-60`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(city.providers / 2340) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      />

                      {/* Pulse Effect */}
                      <motion.div
                        className={`absolute right-0 top-0 bottom-0 w-1 ${city.color}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Visualization Placeholder */}
              <div className="mt-8 relative h-64 bg-gradient-to-br from-[#2F6CFF]/5 to-[#FF8C42]/5 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-6xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🗺️
                  </motion.div>
                </div>

                {/* Activity Dots */}
                {cityData.map((city, idx) => (
                  <motion.div
                    key={city.city}
                    className={`absolute w-6 h-6 ${city.color} rounded-full`}
                    style={{
                      left: `${20 + idx * 15}%`,
                      top: `${30 + (idx % 2) * 20}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Good Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-[#1F2937] dark:text-white mb-6 transition-colors duration-300">
            Social Impact Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialImpact.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {metric.icon}
                    </div>
                    <div className="text-3xl text-[#2F6CFF] dark:text-[#4F88FF] mb-2 transition-colors duration-300">
                      {metric.value}
                    </div>
                    <h4 className="text-[#1F2937] dark:text-white mb-2 transition-colors duration-300">
                      {metric.title}
                    </h4>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300 mb-3 transition-colors duration-300">
                      {metric.description}
                    </p>
                    <Badge className="bg-[#2F6CFF]/10 dark:bg-[#4F88FF]/20 text-[#2F6CFF] dark:text-[#4F88FF] border-0 transition-colors duration-300">
                      {metric.trend}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-12 bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-8 h-8" />
                <h2 className="text-white">Economic Impact</h2>
              </div>
              <p className="text-blue-100 mb-6">
                ServiSphere AI is creating meaningful employment opportunities
                and driving digital transformation across Bangladesh. Our
                platform has enabled thousands of service providers to increase
                their income by an average of 45% while giving customers access
                to trusted, quality services.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl mb-1">45%</div>
                  <div className="text-sm text-blue-100">
                    Avg. Income Increase
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl mb-1">2.5x</div>
                  <div className="text-sm text-blue-100">
                    More Job Opportunities
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl mb-1">24/7</div>
                  <div className="text-sm text-blue-100">
                    Service Availability
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Jobs Created", value: "12,450" },
                { label: "Cities Covered", value: "64" },
                { label: "Active Users", value: "85K+" },
                { label: "Response Time", value: "< 20min" },
              ].map((stat, statIdx) => (
                <motion.div
                  key={statIdx}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
