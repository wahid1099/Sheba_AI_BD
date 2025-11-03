import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  MapPin,
  Clock,
  TrendingUp,
  Zap,
  X,
  Check,
  Star,
  Cloud,
  Sun,
  CloudRain,
  Target,
  Users,
  Activity,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRecommendations } from "../contexts/RecommendationContext";

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case "location":
      return MapPin;
    case "time":
      return Clock;
    case "behavior":
      return TrendingUp;
    case "context":
      return Zap;
    case "cross-domain":
      return Brain;
    default:
      return Target;
  }
};

const getRecommendationColor = (type: string) => {
  switch (type) {
    case "location":
      return "from-blue-500 to-blue-600";
    case "time":
      return "from-purple-500 to-purple-600";
    case "behavior":
      return "from-green-500 to-green-600";
    case "context":
      return "from-orange-500 to-orange-600";
    case "cross-domain":
      return "from-pink-500 to-pink-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny":
      return Sun;
    case "cloudy":
      return Cloud;
    case "rainy":
      return CloudRain;
    default:
      return Sun;
  }
};

export const SmartRecommendations: React.FC = () => {
  const {
    recommendations,
    contextualData,
    userLocation,
    dismissRecommendation,
    acceptRecommendation,
    generateRecommendations,
  } = useRecommendations();

  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const WeatherIcon = getWeatherIcon(contextualData.weather.condition);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Context Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937] dark:text-white">
                AI Smart Recommendations
              </h1>
              <p className="text-[#6B7280] dark:text-gray-300">
                Context-aware suggestions powered by advanced AI
              </p>
            </div>
          </div>
          <Button
            onClick={generateRecommendations}
            className="bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] hover:from-[#1F5CFF] hover:to-[#3F78FF]"
          >
            <Activity className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Context Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-[#1F2937] dark:text-white">
                {userLocation?.area || "Unknown"}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-300">
                {userLocation?.city || "Location"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <WeatherIcon className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-[#1F2937] dark:text-white">
                {contextualData.weather.temperature.toFixed(1)}°C
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-300 capitalize">
                {contextualData.weather.condition}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Clock className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-[#1F2937] dark:text-white capitalize">
                {contextualData.timeOfDay}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-300 capitalize">
                {contextualData.dayOfWeek}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Users className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-[#1F2937] dark:text-white">
                {recommendations.length} Active
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-300">
                Recommendations
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {recommendations.map((rec, index) => {
            const IconComponent = getRecommendationIcon(rec.type);
            const isExpanded = expandedRec === rec.id;

            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 bg-gradient-to-r ${getRecommendationColor(
                            rec.type
                          )} rounded-lg`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-[#1F2937] dark:text-white">
                            {rec.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-xs capitalize"
                            >
                              {rec.type.replace("-", " ")}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-[#6B7280] dark:text-gray-300">
                                {(rec.confidence * 100).toFixed(0)}% match
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissRecommendation(rec.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-[#6B7280] dark:text-gray-300 mb-4">
                      {rec.description}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <h4 className="font-medium text-[#1F2937] dark:text-white mb-2">
                            AI Analysis Details:
                          </h4>
                          <div className="space-y-2 text-sm text-[#6B7280] dark:text-gray-300">
                            <div className="flex justify-between">
                              <span>Category:</span>
                              <span className="capitalize">{rec.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Confidence:</span>
                              <span>{(rec.confidence * 100).toFixed(1)}%</span>
                            </div>
                            {rec.metadata.urgency && (
                              <div className="flex justify-between">
                                <span>Urgency:</span>
                                <Badge
                                  variant={
                                    rec.metadata.urgency === "high"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {rec.metadata.urgency}
                                </Badge>
                              </div>
                            )}
                            {rec.metadata.factors && (
                              <div>
                                <span>AI Factors:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {rec.metadata.factors.map(
                                    (factor: string) => (
                                      <Badge
                                        key={factor}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {factor}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setExpandedRec(isExpanded ? null : rec.id)
                        }
                      >
                        {isExpanded ? "Less Details" : "More Details"}
                      </Button>

                      {rec.actionable && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => acceptRecommendation(rec.id)}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {recommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4">
            <Brain className="w-8 h-8 text-gray-400 mx-auto mt-2" />
          </div>
          <h3 className="text-lg font-medium text-[#1F2937] dark:text-white mb-2">
            No Recommendations Available
          </h3>
          <p className="text-[#6B7280] dark:text-gray-300 mb-4">
            AI is analyzing your patterns and context to generate personalized
            suggestions.
          </p>
          <Button onClick={generateRecommendations} variant="outline">
            Generate Recommendations
          </Button>
        </motion.div>
      )}

      {/* AI Insights Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2F6CFF]/10 to-[#4F88FF]/10 rounded-2xl p-6 border border-[#2F6CFF]/20"
      >
        <div className="flex items-center space-x-3 mb-3">
          <Zap className="w-5 h-5 text-[#2F6CFF]" />
          <h3 className="font-semibold text-[#1F2937] dark:text-white">
            AI Recommendation Engine
          </h3>
        </div>
        <p className="text-sm text-[#6B7280] dark:text-gray-300">
          Our advanced AI analyzes location data, time patterns, user behavior,
          weather conditions, and local trends to provide contextually relevant
          service recommendations. The system continuously learns from your
          interactions to improve suggestion accuracy.
        </p>
      </motion.div>
    </div>
  );
};
