import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Star,
  MapPin,
  Clock,
  Shield,
  TrendingUp,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronDown,
  Award,
  BadgeCheck,
  Mic,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProviderData {
  id: string;
  nameKey: string;
  image: string;
  rating: number;
  reviews: number;
  trustScore: number;
  price: string;
  distance: string;
  responseTime: string;
  completedJobs: number;
  specialtyKeys: string[];
  verified: boolean;
  available: boolean;
}

const getProviders = (): ProviderData[] => [
  {
    id: "1",
    nameKey: "smartMatch.providers.rashedAhmed",
    image:
      "https://images.unsplash.com/photo-1758519290233-a03c1d17ecc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlJTIwcHJvdmlkZXJ8ZW58MXx8fHwxNzYyMDg5OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 234,
    trustScore: 96,
    price: "৳500-800",
    distance: "1.2 km",
    responseTime: "< 15 min",
    completedJobs: 456,
    specialtyKeys: [
      "smartMatch.specialties.acRepair",
      "smartMatch.specialties.fridgeRepair",
      "smartMatch.specialties.electrical",
    ],
    verified: true,
    available: true,
  },
  {
    id: "2",
    nameKey: "smartMatch.providers.sadiaRahman",
    image:
      "https://images.unsplash.com/photo-1589995635011-078e0bb91d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MjA4OTk2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 189,
    trustScore: 94,
    price: "৳400-700",
    distance: "2.5 km",
    responseTime: "< 20 min",
    completedJobs: 378,
    specialtyKeys: [
      "smartMatch.specialties.homeCleaning",
      "smartMatch.specialties.deepCleaning",
      "smartMatch.specialties.sanitization",
    ],
    verified: true,
    available: true,
  },
  {
    id: "3",
    nameKey: "smartMatch.providers.kamalHossain",
    image:
      "https://images.unsplash.com/photo-1603114595741-e60bf9486e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcmVwYWlyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MjA4OTk2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 156,
    trustScore: 92,
    price: "৳600-900",
    distance: "3.1 km",
    responseTime: "< 30 min",
    completedJobs: 289,
    specialtyKeys: [
      "smartMatch.specialties.plumbing",
      "smartMatch.specialties.pipeRepair",
      "smartMatch.specialties.waterHeater",
    ],
    verified: true,
    available: false,
  },
];

const getRankingFactors = () => [
  { nameKey: "smartMatch.trustScore", value: 35, color: "bg-[#2F6CFF]" },
  { nameKey: "smartMatch.rating", value: 25, color: "bg-[#FF8C42]" },
  { nameKey: "smartMatch.responseTime", value: 20, color: "bg-purple-500" },
  { nameKey: "smartMatch.distance", value: 15, color: "bg-green-500" },
  { nameKey: "smartMatch.priceMatch", value: 5, color: "bg-yellow-500" },
];

export function SmartMatchResults() {
  const { t } = useLanguage();
  const [showRanking, setShowRanking] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] via-[#EEF2F6] to-[#E0E7FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-[#2F6CFF]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-4 md:p-6 shadow-lg transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-[#1F2937] dark:text-white transition-colors duration-300 text-lg md:text-xl">
                    {t("smartMatch.title")}
                  </h2>
                  <p className="text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                    12 {t("smartMatch.subtitle")}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="gap-2 text-sm"
                onClick={() => setShowRanking(!showRanking)}
              >
                <TrendingUp className="w-4 h-4" />
                {t("smartMatch.howAiRanks")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showRanking ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            {/* AI Ranking Logic */}
            {showRanking && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-[#E0E7FF] dark:border-gray-600"
              >
                <h4 className="text-[#1F2937] dark:text-white mb-3 transition-colors duration-300">
                  {t("smartMatch.aiRankingTransparency")}
                </h4>
                <p className="text-sm text-[#6B7280] dark:text-gray-300 mb-4 transition-colors duration-300">
                  {t("smartMatch.aiRankingDescription")}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {getRankingFactors().map((factor, index) => (
                    <motion.div
                      key={factor.nameKey}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="mb-2">
                        <div
                          className={`h-2 ${factor.color} rounded-full mx-auto`}
                          style={{ width: `${factor.value * 2}%` }}
                        />
                      </div>
                      <div className="text-[#1F2937] dark:text-white transition-colors duration-300 font-semibold">
                        {factor.value}%
                      </div>
                      <div className="text-xs text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                        {t(factor.nameKey)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Provider Cards */}
        <div className="space-y-4 md:space-y-6">
          {getProviders().map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* AI Top Pick Badge */}
              {index === 0 && (
                <div className="absolute -top-3 left-3 md:left-6 z-10 bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] text-white px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{t("smartMatch.aiTopPick")}</span>
                </div>
              )}

              <div
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-2 ${
                  index === 0
                    ? "border-[#FF8C42]"
                    : "border-white/50 dark:border-gray-700/50"
                } rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  selectedProvider === provider.id
                    ? "ring-4 ring-[#2F6CFF]/30"
                    : ""
                }`}
              >
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Provider Image & Basic Info */}
                    <div className="lg:col-span-8">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-600 shadow-lg">
                            <ImageWithFallback
                              src={provider.image}
                              alt={t(provider.nameKey)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {provider.available && (
                            <div className="absolute -bottom-2 -right-2 bg-green-400 text-white text-xs px-2 py-1 rounded-full border-2 border-white dark:border-gray-600">
                              {t("smartMatch.available")}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 justify-center sm:justify-start">
                                <h3 className="text-[#1F2937] dark:text-white transition-colors duration-300 text-lg">
                                  {t(provider.nameKey)}
                                </h3>
                                {provider.verified && (
                                  <BadgeCheck className="w-5 h-5 text-[#2F6CFF]" />
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1 justify-center sm:justify-start flex-wrap">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-[#FF8C42] text-[#FF8C42]" />
                                  <span className="text-[#1F2937] dark:text-white transition-colors duration-300">
                                    {provider.rating}
                                  </span>
                                  <span className="text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                                    ({provider.reviews})
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                                  <Award className="w-4 h-4" />
                                  <span>{provider.completedJobs} jobs</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                            {provider.specialtyKeys.map((specialtyKey, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-[#F7F9FB] dark:bg-gray-700 text-[#2F6CFF] dark:text-blue-400 border border-[#E0E7FF] dark:border-gray-600 transition-colors duration-300 text-xs"
                              >
                                {t(specialtyKey)}
                              </Badge>
                            ))}
                          </div>

                          {/* Quick Stats */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            <div className="bg-[#F7F9FB] dark:bg-gray-700/50 rounded-xl p-2 sm:p-3 transition-colors duration-300">
                              <div className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-gray-300 mb-1 transition-colors duration-300">
                                <MapPin className="w-3 h-3" />
                                {t("smartMatch.distance")}
                              </div>
                              <div className="text-[#1F2937] dark:text-white transition-colors duration-300 font-semibold">
                                {provider.distance}
                              </div>
                            </div>
                            <div className="bg-[#F7F9FB] dark:bg-gray-700/50 rounded-xl p-2 sm:p-3 transition-colors duration-300">
                              <div className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-gray-300 mb-1 transition-colors duration-300">
                                <Clock className="w-3 h-3" />
                                {t("smartMatch.responseTime")}
                              </div>
                              <div className="text-[#1F2937] dark:text-white transition-colors duration-300 font-semibold">
                                {provider.responseTime}
                              </div>
                            </div>
                            <div className="bg-[#F7F9FB] dark:bg-gray-700/50 rounded-xl p-2 sm:p-3 transition-colors duration-300">
                              <div className="flex items-center gap-1 text-xs text-[#6B7280] dark:text-gray-300 mb-1 transition-colors duration-300">
                                <span className="text-[#FF8C42]">৳</span>
                                Price
                              </div>
                              <div className="text-[#1F2937] dark:text-white transition-colors duration-300 font-semibold">
                                {provider.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Trust Score & Actions */}
                    <div className="lg:col-span-4 flex flex-col">
                      {/* AI Trust Score */}
                      <div className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-2xl p-4 text-white mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span>AI Trust Score</span>
                          </div>
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex items-end gap-2 mb-2">
                          <div className="text-4xl">{provider.trustScore}</div>
                          <div className="text-xl mb-1">/100</div>
                        </div>
                        <Progress
                          value={provider.trustScore}
                          className="h-2 bg-white/20"
                        />
                        <div className="text-xs mt-2 opacity-90">
                          Based on verification, reviews, and performance
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 mt-4 lg:mt-auto">
                        <Button
                          className="w-full bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] hover:from-[#2557CC] to-[#3D6FCC] text-white rounded-xl py-4 md:py-6 gap-2 text-sm md:text-base"
                          onClick={() => setSelectedProvider(provider.id)}
                        >
                          <Sparkles className="w-4 h-4" />
                          {t("smartMatch.bookInstantly")}
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="rounded-xl gap-2 text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            {t("smartMatch.call")}
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-xl gap-2 text-sm"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {t("smartMatch.chat")}
                          </Button>
                        </div>

                        {/* Voice Booking */}
                        <Button
                          variant="ghost"
                          className="w-full text-[#2F6CFF] dark:text-blue-400 gap-2 text-sm transition-colors duration-300"
                        >
                          <Mic className="w-4 h-4" />
                          {t("smartMatch.voiceBook")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedProvider === provider.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-[#E0E7FF] bg-[#F7F9FB]/50 p-6"
                  >
                    <h4 className="text-[#1F2937] mb-3">
                      Why AI Recommends This Provider
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#2F6CFF]/10 rounded-lg">
                          <Shield className="w-5 h-5 text-[#2F6CFF]" />
                        </div>
                        <div>
                          <div className="text-[#1F2937]">
                            Verified Identity
                          </div>
                          <div className="text-sm text-[#6B7280]">
                            Government ID + Background check
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#FF8C42]/10 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-[#FF8C42]" />
                        </div>
                        <div>
                          <div className="text-[#1F2937]">High Performance</div>
                          <div className="text-sm text-[#6B7280]">
                            98% satisfaction rate
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-[#1F2937]">Fast Response</div>
                          <div className="text-sm text-[#6B7280]">
                            Usually replies within minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
