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
    },
    home: {
      title: "ServiSphere AI",
      subtitle: "Trusted Service Marketplace",
      description:
        "AI-powered service marketplace connecting users with trusted local providers in Bangladesh",
      findServices: "Find Services",
      becomeProvider: "Become a Provider",
      howItWorks: "How It Works",
      trustAndSafety: "Trust & Safety",
      featuredServices: "Featured Services",
      topProviders: "Top Providers",
    },
    chat: {
      title: "AI Chat Assistant",
      placeholder: "Ask me anything about services...",
      send: "Send",
      typing: "AI is typing...",
      welcome: "Hello! How can I help you find the perfect service today?",
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
    trust: {
      title: "Trust & Verification",
      verified: "Verified",
      background: "Background Check",
      identity: "Identity Verified",
      insurance: "Insured",
      reviews: "Customer Reviews",
      rating: "Rating",
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
    },
    home: {
      title: "সার্ভিস্ফিয়ার এআই",
      subtitle: "বিশ্বস্ত সেবা বাজার",
      description:
        "বাংলাদেশে বিশ্বস্ত স্থানীয় সেবাদাতাদের সাথে ব্যবহারকারীদের সংযোগকারী এআই-চালিত সেবা বাজার",
      findServices: "সেবা খুঁজুন",
      becomeProvider: "সেবাদাতা হন",
      howItWorks: "কীভাবে কাজ করে",
      trustAndSafety: "বিশ্বাস ও নিরাপত্তা",
      featuredServices: "বিশেষ সেবাসমূহ",
      topProviders: "শীর্ষ সেবাদাতা",
    },
    chat: {
      title: "এআই চ্যাট সহায়ক",
      placeholder: "সেবা সম্পর্কে যেকোনো প্রশ্ন করুন...",
      send: "পাঠান",
      typing: "এআই টাইপ করছে...",
      welcome:
        "হ্যালো! আজ আপনার জন্য নিখুঁত সেবা খুঁজে পেতে আমি কীভাবে সাহায্য করতে পারি?",
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
    trust: {
      title: "বিশ্বাস ও যাচাইকরণ",
      verified: "যাচাইকৃত",
      background: "ব্যাকগ্রাউন্ড চেক",
      identity: "পরিচয় যাচাইকৃত",
      insurance: "বীমাকৃত",
      reviews: "গ্রাহক পর্যালোচনা",
      rating: "রেটিং",
    },
  },
};
