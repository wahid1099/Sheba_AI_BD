import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Sparkles, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content:
      "Hi! I'm Sphero, your AI service assistant. 👋 Tell me what service you're looking for, and I'll find the perfect match for you!",
    suggestions: [
      "Find a plumber",
      "Need AC repair",
      "Book a tutor",
      "Hire cleaner",
    ],
    timestamp: new Date(),
  },
];

export function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

    // Simulate AI response
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsTyping(false);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Great! I found 12 verified providers near you. Based on your needs, here are the top matches:",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] via-[#EEF2F6] to-[#E0E7FF] relative overflow-hidden">
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
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-lg">
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
                <h3 className="text-[#1F2937]">Sphero AI Assistant</h3>
                <p className="text-sm text-[#6B7280]">
                  Always here to help • Powered by AI
                </p>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Online
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
                      <span className="text-sm text-[#6B7280]">Sphero</span>
                    </div>
                  )}

                  <motion.div
                    className={`rounded-2xl p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white ml-auto"
                        : "bg-white/70 backdrop-blur-xl border border-white/50 text-[#1F2937] shadow-lg"
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {/* AI Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map(
                          (suggestion, suggestionIdx) => (
                            <motion.button
                              key={suggestionIdx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1.5 bg-[#F7F9FB] hover:bg-white border border-[#E0E7FF] rounded-xl text-sm text-[#2F6CFF] transition-colors"
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
                    <div className="text-xs text-[#9CA3AF] mt-1 text-right">
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

                {/* Analysis Steps */}
                <div className="space-y-2">
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Nearby verified providers</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Estimated price range: ৳400-700</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-[#6B7280]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Best availability: Today 2-5 PM</span>
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

          {/* Typing Indicator */}
          {isTyping && !isAnalyzing && (
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
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-[#1F2937] placeholder:text-[#9CA3AF]"
              />

              <motion.button
                className="p-2 rounded-xl bg-[#F7F9FB] hover:bg-white text-[#2F6CFF] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => handleSendMessage()}
                className="p-2 rounded-xl bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
