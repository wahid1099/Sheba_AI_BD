import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import {
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Sparkles,
  Award,
  Target,
  Moon,
  Sun,
  Brain,
  Zap,
  AlertTriangle,
  Volume2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const revenueData = [
  { month: "Jan", revenue: 12000, jobs: 24 },
  { month: "Feb", revenue: 15000, jobs: 30 },
  { month: "Mar", revenue: 13500, jobs: 27 },
  { month: "Apr", revenue: 18000, jobs: 36 },
  { month: "May", revenue: 22000, jobs: 44 },
  { month: "Jun", revenue: 25000, jobs: 50 },
];

const demandForecast = [
  { day: "Mon", demand: 65 },
  { day: "Tue", demand: 72 },
  { day: "Wed", demand: 68 },
  { day: "Thu", demand: 85 },
  { day: "Fri", demand: 92 },
  { day: "Sat", demand: 95 },
  { day: "Sun", demand: 78 },
];

const performanceMetrics = [
  { category: "Response Time", score: 95 },
  { category: "Quality", score: 92 },
  { category: "Communication", score: 88 },
  { category: "Punctuality", score: 96 },
];

export function ProviderDashboard() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const bgColor = isDarkMode
    ? "from-[#1F2937] via-[#111827] to-[#0F172A]"
    : "from-[#F7F9FB] via-[#EEF2F6] to-[#E0E7FF]";
  const cardBg = isDarkMode ? "bg-[#1F2937]/80" : "bg-white/70";
  const textPrimary = isDarkMode ? "text-white" : "text-[#1F2937]";
  const textSecondary = isDarkMode ? "text-gray-300" : "text-[#6B7280]";
  const borderColor = isDarkMode ? "border-gray-700" : "border-white/50";

  const speakDashboardSummary = () => {
    const summary = `Dashboard Summary: You earned 25,000 taka this month with 156 total jobs. Your average rating is 4.9 stars with a trust score of 96 out of 100. AI recommendations suggest increasing your prices by 10% during peak hours to potentially earn 8,000 taka more this month.`;

    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgColor} relative overflow-hidden`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#2F6CFF]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF8C42]/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className={textPrimary}>{t("dashboard.title")}</h1>
            <p className={textSecondary}>{t("dashboard.subtitle")}</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={speakDashboardSummary}
              className="gap-2"
              title="Listen to dashboard summary"
            >
              <Volume2 className="w-4 h-4" />
              {t("dashboard.voiceSummary")}
            </Button>
            <Sun
              className={`w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-[#FF8C42]"
              }`}
            />
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            <Moon
              className={`w-5 h-5 ${
                isDarkMode ? "text-[#2F6CFF]" : "text-gray-400"
              }`}
            />
          </div>
        </motion.div>

        {/* AI Insights Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${cardBg} backdrop-blur-xl border ${borderColor} rounded-3xl p-6 mb-8 shadow-xl`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={textPrimary}>
                  AI Insights — 8% growth this week
                </h3>
                <Badge className="bg-green-100 text-green-700 border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Growing
                </Badge>
              </div>
              <p className={textSecondary}>
                Your response time improved by 12%. Consider raising prices by
                10% during peak hours (Thu-Sat) to maximize revenue.
              </p>
              <div className="flex gap-3 mt-4">
                <div className="px-4 py-2 bg-[#2F6CFF]/10 rounded-xl text-[#2F6CFF]">
                  💡 Suggested price: ৳550-900
                </div>
                <div className="px-4 py-2 bg-[#FF8C42]/10 rounded-xl text-[#FF8C42]">
                  📈 Potential +৳8,000 this month
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: DollarSign,
              label: "Revenue This Month",
              value: "৳25,000",
              change: "+12%",
              color: "from-[#2F6CFF] to-[#4F88FF]",
              changePositive: true,
            },
            {
              icon: Users,
              label: "Total Jobs",
              value: "156",
              change: "+8 this week",
              color: "from-[#FF8C42] to-[#FF6B35]",
              changePositive: true,
            },
            {
              icon: Star,
              label: "Average Rating",
              value: "4.9",
              change: "+0.1",
              color: "from-purple-500 to-pink-500",
              changePositive: true,
            },
            {
              icon: Award,
              label: "Trust Score",
              value: "96/100",
              change: "Top 5%",
              color: "from-green-500 to-teal-500",
              changePositive: true,
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`${cardBg} backdrop-blur-xl border ${borderColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-br ${metric.color} rounded-xl`}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    className={`${
                      metric.changePositive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } border-0`}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className={`text-sm ${textSecondary} mb-1`}>
                  {metric.label}
                </div>
                <div className={`text-2xl ${textPrimary}`}>{metric.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className={`${cardBg} backdrop-blur-xl border ${borderColor} shadow-xl`}
            >
              <CardHeader>
                <CardTitle className={textPrimary}>Revenue Trend</CardTitle>
                <CardDescription className={textSecondary}>
                  Last 6 months performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2F6CFF"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2F6CFF"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                    />
                    <XAxis
                      dataKey="month"
                      stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                    />
                    <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                        border:
                          "1px solid " + (isDarkMode ? "#374151" : "#E5E7EB"),
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2F6CFF"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demand Forecast */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className={`${cardBg} backdrop-blur-xl border ${borderColor} shadow-xl`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={textPrimary}>
                      AI Demand Forecast
                    </CardTitle>
                    <CardDescription className={textSecondary}>
                      Next 7 days prediction
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-[#FF8C42]/10 rounded-lg">
                    <Target className="w-5 h-5 text-[#FF8C42]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={demandForecast}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                    />
                    <XAxis
                      dataKey="day"
                      stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                    />
                    <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                        border:
                          "1px solid " + (isDarkMode ? "#374151" : "#E5E7EB"),
                        borderRadius: "12px",
                      }}
                    />
                    <Bar
                      dataKey="demand"
                      fill="#FF8C42"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Score & AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card
              className={`${cardBg} backdrop-blur-xl border ${borderColor} shadow-xl`}
            >
              <CardHeader>
                <CardTitle className={textPrimary}>Performance Score</CardTitle>
                <CardDescription className={textSecondary}>
                  How you're performing across key areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={textPrimary}>{metric.category}</span>
                        <span
                          className={`${textPrimary} flex items-center gap-2`}
                        >
                          {metric.score}%
                          {metric.score >= 90 && (
                            <Badge className="bg-green-100 text-green-700 border-0">
                              Excellent
                            </Badge>
                          )}
                        </span>
                      </div>
                      <Progress value={metric.score} className="h-3" />
                    </motion.div>
                  ))}
                </div>

                {/* Overall Score */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={textPrimary}>Overall Performance</div>
                      <div className={`text-sm ${textSecondary}`}>
                        Top 3% of all providers
                      </div>
                    </div>
                    <div className="text-4xl bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] bg-clip-text text-transparent">
                      93%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              className={`${cardBg} backdrop-blur-xl border ${borderColor} shadow-xl`}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className={textPrimary}>AI Tips</CardTitle>
                    <CardDescription className={textSecondary}>
                      Growth suggestions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Pricing Strategy",
                      desc: "Consider +10% for weekend bookings",
                      impact: "+৳3,200/mo",
                    },
                    {
                      icon: "⚡",
                      title: "Response Time",
                      desc: "Reply within 10 min to get more bookings",
                      impact: "+15 jobs/mo",
                    },
                    {
                      icon: "📸",
                      title: "Profile Boost",
                      desc: "Add 3 more photos to increase visibility",
                      impact: "+25% views",
                    },
                    {
                      icon: "🏆",
                      title: "Trust Badge",
                      desc: "Complete identity verification",
                      impact: "Gold Badge",
                    },
                  ].map((tip, index) => (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        isDarkMode
                          ? "bg-[#1F2937]/50 border-gray-700"
                          : "bg-[#F7F9FB] border-[#E0E7FF]"
                      } hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{tip.icon}</span>
                        <div className="flex-1">
                          <div
                            className={`${textPrimary} mb-1 group-hover:text-[#2F6CFF] transition-colors`}
                          >
                            {tip.title}
                          </div>
                          <div className={`text-sm ${textSecondary}`}>
                            {tip.desc}
                          </div>
                          <div className="text-sm text-[#FF8C42] mt-1">
                            {tip.impact}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Copilot for Providers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card
            className={`${cardBg} backdrop-blur-xl border ${borderColor} shadow-xl`}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className={textPrimary}>
                    AI Business Copilot
                  </CardTitle>
                  <CardDescription className={textSecondary}>
                    Intelligent recommendations to maximize your revenue
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Demand Prediction */}
                <div
                  className={`p-4 rounded-xl border ${
                    isDarkMode
                      ? "bg-blue-900/20 border-blue-700"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h4 className={textPrimary}>Demand Forecast</h4>
                  </div>
                  <p className={`text-sm ${textSecondary} mb-2`}>
                    AC repair demand expected to rise <strong>25%</strong> in
                    Mirpur next week due to heat wave.
                  </p>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">
                      Increase availability by 30%
                    </span>
                  </div>
                </div>

                {/* Pricing Strategy */}
                <div
                  className={`p-4 rounded-xl border ${
                    isDarkMode
                      ? "bg-green-900/20 border-green-700"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <h4 className={textPrimary}>Smart Pricing</h4>
                  </div>
                  <p className={`text-sm ${textSecondary} mb-2`}>
                    Optimal price range: <strong>৳650-850</strong> for weekend
                    bookings based on demand analysis.
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">
                      +৳12,000 potential monthly increase
                    </span>
                  </div>
                </div>

                {/* Risk Alert */}
                <div
                  className={`p-4 rounded-xl border ${
                    isDarkMode
                      ? "bg-orange-900/20 border-orange-700"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h4 className={textPrimary}>Risk Alert</h4>
                  </div>
                  <p className={`text-sm ${textSecondary} mb-2`}>
                    Competition increased by <strong>15%</strong> in your area.
                    Consider expanding service radius.
                  </p>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      Explore Dhanmondi area
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Insights Timeline */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className={`${textPrimary} mb-4`}>AI Insights Timeline</h4>
                <div className="space-y-3">
                  {[
                    {
                      time: "2 hours ago",
                      type: "opportunity",
                      message:
                        "High demand detected in Gulshan area - consider expanding coverage",
                      icon: TrendingUp,
                      color: "text-green-500",
                    },
                    {
                      time: "6 hours ago",
                      type: "pricing",
                      message:
                        "Optimal pricing window: Increase rates by 15% for next 3 days",
                      icon: DollarSign,
                      color: "text-blue-500",
                    },
                    {
                      time: "1 day ago",
                      type: "warning",
                      message:
                        "Response time slower than average - may impact rankings",
                      icon: AlertTriangle,
                      color: "text-orange-500",
                    },
                  ].map((insight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <insight.icon
                        className={`w-4 h-4 mt-0.5 ${insight.color}`}
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${textPrimary}`}>
                          {insight.message}
                        </p>
                        <p className={`text-xs ${textSecondary} mt-1`}>
                          {insight.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
