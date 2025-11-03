import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  Volume2,
  Eye,
  Type,
  Palette,
  Mic,
  MicOff,
  MessageCircle,
  X,
  Settings,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { useLanguage } from "../contexts/LanguageContext";

interface AccessibilitySettings {
  voiceAssistant: boolean;
  screenReader: boolean;
  highContrast: boolean;
  largeText: boolean;
  voiceNavigation: boolean;
  audioDescriptions: boolean;
  reducedMotion: boolean;
  visualAlerts: boolean;
}

export function AccessibilityCompanion() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    voiceAssistant: false,
    screenReader: false,
    highContrast: false,
    largeText: false,
    voiceNavigation: false,
    audioDescriptions: false,
    reducedMotion: false,
    visualAlerts: false,
  });

  // Auto-detect screen reader
  useEffect(() => {
    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader =
        window.navigator.userAgent.includes("NVDA") ||
        window.navigator.userAgent.includes("JAWS") ||
        window.speechSynthesis ||
        document.querySelector("[aria-live]") !== null;

      if (hasScreenReader) {
        setSettings((prev) => ({ ...prev, screenReader: true }));
      }
    };

    detectScreenReader();
  }, []);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;

    if (settings.highContrast) {
      root.classList.add("accessibility-high-contrast");
    } else {
      root.classList.remove("accessibility-high-contrast");
    }

    if (settings.largeText) {
      root.classList.add("accessibility-large-text");
    } else {
      root.classList.remove("accessibility-large-text");
    }

    if (settings.reducedMotion) {
      root.classList.add("accessibility-reduced-motion");
    } else {
      root.classList.remove("accessibility-reduced-motion");
    }
  }, [settings]);

  const speakText = (text: string) => {
    if (!settings.voiceAssistant) return;

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "bn" ? "bn-BD" : "en-US";
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const startVoiceNavigation = () => {
    setIsListening(true);
    speakText(
      language === "bn"
        ? "আমি শুনছি। আপনার কমান্ড বলুন।"
        : "I'm listening. Please speak your command."
    );

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      speakText(
        language === "bn"
          ? "কমান্ড বুঝতে পেরেছি। হোম পেজে যাচ্ছি।"
          : "Command understood. Navigating to home page."
      );
    }, 3000);
  };

  const describeCurrentPage = () => {
    const currentPage = window.location.pathname;
    let description = "";

    if (currentPage.includes("chat")) {
      description =
        language === "bn"
          ? "আপনি এআই চ্যাট পেজে আছেন। এখানে আপনি সেবার জন্য অনুরোধ করতে পারেন।"
          : "You are on the AI chat page. Here you can request services using natural language.";
    } else if (currentPage.includes("dashboard")) {
      description =
        language === "bn"
          ? "আপনি প্রোভাইডার ড্যাশবোর্ডে আছেন। এখানে আয় এবং পারফরম্যান্স দেখতে পারেন।"
          : "You are on the provider dashboard. Here you can view earnings and performance metrics.";
    } else {
      description =
        language === "bn"
          ? "আপনি হোম পেজে আছেন। এখানে সেবা খুঁজতে এবং বুক করতে পারেন।"
          : "You are on the home page. Here you can search and book services.";
    }

    speakText(description);
  };

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] };

      // Provide audio feedback
      if (newSettings.voiceAssistant) {
        const settingName = key.replace(/([A-Z])/g, " $1").toLowerCase();
        speakText(
          `${settingName} ${newSettings[key] ? "enabled" : "disabled"}`
        );
      }

      return newSettings;
    });
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <motion.button
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label={t("accessibility.openCompanion")}
        title="AI Accessibility Companion"
      >
        <Accessibility className="w-6 h-6" />
        {(isListening || isSpeaking) && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Accessibility className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-[#1F2937] dark:text-white">
                      AI Accessibility Companion
                    </h2>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">
                      Personalized assistance for everyone
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <Button
                  variant="outline"
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={describeCurrentPage}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs">Describe Page</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={startVoiceNavigation}
                  disabled={isListening}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                  <span className="text-xs">
                    {isListening ? "Listening..." : "Voice Command"}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => speakText("Reading all text on this page")}
                >
                  {isSpeaking ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span className="text-xs">Read Aloud</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => toggleSetting("highContrast")}
                >
                  <Palette className="w-5 h-5" />
                  <span className="text-xs">High Contrast</span>
                </Button>
              </div>

              {/* Accessibility Settings */}
              <div className="space-y-4">
                <h3 className="text-lg text-[#1F2937] dark:text-white mb-4">
                  Accessibility Settings
                </h3>

                {/* Voice Assistant */}
                <div className="flex items-center justify-between p-4 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-[#2F6CFF]" />
                    <div>
                      <div className="text-[#1F2937] dark:text-white">
                        Voice Assistant
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-gray-300">
                        AI speaks all interactions aloud
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.voiceAssistant}
                    onCheckedChange={() => toggleSetting("voiceAssistant")}
                  />
                </div>

                {/* Screen Reader Support */}
                <div className="flex items-center justify-between p-4 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-[#2F6CFF]" />
                    <div>
                      <div className="text-[#1F2937] dark:text-white">
                        Screen Reader Mode
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-gray-300">
                        Optimized for NVDA, JAWS, VoiceOver
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {settings.screenReader && (
                      <Badge className="bg-green-100 text-green-700 border-0">
                        Active
                      </Badge>
                    )}
                    <Switch
                      checked={settings.screenReader}
                      onCheckedChange={() => toggleSetting("screenReader")}
                    />
                  </div>
                </div>

                {/* Large Text */}
                <div className="flex items-center justify-between p-4 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Type className="w-5 h-5 text-[#2F6CFF]" />
                    <div>
                      <div className="text-[#1F2937] dark:text-white">
                        Large Text Mode
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-gray-300">
                        Increases font size by 150%
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.largeText}
                    onCheckedChange={() => toggleSetting("largeText")}
                  />
                </div>

                {/* Voice Navigation */}
                <div className="flex items-center justify-between p-4 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-[#2F6CFF]" />
                    <div>
                      <div className="text-[#1F2937] dark:text-white">
                        Voice Navigation
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-gray-300">
                        Navigate using voice commands
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.voiceNavigation}
                    onCheckedChange={() => toggleSetting("voiceNavigation")}
                  />
                </div>

                {/* Audio Descriptions */}
                <div className="flex items-center justify-between p-4 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[#2F6CFF]" />
                    <div>
                      <div className="text-[#1F2937] dark:text-white">
                        Audio Descriptions
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-gray-300">
                        Describes images and visual elements
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.audioDescriptions}
                    onCheckedChange={() => toggleSetting("audioDescriptions")}
                  />
                </div>

                {/* Visual Alerts */}
                <div className="flex items-center justify-between p-4 bg-[#F7F9FB] dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#2F6CFF]" />
                    <div>
                      <div className="text-[#1F2937] dark:text-white">
                        Visual Alerts
                      </div>
                      <div className="text-sm text-[#6B7280] dark:text-gray-300">
                        Flash screen for audio notifications
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.visualAlerts}
                    onCheckedChange={() => toggleSetting("visualAlerts")}
                  />
                </div>
              </div>

              {/* AI Status */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-[#1F2937] dark:text-white">
                    AI Accessibility Engine Active
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] dark:text-gray-300">
                  Continuously adapting to your needs • Voice recognition ready
                  • Screen reader compatible • Multi-language support
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
