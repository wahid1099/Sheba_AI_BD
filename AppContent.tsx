import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MessageSquare,
  Search,
  BarChart3,
  Shield,
  Globe,
  Menu,
  X,
  User,
  LogIn,
  ChevronDown,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { HomeScreen } from "./components/HomeScreen";
import { AIChatAssistant } from "./components/AIChatAssistant";
import { SmartMatchResults } from "./components/SmartMatchResults";
import { ProviderDashboard } from "./components/ProviderDashboard";
import { TrustVerification } from "./components/TrustVerification";
import { BangladeshImpact } from "./components/BangladeshImpact";
import { useLanguage } from "./contexts/LanguageContext";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ThemeToggle } from "./components/ThemeToggle";
import { AuthModals } from "./components/AuthModals";
import { AccessibilityCompanion } from "./components/AccessibilityCompanion";

type Screen = "home" | "chat" | "results" | "dashboard" | "trust" | "impact";

interface NavItem {
  id: Screen;
  icon: React.ElementType;
  labelKey: string;
  color: string;
}

const navigationItems: NavItem[] = [
  { id: "home", icon: Home, labelKey: "nav.home", color: "text-[#2F6CFF]" },
  {
    id: "chat",
    icon: MessageSquare,
    labelKey: "nav.aiChat",
    color: "text-purple-500",
  },
  {
    id: "results",
    icon: Search,
    labelKey: "nav.smartMatch",
    color: "text-[#FF8C42]",
  },
  {
    id: "dashboard",
    icon: BarChart3,
    labelKey: "nav.dashboard",
    color: "text-green-500",
  },
  {
    id: "trust",
    icon: Shield,
    labelKey: "nav.trustCenter",
    color: "text-blue-600",
  },
  { id: "impact", icon: Globe, labelKey: "nav.impact", color: "text-pink-500" },
];

export const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "chat":
        return <AIChatAssistant />;
      case "results":
        return <SmartMatchResults />;
      case "dashboard":
        return <ProviderDashboard />;
      case "trust":
        return <TrustVerification />;
      case "impact":
        return <BangladeshImpact />;
      default:
        return <HomeScreen />;
    }
  };

  const handleNavClick = (screenId: Screen) => {
    setCurrentScreen(screenId);
    setIsMobileMenuOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
    setIsAccountDropdownOpen(false);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
    setIsAccountDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-gray-900 relative transition-colors duration-300">
      {/* Top Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/50 dark:border-gray-700/50 shadow-lg transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentScreen("home")}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">শে</span>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8C42] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-[#1F2937] dark:text-white leading-tight transition-colors duration-300">
                  {t("home.title")}
                </h1>
                <p className="text-xs text-[#6B7280] dark:text-gray-300 transition-colors duration-300">
                  {t("home.subtitle")}
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    currentScreen === item.id
                      ? "bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white shadow-lg"
                      : "text-[#6B7280] dark:text-gray-300 hover:bg-[#F7F9FB] dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{t(item.labelKey)}</span>
                </motion.button>
              ))}

              {/* Auth, Theme and Language Controls */}
              <div className="flex items-center gap-2">
                {/* Combined Account Button */}
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setIsAccountDropdownOpen(!isAccountDropdownOpen)
                    }
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    {t("common.account")}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        isAccountDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isAccountDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setIsLoginOpen(true);
                              setIsAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <LogIn className="w-4 h-4 text-[#2F6CFF]" />
                            <div>
                              <div className="text-sm text-[#1F2937] dark:text-white">
                                {t("common.login")}
                              </div>
                              <div className="text-xs text-[#6B7280] dark:text-gray-400">
                                {t("common.accessAccount")}
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setIsSignUpOpen(true);
                              setIsAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4 text-[#FF8C42]" />
                            <div>
                              <div className="text-sm text-[#1F2937] dark:text-white">
                                {t("common.signUp")}
                              </div>
                              <div className="text-xs text-[#6B7280] dark:text-gray-400">
                                {t("common.createNewAccount")}
                              </div>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Account Button */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setIsAccountDropdownOpen(!isAccountDropdownOpen)
                  }
                >
                  <User className="w-4 h-4" />
                </Button>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                  {isAccountDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setIsLoginOpen(true);
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <LogIn className="w-4 h-4 text-[#2F6CFF]" />
                          <span className="text-sm text-[#1F2937] dark:text-white">
                            {t("common.login")}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setIsSignUpOpen(true);
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4 text-[#FF8C42]" />
                          <span className="text-sm text-[#1F2937] dark:text-white">
                            {t("common.signUp")}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <ThemeToggle />
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#E0E7FF] dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-colors duration-300"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      currentScreen === item.id
                        ? "bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white shadow-lg"
                        : "text-[#6B7280] dark:text-gray-300 hover:bg-[#F7F9FB] dark:hover:bg-gray-800"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{t(item.labelKey)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content Area */}
      <div className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-white/50 dark:border-gray-700/50 shadow-2xl transition-colors duration-300"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-6 gap-1 p-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                currentScreen === item.id
                  ? "bg-gradient-to-br from-[#2F6CFF] to-[#4F88FF] text-white"
                  : "text-[#6B7280] dark:text-gray-300"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs truncate max-w-full">
                {t(item.labelKey).split(" ")[0]}
              </span>
              {currentScreen === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 w-1 h-1 bg-[#FF8C42] rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] text-white rounded-full shadow-2xl flex items-center justify-center z-40"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 10px 40px rgba(255, 140, 66, 0.4)",
            "0 10px 60px rgba(255, 140, 66, 0.6)",
            "0 10px 40px rgba(255, 140, 66, 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => setCurrentScreen("chat")}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#2F6CFF]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#FF8C42]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignUpOpen={isSignUpOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        onCloseSignUp={() => setIsSignUpOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* AI Accessibility Companion */}
      <AccessibilityCompanion />
    </div>
  );
};
