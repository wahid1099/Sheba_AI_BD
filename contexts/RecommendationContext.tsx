import React, { createContext, useContext, useState, useEffect } from "react";

interface LocationData {
  lat: number;
  lng: number;
  city: string;
  area: string;
}

interface UserBehavior {
  serviceHistory: string[];
  timePatterns: Record<string, number>;
  preferences: string[];
  lastActivity: Date;
}

interface ContextualData {
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
  };
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  dayOfWeek: string;
  localTrends: string[];
}

interface Recommendation {
  id: string;
  type: "location" | "time" | "behavior" | "context" | "cross-domain";
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  category: string;
  metadata: Record<string, any>;
}

interface RecommendationContextType {
  recommendations: Recommendation[];
  userLocation: LocationData | null;
  userBehavior: UserBehavior;
  contextualData: ContextualData;
  generateRecommendations: () => Promise<void>;
  updateUserBehavior: (action: string, category: string) => void;
  dismissRecommendation: (id: string) => void;
  acceptRecommendation: (id: string) => void;
}

const RecommendationContext = createContext<
  RecommendationContextType | undefined
>(undefined);

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error(
      "useRecommendations must be used within a RecommendationProvider"
    );
  }
  return context;
};

interface RecommendationProviderProps {
  children: React.ReactNode;
}

export const RecommendationProvider: React.FC<RecommendationProviderProps> = ({
  children,
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    serviceHistory: [],
    timePatterns: {},
    preferences: [],
    lastActivity: new Date(),
  });
  const [contextualData, setContextualData] = useState<ContextualData>({
    weather: { temperature: 28, condition: "sunny", humidity: 65 },
    timeOfDay: getTimeOfDay(),
    dayOfWeek: new Date()
      .toLocaleDateString("en", { weekday: "short" })
      .toLowerCase(),
    localTrends: [],
  });

  // Initialize location and context data
  useEffect(() => {
    initializeUserContext();
    const interval = setInterval(updateContextualData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  }

  const initializeUserContext = async () => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: "Dhaka",
            area: "Gulshan",
          });
        },
        () => {
          // Default to Dhaka if location access denied
          setUserLocation({
            lat: 23.8103,
            lng: 90.4125,
            city: "Dhaka",
            area: "Gulshan",
          });
        }
      );
    }

    // Load user behavior from localStorage
    const savedBehavior = localStorage.getItem("userBehavior");
    if (savedBehavior) {
      setUserBehavior(JSON.parse(savedBehavior));
    }
  };

  const updateContextualData = async () => {
    // Simulate weather API call
    const mockWeatherData = {
      temperature: 28 + Math.random() * 10,
      condition: ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)],
      humidity: 60 + Math.random() * 30,
    };

    setContextualData((prev) => ({
      ...prev,
      weather: mockWeatherData,
      timeOfDay: getTimeOfDay(),
      dayOfWeek: new Date()
        .toLocaleDateString("en", { weekday: "short" })
        .toLowerCase(),
    }));
  };

  const generateLocationBasedRecommendations = (): Recommendation[] => {
    const recs: Recommendation[] = [];

    if (contextualData.weather.temperature > 32) {
      recs.push({
        id: "loc-ac-repair",
        type: "location",
        title: "AC Repair Services Trending",
        description: `AC repair services are trending nearby as temperature rose to ${contextualData.weather.temperature.toFixed(
          1
        )}°C today.`,
        confidence: 0.85,
        actionable: true,
        category: "repair",
        metadata: { service: "ac-repair", urgency: "high" },
      });
    }

    if (contextualData.timeOfDay === "morning") {
      recs.push({
        id: "loc-coffee",
        type: "location",
        title: "Popular Morning Spots",
        description:
          "Users near you often visit CoffeeWave Café for morning productivity boosts.",
        confidence: 0.72,
        actionable: true,
        category: "food",
        metadata: { service: "cafe", timeRelevant: true },
      });
    }

    return recs;
  };

  const generateTimeBasedRecommendations = (): Recommendation[] => {
    const recs: Recommendation[] = [];
    const hour = new Date().getHours();

    if (contextualData.timeOfDay === "afternoon" && hour >= 16) {
      recs.push({
        id: "time-productivity",
        type: "time",
        title: "Productivity Break Time",
        description:
          "Users often book productivity breaks at 4 PM — want to schedule one?",
        confidence: 0.68,
        actionable: true,
        category: "wellness",
        metadata: { optimalTime: "16:00", duration: "15min" },
      });
    }

    if (contextualData.timeOfDay === "evening") {
      recs.push({
        id: "time-yoga",
        type: "time",
        title: "Evening Relaxation",
        description:
          "People in your area book stress-relief yoga sessions after 8 PM.",
        confidence: 0.75,
        actionable: true,
        category: "wellness",
        metadata: { service: "yoga", timeSlot: "evening" },
      });
    }

    return recs;
  };

  const generateBehaviorBasedRecommendations = (): Recommendation[] => {
    const recs: Recommendation[] = [];

    if (userBehavior.serviceHistory.includes("cleaning")) {
      recs.push({
        id: "behavior-deep-clean",
        type: "behavior",
        title: "Deep Cleaning Suggestion",
        description:
          "Based on your cleaning history, users like you often book deep cleaning monthly.",
        confidence: 0.78,
        actionable: true,
        category: "cleaning",
        metadata: {
          pattern: "monthly",
          nextSuggested: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    return recs;
  };

  const generateContextAwareRecommendations = (): Recommendation[] => {
    const recs: Recommendation[] = [];

    if (
      contextualData.weather.condition === "rainy" &&
      contextualData.timeOfDay === "evening"
    ) {
      recs.push({
        id: "context-home-spa",
        type: "context",
        title: "Rainy Evening Relaxation",
        description:
          "Since it's raining, users nearby are booking home spa services for cozy evenings.",
        confidence: 0.82,
        actionable: true,
        category: "wellness",
        metadata: { weather: "rainy", mood: "relaxation", location: "home" },
      });
    }

    return recs;
  };

  const generateCrossDomainRecommendations = (): Recommendation[] => {
    const recs: Recommendation[] = [];

    // Complex recommendation combining multiple factors
    if (
      contextualData.weather.temperature > 30 &&
      contextualData.timeOfDay === "afternoon" &&
      userBehavior.serviceHistory.includes("wellness")
    ) {
      recs.push({
        id: "cross-cooling-wellness",
        type: "cross-domain",
        title: "Beat the Heat Wellness",
        description:
          "Hot afternoon + your wellness interest = cooling massage therapy trending nearby.",
        confidence: 0.88,
        actionable: true,
        category: "wellness",
        metadata: {
          factors: ["temperature", "time", "history"],
          compound: true,
          priority: "high",
        },
      });
    }

    return recs;
  };

  const generateRecommendations = async () => {
    const allRecommendations = [
      ...generateLocationBasedRecommendations(),
      ...generateTimeBasedRecommendations(),
      ...generateBehaviorBasedRecommendations(),
      ...generateContextAwareRecommendations(),
      ...generateCrossDomainRecommendations(),
    ];

    // Sort by confidence and limit to top 5
    const sortedRecs = allRecommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);

    setRecommendations(sortedRecs);
  };

  const updateUserBehavior = (_action: string, category: string) => {
    setUserBehavior((prev) => {
      const updated = {
        ...prev,
        serviceHistory: [...prev.serviceHistory, category].slice(-20), // Keep last 20
        timePatterns: {
          ...prev.timePatterns,
          [getTimeOfDay()]: (prev.timePatterns[getTimeOfDay()] || 0) + 1,
        },
        lastActivity: new Date(),
      };

      localStorage.setItem("userBehavior", JSON.stringify(updated));
      return updated;
    });

    // Regenerate recommendations after behavior update
    setTimeout(generateRecommendations, 1000);
  };

  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((rec) => rec.id !== id));
  };

  const acceptRecommendation = (id: string) => {
    const rec = recommendations.find((r) => r.id === id);
    if (rec) {
      updateUserBehavior("accept_recommendation", rec.category);
      dismissRecommendation(id);
    }
  };

  // Generate initial recommendations
  useEffect(() => {
    if (userLocation) {
      generateRecommendations();
    }
  }, [userLocation, contextualData]);

  return (
    <RecommendationContext.Provider
      value={{
        recommendations,
        userLocation,
        userBehavior,
        contextualData,
        generateRecommendations,
        updateUserBehavior,
        dismissRecommendation,
        acceptRecommendation,
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
