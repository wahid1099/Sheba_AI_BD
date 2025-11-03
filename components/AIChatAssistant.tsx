import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Star,
  Brain,
  Volume2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  suggestions?: string[];
  timestamp: Date;
  analysis?: ServiceAnalysis;
  providers?: Provider[];
  pricing?: PricingInfo;
}

interface ServiceAnalysis {
  serviceType: string;
  urgency: "low" | "medium" | "high";
  location: string;
  complexity: "simple" | "moderate" | "complex";
  confidence: number;
}

interface Provider {
  id: string;
  name: string;
  rating: number;
  trustScore: number;
  distance: string;
  responseTime: string;
  price: string;
  whyRecommended: string[];
  availability: string;
}

interface PricingInfo {
  estimatedRange: string;
  factors: string[];
  optimal: string;
  demandLevel: "low" | "medium" | "high";
}

// We'll create this dynamically based on language

export function AIChatAssistant() {
  const { language, t } = useLanguage();

  const getInitialMessages = (): Message[] => [
    {
      id: "1",
      type: "ai",
      content:
        language === "bn"
          ? "আসসালামু আলাইকুম! আমি শেবা-এআই বিডি, আপনার বহুভাষিক সেবা সহায়ক। 🤖 বাংলা বা ইংরেজিতে আপনার প্রয়োজনীয় সেবার কথা বলুন, আমি উন্নত এআই ম্যাচিং ব্যবহার করে নিখুঁত মিল খুঁজে দেব!"
          : "Assalamu Alaikum! I'm SHEBA-AI BD, your multilingual service assistant. 🤖 Tell me what service you need in Bangla or English, and I'll find the perfect match using advanced AI matching!",
      suggestions:
        language === "bn"
          ? [
              "আমার এসি ঠিক করতে হবে",
              "গণিতের টিউটর দরকার",
              "প্লাম্বার দরকার",
              "বাসা পরিষ্কারের সেবা",
            ]
          : [
              "Need AC repair",
              "Need a math tutor",
              "Need a plumber",
              "House cleaning service",
            ],
      timestamp: new Date(),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(getInitialMessages());
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Update initial message when language changes
  useEffect(() => {
    setMessages(getInitialMessages());
  }, [language]);

  // Advanced NLP Analysis with Intent Recognition
  const analyzeUserInput = (text: string): ServiceAnalysis => {
    const lowerText = text.toLowerCase();

    // Enhanced service type detection with more patterns
    let serviceType = "general";
    let confidence = 0.7;

    // AC/Cooling services
    if (lowerText.match(/(ac|air condition|cooling|refrigerat|এসি|ফ্রিজ)/)) {
      serviceType = "AC & Refrigeration";
      confidence = 0.95;
    }
    // Plumbing services
    else if (
      lowerText.match(
        /(plumb|pipe|water|leak|tap|bathroom|প্লাম্বার|পানি|পাইপ)/
      )
    ) {
      serviceType = "Plumbing";
      confidence = 0.93;
    }
    // Electrical services
    else if (
      lowerText.match(/(electric|wiring|power|light|fan|বিদ্যুৎ|লাইট)/)
    ) {
      serviceType = "Electrical";
      confidence = 0.91;
    }
    // Cleaning services
    else if (lowerText.match(/(clean|wash|maid|house|home|পরিষ্কার|ধোয়া)/)) {
      serviceType = "Cleaning";
      confidence = 0.89;
    }
    // Tutoring/Education
    else if (
      lowerText.match(/(tutor|teach|study|math|english|টিউটর|পড়া|গণিত)/)
    ) {
      serviceType = "Tutoring";
      confidence = 0.87;
    }
    // Beauty services
    else if (lowerText.match(/(beauty|salon|hair|makeup|সৌন্দর্য|চুল)/)) {
      serviceType = "Beauty & Wellness";
      confidence = 0.85;
    }

    // Advanced urgency detection with time patterns
    let urgency: "low" | "medium" | "high" = "medium";
    if (
      lowerText.match(
        /(urgent|emergency|asap|now|immediately|জরুরি|এখনই|তাড়াতাড়ি)/
      )
    ) {
      urgency = "high";
    } else if (lowerText.match(/(today|tonight|আজ|আজকে)/)) {
      urgency = "high";
    } else if (lowerText.match(/(tomorrow|soon|next|আগামীকাল|শীঘ্রই)/)) {
      urgency = "medium";
    } else if (lowerText.match(/(week|month|later|সপ্তাহ|মাস|পরে)/)) {
      urgency = "low";
    }

    // Location extraction (enhanced)
    let location = "Mirpur, Dhaka"; // Default
    if (lowerText.match(/(dhanmondi|ধানমন্ডি)/)) location = "Dhanmondi, Dhaka";
    else if (lowerText.match(/(gulshan|গুলশান)/)) location = "Gulshan, Dhaka";
    else if (lowerText.match(/(uttara|উত্তরা)/)) location = "Uttara, Dhaka";
    else if (lowerText.match(/(chittagong|চট্টগ্রাম)/)) location = "Chittagong";

    // Complexity assessment
    let complexity: "simple" | "moderate" | "complex" = "moderate";
    if (lowerText.match(/(install|repair|fix|মেরামত|ঠিক)/)) {
      complexity = "moderate";
    } else if (lowerText.match(/(replace|rewire|renovation|বদল|নতুন)/)) {
      complexity = "complex";
    } else if (lowerText.match(/(check|clean|basic|পরিষ্কার|দেখা)/)) {
      complexity = "simple";
    }

    return {
      serviceType,
      urgency,
      location,
      complexity,
      confidence,
    };
  };

  // ML-Powered Provider Matching & Ranking
  const generateProviders = (analysis: ServiceAnalysis): Provider[] => {
    // Simulated provider database with ML scoring
    const allProviders = [
      {
        id: "1",
        name: "রাশেদ আহমেদ",
        rating: 4.9,
        trustScore: 96,
        distance: 1.2,
        responseTime: 15,
        completionRate: 99,
        specialties: ["AC Repair", "Electrical", "AC & Refrigeration"],
        priceRange: [500, 800],
        availability: "now",
        fraudRisk: 0.02,
        experienceYears: 8,
        jobsCompleted: 456,
      },
      {
        id: "2",
        name: "সাদিয়া রহমান",
        rating: 4.8,
        trustScore: 94,
        distance: 2.1,
        responseTime: 20,
        completionRate: 97,
        specialties: ["Cleaning", "Beauty & Wellness"],
        priceRange: [450, 750],
        availability: "30min",
        fraudRisk: 0.01,
        experienceYears: 5,
        jobsCompleted: 378,
      },
      {
        id: "3",
        name: "কামাল হোসেন",
        rating: 4.7,
        trustScore: 92,
        distance: 3.5,
        responseTime: 25,
        completionRate: 95,
        specialties: ["Plumbing", "Electrical"],
        priceRange: [400, 700],
        availability: "1hour",
        fraudRisk: 0.03,
        experienceYears: 12,
        jobsCompleted: 623,
      },
      {
        id: "4",
        name: "ফাতিমা খাতুন",
        rating: 4.9,
        trustScore: 98,
        distance: 0.8,
        responseTime: 10,
        completionRate: 98,
        specialties: ["Tutoring", "Beauty & Wellness"],
        priceRange: [300, 600],
        availability: "now",
        fraudRisk: 0.01,
        experienceYears: 6,
        jobsCompleted: 289,
      },
    ];

    // ML Ranking Algorithm with weighted scoring
    const rankedProviders = allProviders
      .filter(
        (provider) =>
          provider.specialties.includes(analysis.serviceType) ||
          analysis.serviceType === "general"
      )
      .map((provider) => {
        // Multi-factor ML scoring
        let mlScore = 0;

        // Specialty match (30% weight)
        const specialtyMatch = provider.specialties.includes(
          analysis.serviceType
        )
          ? 1
          : 0.3;
        mlScore += specialtyMatch * 0.3;

        // Distance factor (20% weight) - closer is better
        const distanceScore = Math.max(0, 1 - provider.distance / 10);
        mlScore += distanceScore * 0.2;

        // Trust & Rating (25% weight)
        const trustScore =
          (provider.trustScore / 100) * 0.15 + (provider.rating / 5) * 0.1;
        mlScore += trustScore * 0.25;

        // Availability urgency match (15% weight)
        let availabilityScore = 0.5;
        if (analysis.urgency === "high" && provider.availability === "now")
          availabilityScore = 1;
        else if (
          analysis.urgency === "medium" &&
          provider.availability !== "1hour"
        )
          availabilityScore = 0.8;
        mlScore += availabilityScore * 0.15;

        // Completion rate & fraud risk (10% weight)
        const reliabilityScore =
          (provider.completionRate / 100) * (1 - provider.fraudRisk);
        mlScore += reliabilityScore * 0.1;

        return {
          ...provider,
          mlScore,
        };
      })
      .sort((a, b) => b.mlScore - a.mlScore)
      .slice(0, 3); // Top 3 matches

    // Convert to display format with AI explanations
    return rankedProviders.map((provider) => {
      const whyRecommended = [];

      if (provider.specialties.includes(analysis.serviceType)) {
        whyRecommended.push(`Specialized in ${analysis.serviceType}`);
      }
      if (provider.completionRate >= 98) {
        whyRecommended.push(`${provider.completionRate}% completion rate`);
      }
      if (provider.trustScore >= 95) {
        whyRecommended.push("AI-verified top provider");
      }
      if (provider.distance <= 2) {
        whyRecommended.push("Close to your location");
      }
      if (provider.fraudRisk <= 0.02) {
        whyRecommended.push("Low fraud risk score");
      }
      if (analysis.urgency === "high" && provider.availability === "now") {
        whyRecommended.push("Available for urgent requests");
      }

      const availabilityText =
        provider.availability === "now"
          ? "Available now"
          : provider.availability === "30min"
          ? "Available in 30 min"
          : "Available in 1 hour";

      return {
        id: provider.id,
        name: provider.name,
        rating: provider.rating,
        trustScore: provider.trustScore,
        distance: `${provider.distance} km`,
        responseTime: `< ${provider.responseTime} min`,
        price: `৳${provider.priceRange[0]}-${provider.priceRange[1]}`,
        whyRecommended,
        availability: availabilityText,
      };
    });
  };

  // AI Dynamic Pricing Engine
  const generatePricing = (analysis: ServiceAnalysis): PricingInfo => {
    // Base pricing by service category
    const servicePricing = {
      "AC & Refrigeration": { base: 650, complexity: 1.4 },
      Plumbing: { base: 500, complexity: 1.3 },
      Electrical: { base: 550, complexity: 1.5 },
      Cleaning: { base: 350, complexity: 1.1 },
      Tutoring: { base: 400, complexity: 1.2 },
      "Beauty & Wellness": { base: 450, complexity: 1.1 },
      general: { base: 400, complexity: 1.2 },
    };

    const serviceConfig =
      servicePricing[analysis.serviceType as keyof typeof servicePricing] ||
      servicePricing.general;
    let basePrice = serviceConfig.base;

    // Dynamic pricing factors
    const factors = [];
    let multiplier = 1.0;

    // 1. Urgency pricing (surge pricing)
    if (analysis.urgency === "high") {
      multiplier *= 1.4;
      factors.push("Urgent request (+40%)");
    } else if (analysis.urgency === "medium") {
      multiplier *= 1.15;
      factors.push("Same-day service (+15%)");
    } else {
      factors.push("Flexible timing (standard rate)");
    }

    // 2. Complexity adjustment
    if (analysis.complexity === "complex") {
      multiplier *= serviceConfig.complexity;
      factors.push(
        `Complex job (+${Math.round((serviceConfig.complexity - 1) * 100)}%)`
      );
    } else if (analysis.complexity === "simple") {
      multiplier *= 0.85;
      factors.push("Simple task (-15%)");
    }

    // 3. Location-based pricing
    const locationMultipliers = {
      "Gulshan, Dhaka": 1.3,
      "Dhanmondi, Dhaka": 1.2,
      "Uttara, Dhaka": 1.1,
      "Mirpur, Dhaka": 1.0,
      Chittagong: 0.9,
    };
    const locationMultiplier =
      locationMultipliers[
        analysis.location as keyof typeof locationMultipliers
      ] || 1.0;
    multiplier *= locationMultiplier;
    if (locationMultiplier > 1) {
      factors.push(
        `Premium area (+${Math.round((locationMultiplier - 1) * 100)}%)`
      );
    }

    // 4. Time-based demand (simulated)
    const currentHour = new Date().getHours();
    let demandLevel: "low" | "medium" | "high" = "medium";

    if (currentHour >= 18 && currentHour <= 21) {
      // Evening peak
      multiplier *= 1.2;
      demandLevel = "high";
      factors.push("Peak hours (+20%)");
    } else if (currentHour >= 9 && currentHour <= 17) {
      // Business hours
      demandLevel = "medium";
      factors.push("Regular hours");
    } else {
      // Off-peak
      multiplier *= 0.9;
      demandLevel = "low";
      factors.push("Off-peak discount (-10%)");
    }

    // 5. Weekend surge (simulated)
    const isWeekend = [0, 6].includes(new Date().getDay());
    if (isWeekend) {
      multiplier *= 1.15;
      factors.push("Weekend service (+15%)");
    }

    // Calculate final pricing
    const finalPrice = Math.round(basePrice * multiplier);
    const minPrice = Math.round(finalPrice * 0.85);
    const maxPrice = Math.round(finalPrice * 1.25);

    // AI optimization suggestion
    const optimizedPrice = Math.round(finalPrice * 0.95); // Slightly below market for better conversion

    return {
      estimatedRange: `৳${minPrice}-${maxPrice}`,
      optimal: `৳${optimizedPrice}`,
      factors: [
        `Base rate: ${analysis.serviceType}`,
        ...factors,
        `AI confidence: ${Math.round(analysis.confidence * 100)}%`,
      ],
      demandLevel,
    };
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setIsAnalyzing(true);

    // Simulate advanced AI processing
    setTimeout(() => {
      const analysis = analyzeUserInput(messageText);
      const providers = generateProviders(analysis);
      const pricing = generatePricing(analysis);

      setIsAnalyzing(false);
      setIsTyping(false);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Perfect! I analyzed your request using advanced NLP. I found ${providers.length} highly-rated providers for ${analysis.serviceType} near ${analysis.location}. Here are my AI-powered recommendations:`,
        timestamp: new Date(),
        analysis,
        providers,
        pricing,
        suggestions: [
          "Book top provider now",
          "Compare all options",
          "Adjust price range",
          "Voice call provider",
        ],
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleVoiceInput = () => {
    setIsListening(true);

    // Provide audio feedback for accessibility
    const startMessage =
      language === "bn"
        ? "আমি শুনছি। আপনার সেবার প্রয়োজন বলুন।"
        : "I'm listening. Please tell me what service you need.";

    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(startMessage);
      utterance.lang = language === "bn" ? "bn-BD" : "en-US";
      window.speechSynthesis.speak(utterance);
    }

    // Simulate advanced voice recognition with accessibility features
    setTimeout(() => {
      setIsListening(false);
      const voiceText =
        language === "bn"
          ? "আমার এসি ঠিক করতে হবে আজকেই"
          : "I need my AC fixed today";
      setInputValue(voiceText);

      // Confirm voice input for accessibility
      const confirmMessage =
        language === "bn"
          ? "আপনার অনুরোধ বুঝতে পেরেছি। এসি মেরামতের জন্য খোঁজ করছি।"
          : "I understood your request. Searching for AC repair services.";

      if (window.speechSynthesis) {
        const confirmUtterance = new SpeechSynthesisUtterance(confirmMessage);
        confirmUtterance.lang = language === "bn" ? "bn-BD" : "en-US";
        window.speechSynthesis.speak(confirmUtterance);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] via-[#EEF2F6] to-[#E0E7FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-[#2F6CFF]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF8C42]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-4 shadow-lg transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-[#2F6CFF]">
                  <AvatarFallback className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white">
                    <Sparkles className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[#1F2937] dark:text-white transition-colors duration-300">
                  SHEBA-AI BD Assistant
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                  Multilingual • Trust Intelligence • Voice Enabled
                </p>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  {t("common.online")}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  {message.type === "ai" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white">
                          <Sparkles className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                        SHEBA-AI BD
                      </span>
                    </div>
                  )}

                  <motion.div
                    className={`rounded-2xl p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white ml-auto"
                        : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 text-[#1F2937] dark:text-white shadow-lg transition-colors duration-300"
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {/* Service Analysis Display */}
                    {message.analysis && (
                      <div className="mt-4 p-4 bg-[#F7F9FB] dark:bg-gray-700/50 rounded-xl border border-[#E0E7FF] dark:border-gray-600 transition-colors duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-[#2F6CFF]">
                            AI Analysis Results
                          </span>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            {Math.round(message.analysis.confidence * 100)}%
                            confident
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-[#6B7280] dark:text-gray-300">
                              Service:
                            </span>
                            <span className="ml-2 text-[#1F2937] dark:text-white">
                              {message.analysis.serviceType}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#6B7280] dark:text-gray-300">
                              Urgency:
                            </span>
                            <Badge
                              className={`ml-2 ${
                                message.analysis.urgency === "high"
                                  ? "bg-red-100 text-red-700"
                                  : message.analysis.urgency === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              } border-0`}
                            >
                              {message.analysis.urgency}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-[#6B7280] dark:text-gray-300">
                              Location:
                            </span>
                            <span className="ml-2 text-[#1F2937] dark:text-white">
                              {message.analysis.location}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#6B7280] dark:text-gray-300">
                              Complexity:
                            </span>
                            <span className="ml-2 text-[#1F2937] dark:text-white">
                              {message.analysis.complexity}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Pricing Display */}
                    {message.pricing && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-700 transition-colors duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700">
                            AI Dynamic Pricing
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#6B7280] dark:text-gray-300">
                              Estimated Range:
                            </span>
                            <span className="text-[#1F2937] dark:text-white">
                              {message.pricing.estimatedRange}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#6B7280] dark:text-gray-300">
                              Optimal Price:
                            </span>
                            <span className="text-lg text-green-600">
                              {message.pricing.optimal}
                            </span>
                          </div>
                          <div className="text-xs text-[#6B7280] dark:text-gray-300 mt-2">
                            Factors: {message.pricing.factors.join(" • ")}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Provider Cards */}
                    {message.providers && (
                      <div className="mt-4 space-y-3">
                        {message.providers.map((provider) => (
                          <div
                            key={provider.id}
                            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-[#E0E7FF] dark:border-gray-700 shadow-sm transition-colors duration-300"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-[#1F2937] dark:text-white flex items-center gap-2 transition-colors duration-300">
                                  {provider.name}
                                  <Badge className="bg-[#2F6CFF]/10 text-[#2F6CFF] border-0">
                                    Trust: {provider.trustScore}%
                                  </Badge>
                                </h4>
                                <div className="flex items-center gap-3 mt-1 text-sm text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    {provider.rating}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {provider.distance}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {provider.responseTime}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[#2F6CFF]">
                                  {provider.price}
                                </div>
                                <div className="text-xs text-green-600">
                                  {provider.availability}
                                </div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="text-xs text-[#6B7280] dark:text-gray-300 mb-1 transition-colors duration-300">
                                Why AI recommends:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {provider.whyRecommended.map((reason, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs bg-[#F7F9FB] dark:bg-gray-700 text-[#2F6CFF] dark:text-blue-400 border border-[#E0E7FF] dark:border-gray-600 transition-colors duration-300"
                                  >
                                    {reason}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-[#2F6CFF] hover:bg-[#2557CC] text-white"
                              >
                                Book Now
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1"
                              >
                                <Volume2 className="w-3 h-3" />
                                Call
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* AI Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map(
                          (suggestion, suggestionIdx) => (
                            <motion.button
                              key={suggestionIdx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1.5 bg-[#F7F9FB] dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 border border-[#E0E7FF] dark:border-gray-600 rounded-xl text-sm text-[#2F6CFF] dark:text-blue-400 transition-colors duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {suggestion}
                            </motion.button>
                          )
                        )}
                      </div>
                    )}
                  </motion.div>

                  {message.type === "user" && (
                    <div className="text-xs text-[#9CA3AF] dark:text-gray-400 mt-1 text-right transition-colors duration-300">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* AI Analyzing Animation */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white">
                  <Sparkles className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>

              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-[#2F6CFF]" />
                  </motion.div>
                  <span className="text-sm text-[#2F6CFF]">
                    AI is analyzing your needs...
                  </span>
                </div>

                {/* Advanced AI Processing Steps */}
                <div className="space-y-2">
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span>Advanced NLP extracting intent & entities...</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>Geo-location & demand analysis...</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>ML fraud detection & trust scoring...</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>Real-time dynamic pricing optimization...</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Multi-factor ML ranking & matching...</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>AI automation pipeline complete!</span>
                  </motion.div>
                </div>

                {/* Neural Network Visualization */}
                <div className="mt-3 flex gap-1 items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-8 bg-gradient-to-t from-[#2F6CFF] to-[#4F88FF] rounded-full"
                      animate={{
                        scaleY: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Voice Listening Indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-red-500 to-pink-500 text-white">
                  <Mic className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Mic className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <span className="text-sm text-red-600">
                    {language === "bn" ? "শুনছি..." : "Listening..."}
                  </span>
                </div>

                {/* Voice Wave Animation */}
                <div className="mt-2 flex gap-1 items-center justify-center">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-6 bg-gradient-to-t from-red-500 to-pink-500 rounded-full"
                      animate={{
                        scaleY: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Typing Indicator */}
          {isTyping && !isAnalyzing && !isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white">
                  <Sparkles className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-lg">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#2F6CFF] rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl shadow-xl p-3 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-transparent outline-none text-[#1F2937] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-gray-400 transition-colors duration-300"
                aria-label="Service request input"
                aria-describedby="chat-help-text"
              />

              <motion.button
                onClick={handleVoiceInput}
                className={`p-2 rounded-xl transition-colors ${
                  isListening
                    ? "bg-red-100 text-red-600 animate-pulse"
                    : "bg-[#F7F9FB] dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-[#2F6CFF] dark:text-blue-400 transition-colors duration-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  isListening
                    ? "Listening for voice input"
                    : "Start voice input"
                }
                title={isListening ? "Listening..." : "Voice input"}
              >
                <Mic className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => handleSendMessage()}
                className="p-2 rounded-xl bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
