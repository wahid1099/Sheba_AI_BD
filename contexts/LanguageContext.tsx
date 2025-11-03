import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation data
const translations = {
  en: {
    nav: {
      home: "Home",
      aiChat: "AI Chat",
      smartMatch: "Smart Match",
      dashboard: "Dashboard",
      trustCenter: "Trust Center",
      impact: "Impact",
    },
    common: {
      search: "Search",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      open: "Open",
      yes: "Yes",
      no: "No",
      online: "Online",
      signUp: "Sign Up",
      login: "Login",
      logout: "Logout",
      email: "Email",
      password: "Password",
      name: "Name",
      phone: "Phone",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      forgotPassword: "Forgot Password?",
      account: "Account",
      accessAccount: "Access your account",
      createNewAccount: "Create new account",
    },
    accessibility: {
      openCompanion: "Open AI Accessibility Companion",
      voiceAssistant: "Voice Assistant",
      screenReader: "Screen Reader Mode",
      highContrast: "High Contrast Mode",
      largeText: "Large Text Mode",
      voiceNavigation: "Voice Navigation",
      audioDescriptions: "Audio Descriptions",
      visualAlerts: "Visual Alerts",
      describePage: "Describe Current Page",
      voiceCommand: "Voice Command",
      readAloud: "Read Aloud",
      listening: "Listening...",
      enabled: "Enabled",
      disabled: "Disabled",
      active: "Active",
    },
    home: {
      title: "SHEBA-AI BD",
      subtitle: "Trusted Service Marketplace",
      description:
        "AI-powered service marketplace connecting users with trusted local providers in Bangladesh",
      findServices: "Find Services",
      becomeProvider: "Become a Provider",
      howItWorks: "How It Works",
      trustAndSafety: "Trust & Safety",
      featuredServices: "Featured Services",
      topProviders: "Top Providers",
      searchPlaceholder: "Tell me what you need...",
      popularServices: "Popular Services",
      viewAll: "View All",
      categories: {
        cleaning: "Cleaning",
        repair: "Repair",
        tutor: "Tutor",
        techSupport: "Tech Support",
      },
      providers: {
        acRepairExpert: "AC Repair Expert",
        homeCleaningPro: "Home Cleaning Pro",
      },
    },
    smartMatch: {
      title: "Smart Match Results",
      subtitle: "verified providers found near you",
      howAiRanks: "How AI Ranks",
      aiRankingTransparency: "AI Ranking Transparency",
      aiRankingDescription:
        "Our AI considers multiple factors to find the best match for you:",
      aiTopPick: "AI Top Pick",
      trustScore: "Trust Score",
      rating: "Rating",
      responseTime: "Response Time",
      distance: "Distance",
      priceMatch: "Price Match",
      whyAiRecommends: "Why AI Recommends This Provider",
      verifiedIdentity: "Verified Identity",
      governmentIdCheck: "Government ID + Background check",
      highPerformance: "High Performance",
      satisfactionRate: "satisfaction rate",
      fastResponse: "Fast Response",
      usuallyReplies: "Usually replies within minutes",
      bookInstantly: "Book Instantly",
      call: "Call",
      chat: "Chat",
      voiceBook: "Voice Book",
      available: "Available",
      availableNow: "Available now",
      availableIn: "Available in",
      specialties: {
        acRepair: "AC Repair",
        fridgeRepair: "Fridge Repair",
        electrical: "Electrical",
        homeCleaning: "Home Cleaning",
        deepCleaning: "Deep Cleaning",
        sanitization: "Sanitization",
        plumbing: "Plumbing",
        pipeRepair: "Pipe Repair",
        waterHeater: "Water Heater",
      },
      providers: {
        rashedAhmed: "Rashed Ahmed",
        sadiaRahman: "Sadia Rahman",
        kamalHossain: "Kamal Hossain",
      },
    },
    dashboard: {
      title: "Provider Analytics",
      subtitle: "AI-powered insights to grow your business",
      voiceSummary: "Voice Summary",
      revenueThisMonth: "Revenue This Month",
      totalJobs: "Total Jobs",
      averageRating: "Average Rating",
      trustScore: "Trust Score",
      topPercent: "Top 5%",
      aiBusinessCopilot: "AI Business Copilot",
      intelligentRecommendations:
        "Intelligent recommendations to maximize your revenue",
      demandForecast: "Demand Forecast",
      smartPricing: "Smart Pricing",
      riskAlert: "Risk Alert",
      aiInsightsTimeline: "AI Insights Timeline",
    },
    trust: {
      title: "Trust & Verification Center",
      subtitle:
        "Multi-layer verification system powered by AI to ensure safety and trust for all users",
      yourTrustScore: "Your Trust Score",
      outOf: "out of 100",
      topTrustedProviders: "Top 5% Trusted Providers",
      trustComponents: "Trust Components",
      identityVerified: "Identity Verified",
      backgroundCheck: "Background Check",
      skillCertification: "Skill Certification",
      customerReviews: "Customer Reviews",
      nftVerificationBadges: "NFT Verification Badges",
      bronze: "Bronze",
      silver: "Silver",
      gold: "Gold",
      achieved: "Achieved",
      securityFeatures: "Security Features",
      aiFraudProtection: "AI Fraud Protection",
      blockchainVerifiedCredentials: "Blockchain-Verified Credentials",
      viewOnBlockchain: "View on Blockchain",
    },
    impact: {
      title: "Bangladesh Impact",
      subtitle:
        "Empowering local communities and transforming the service industry across Bangladesh",
      providersEmpowered: "Providers Empowered",
      fasterBooking: "Faster Booking",
      totalEarnings: "Total Earnings",
      satisfactionRate: "Satisfaction Rate",
      socialImpactMetrics: "Social Impact Metrics",
      womenEmpowerment: "Women Empowerment",
      ruralEmployment: "Rural Employment",
      youthEmployment: "Youth Employment",
      digitalInclusion: "Digital Inclusion",
      economicImpact: "Economic Impact",
      jobsCreated: "Jobs Created",
      citiesCovered: "Cities Covered",
      activeUsers: "Active Users",
      responseTime: "Response Time",
    },
    chat: {
      title: "AI Chat Assistant",
      placeholder: "Ask me anything about services...",
      send: "Send",
      typing: "AI is typing...",
      welcome:
        "Assalamu Alaikum! How can I help you find the perfect service today?",
    },
    services: {
      categories: {
        cleaning: "Cleaning",
        repair: "Repair & Maintenance",
        beauty: "Beauty & Wellness",
        tutoring: "Tutoring",
        delivery: "Delivery",
        healthcare: "Healthcare",
        technology: "Technology",
        automotive: "Automotive",
      },
      booking: {
        bookNow: "Book Now",
        selectDate: "Select Date",
        selectTime: "Select Time",
        confirmBooking: "Confirm Booking",
        bookingConfirmed: "Booking Confirmed",
      },
    },
    provider: {
      dashboard: "Provider Dashboard",
      earnings: "Earnings",
      bookings: "Bookings",
      reviews: "Reviews",
      profile: "Profile",
      services: "My Services",
      analytics: "Analytics",
    },
  },
  bn: {
    nav: {
      home: "হোম",
      aiChat: "এআই চ্যাট",
      smartMatch: "স্মার্ট ম্যাচ",
      dashboard: "ড্যাশবোর্ড",
      trustCenter: "ট্রাস্ট সেন্টার",
      impact: "প্রভাব",
    },
    common: {
      search: "খুঁজুন",
      loading: "লোড হচ্ছে...",
      error: "ত্রুটি",
      success: "সফল",
      cancel: "বাতিল",
      confirm: "নিশ্চিত",
      save: "সংরক্ষণ",
      edit: "সম্পাদনা",
      delete: "মুছুন",
      back: "পিছনে",
      next: "পরবর্তী",
      previous: "পূর্ববর্তী",
      close: "বন্ধ",
      open: "খুলুন",
      yes: "হ্যাঁ",
      no: "না",
      online: "অনলাইন",
      signUp: "সাইন আপ",
      login: "লগইন",
      logout: "লগআউট",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      name: "নাম",
      phone: "ফোন",
      createAccount: "অ্যাকাউন্ট তৈরি করুন",
      alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      dontHaveAccount: "অ্যাকাউন্ট নেই?",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      account: "অ্যাকাউন্ট",
      accessAccount: "আপনার অ্যাকাউন্ট অ্যাক্সেস করুন",
      createNewAccount: "নতুন অ্যাকাউন্ট তৈরি করুন",
    },
    accessibility: {
      openCompanion: "এআই অ্যাক্সেসিবিলিটি সহায়ক খুলুন",
      voiceAssistant: "ভয়েস সহায়ক",
      screenReader: "স্ক্রিন রিডার মোড",
      highContrast: "উচ্চ কনট্রাস্ট মোড",
      largeText: "বড় টেক্সট মোড",
      voiceNavigation: "ভয়েস নেভিগেশন",
      audioDescriptions: "অডিও বর্ণনা",
      visualAlerts: "ভিজ্যুয়াল সতর্কতা",
      describePage: "বর্তমান পেজ বর্ণনা করুন",
      voiceCommand: "ভয়েস কমান্ড",
      readAloud: "জোরে পড়ুন",
      listening: "শুনছি...",
      enabled: "সক্রিয়",
      disabled: "নিষ্ক্রিয়",
      active: "চালু",
    },
    home: {
      title: "শেবা-এআই বিডি",
      subtitle: "বিশ্বস্ত সেবা বাজার",
      description:
        "বাংলাদেশে বিশ্বস্ত স্থানীয় সেবাদাতাদের সাথে ব্যবহারকারীদের সংযোগকারী এআই-চালিত সেবা বাজার",
      findServices: "সেবা খুঁজুন",
      becomeProvider: "সেবাদাতা হন",
      howItWorks: "কীভাবে কাজ করে",
      trustAndSafety: "বিশ্বাস ও নিরাপত্তা",
      featuredServices: "বিশেষ সেবাসমূহ",
      topProviders: "শীর্ষ সেবাদাতা",
      searchPlaceholder: "আপনার প্রয়োজন বলুন...",
      popularServices: "জনপ্রিয় সেবাসমূহ",
      viewAll: "সব দেখুন",
      categories: {
        cleaning: "পরিষ্কার-পরিচ্ছন্নতা",
        repair: "মেরামত",
        tutor: "শিক্ষক",
        techSupport: "প্রযুক্তি সহায়তা",
      },
      providers: {
        acRepairExpert: "এসি মেরামত বিশেষজ্ঞ",
        homeCleaningPro: "বাড়ি পরিষ্কার বিশেষজ্ঞ",
      },
    },
    smartMatch: {
      title: "স্মার্ট ম্যাচ ফলাফল",
      subtitle: "যাচাইকৃত সেবাদাতা আপনার কাছাকাছি পাওয়া গেছে",
      howAiRanks: "এআই কীভাবে র‍্যাঙ্ক করে",
      aiRankingTransparency: "এআই র‍্যাঙ্কিং স্বচ্ছতা",
      aiRankingDescription:
        "আপনার জন্য সেরা ম্যাচ খুঁজে পেতে আমাদের এআই একাধিক বিষয় বিবেচনা করে:",
      aiTopPick: "এআই টপ পিক",
      trustScore: "বিশ্বস্ততার স্কোর",
      rating: "রেটিং",
      responseTime: "সাড়া দেওয়ার সময়",
      distance: "দূরত্ব",
      priceMatch: "দাম মিল",
      whyAiRecommends: "এআই কেন এই সেবাদাতাকে সুপারিশ করে",
      verifiedIdentity: "যাচাইকৃত পরিচয়",
      governmentIdCheck: "সরকারি আইডি + ব্যাকগ্রাউন্ড চেক",
      highPerformance: "উচ্চ পারফরম্যান্স",
      satisfactionRate: "সন্তুষ্টির হার",
      fastResponse: "দ্রুত সাড়া",
      usuallyReplies: "সাধারণত কয়েক মিনিটের মধ্যে উত্তর দেয়",
      bookInstantly: "তাৎক্ষণিক বুক করুন",
      call: "কল",
      chat: "চ্যাট",
      voiceBook: "ভয়েস বুক",
      available: "উপলব্ধ",
      availableNow: "এখনই উপলব্ধ",
      availableIn: "উপলব্ধ হবে",
      specialties: {
        acRepair: "এসি মেরামত",
        fridgeRepair: "ফ্রিজ মেরামত",
        electrical: "বৈদ্যুতিক",
        homeCleaning: "বাড়ি পরিষ্কার",
        deepCleaning: "গভীর পরিষ্কার",
        sanitization: "জীবাণুমুক্তকরণ",
        plumbing: "প্লাম্বিং",
        pipeRepair: "পাইপ মেরামত",
        waterHeater: "ওয়াটার হিটার",
      },
      providers: {
        rashedAhmed: "রাশেদ আহমেদ",
        sadiaRahman: "সাদিয়া রহমান",
        kamalHossain: "কামাল হোসেন",
      },
    },
    dashboard: {
      title: "প্রোভাইডার অ্যানালিটিক্স",
      subtitle: "আপনার ব্যবসা বৃদ্ধির জন্য এআই-চালিত অন্তর্দৃষ্টি",
      voiceSummary: "ভয়েস সারসংক্ষেপ",
      revenueThisMonth: "এই মাসের আয়",
      totalJobs: "মোট কাজ",
      averageRating: "গড় রেটিং",
      trustScore: "বিশ্বস্ততার স্কোর",
      topPercent: "শীর্ষ ৫%",
      aiBusinessCopilot: "এআই ব্যবসায়িক সহপাইলট",
      intelligentRecommendations:
        "আপনার আয় সর্বোচ্চ করার জন্য বুদ্ধিমান সুপারিশ",
      demandForecast: "চাহিদার পূর্বাভাস",
      smartPricing: "স্মার্ট মূল্য নির্ধারণ",
      riskAlert: "ঝুঁকি সতর্কতা",
      aiInsightsTimeline: "এআই অন্তর্দৃষ্টি টাইমলাইন",
    },
    trust: {
      title: "বিশ্বাস ও যাচাইকরণ কেন্দ্র",
      subtitle:
        "সকল ব্যবহারকারীর নিরাপত্তা ও বিশ্বাস নিশ্চিত করতে এআই দ্বারা চালিত বহু-স্তরের যাচাইকরণ ব্যবস্থা",
      yourTrustScore: "আপনার বিশ্বস্ততার স্কোর",
      outOf: "এর মধ্যে",
      topTrustedProviders: "শীর্ষ ৫% বিশ্বস্ত প্রোভাইডার",
      trustComponents: "বিশ্বস্ততার উপাদান",
      identityVerified: "পরিচয় যাচাইকৃত",
      backgroundCheck: "ব্যাকগ্রাউন্ড চেক",
      skillCertification: "দক্ষতা সার্টিফিকেশন",
      customerReviews: "গ্রাহক পর্যালোচনা",
      nftVerificationBadges: "এনএফটি যাচাইকরণ ব্যাজ",
      bronze: "ব্রোঞ্জ",
      silver: "সিলভার",
      gold: "গোল্ড",
      achieved: "অর্জিত",
      securityFeatures: "নিরাপত্তা বৈশিষ্ট্য",
      aiFraudProtection: "এআই জালিয়াতি সুরক্ষা",
      blockchainVerifiedCredentials: "ব্লকচেইন-যাচাইকৃত প্রমাণপত্র",
      viewOnBlockchain: "ব্লকচেইনে দেখুন",
    },
    impact: {
      title: "বাংলাদেশের প্রভাব",
      subtitle:
        "স্থানীয় সম্প্রদায়কে ক্ষমতায়ন এবং বাংলাদেশ জুড়ে সেবা শিল্পের রূপান্তর",
      providersEmpowered: "ক্ষমতায়িত প্রোভাইডার",
      fasterBooking: "দ্রুততর বুকিং",
      totalEarnings: "মোট আয়",
      satisfactionRate: "সন্তুষ্টির হার",
      socialImpactMetrics: "সামাজিক প্রভাব মেট্রিক্স",
      womenEmpowerment: "নারী ক্ষমতায়ন",
      ruralEmployment: "গ্রামীণ কর্মসংস্থান",
      youthEmployment: "যুব কর্মসংস্থান",
      digitalInclusion: "ডিজিটাল অন্তর্ভুক্তি",
      economicImpact: "অর্থনৈতিক প্রভাব",
      jobsCreated: "সৃষ্ট কাজ",
      citiesCovered: "আচ্ছাদিত শহর",
      activeUsers: "সক্রিয় ব্যবহারকারী",
      responseTime: "সাড়া দেওয়ার সময়",
    },
    chat: {
      title: "এআই চ্যাট সহায়ক",
      placeholder: "সেবা সম্পর্কে যেকোনো প্রশ্ন করুন...",
      send: "পাঠান",
      typing: "এআই টাইপ করছে...",
      welcome:
        "আসসালামু আলাইকুম! আজ আপনার জন্য নিখুঁত সেবা খুঁজে পেতে আমি কীভাবে সাহায্য করতে পারি?",
    },
    services: {
      categories: {
        cleaning: "পরিষ্কার-পরিচ্ছন্নতা",
        repair: "মেরামত ও রক্ষণাবেক্ষণ",
        beauty: "সৌন্দর্য ও সুস্থতা",
        tutoring: "শিক্ষাদান",
        delivery: "ডেলিভারি",
        healthcare: "স্বাস্থ্যসেবা",
        technology: "প্রযুক্তি",
        automotive: "অটোমোটিভ",
      },
      booking: {
        bookNow: "এখনই বুক করুন",
        selectDate: "তারিখ নির্বাচন",
        selectTime: "সময় নির্বাচন",
        confirmBooking: "বুকিং নিশ্চিত করুন",
        bookingConfirmed: "বুকিং নিশ্চিত হয়েছে",
      },
    },
    provider: {
      dashboard: "সেবাদাতা ড্যাশবোর্ড",
      earnings: "আয়",
      bookings: "বুকিং",
      reviews: "পর্যালোচনা",
      profile: "প্রোফাইল",
      services: "আমার সেবাসমূহ",
      analytics: "বিশ্লেষণ",
    },
  },
};
