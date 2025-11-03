import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, MapPin, Clock, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRecommendations } from "../contexts/RecommendationContext";

interface RecommendationWidgetProps {
  maxItems?: number;
  showHeader?: boolean;
  compact?: boolean;
}

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
      return Brain;
  }
};

export const RecommendationWidget: React.FC<RecommendationWidgetProps> = ({
  maxItems = 3,
  showHeader = true,
  compact = false,
}) => {
  const { recommendations, acceptRecommendation, dismissRecommendation } =
    useRecommendations();

  const displayRecommendations = recommendations.slice(0, maxItems);

  if (displayRecommendations.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${
        compact ? "p-4" : "p-6"
      }`}
    >
      {showHeader && (
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1F2937] dark:text-white">
              AI Recommendations
            </h3>
            <p className="text-sm text-[#6B7280] dark:text-gray-300">
              Smart suggestions for you
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {displayRecommendations.map((rec, index) => {
          const IconComponent = getRecommendationIcon(rec.type);

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
                <IconComponent className="w-4 h-4 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-[#1F2937] dark:text-white text-sm truncate">
                    {rec.title}
                  </h4>
                  <Badge variant="secondary" className="text-xs">
                    {(rec.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>

                <p className="text-xs text-[#6B7280] dark:text-gray-300 line-clamp-2">
                  {rec.description}
                </p>

                {!compact && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acceptRecommendation(rec.id)}
                      className="text-xs h-7 px-2"
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => dismissRecommendation(rec.id)}
                      className="text-xs h-7 px-2 text-gray-500"
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {recommendations.length > maxItems && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" className="text-xs">
            View All {recommendations.length} Recommendations
          </Button>
        </div>
      )}
    </motion.div>
  );
};
