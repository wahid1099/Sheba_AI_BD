import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface AuthModalsProps {
  isLoginOpen: boolean;
  isSignUpOpen: boolean;
  onCloseLogin: () => void;
  onCloseSignUp: () => void;
  onSwitchToSignUp: () => void;
  onSwitchToLogin: () => void;
}

export function AuthModals({
  isLoginOpen,
  isSignUpOpen,
  onCloseLogin,
  onCloseSignUp,
  onSwitchToSignUp,
  onSwitchToLogin,
}: AuthModalsProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", loginData);
    onCloseLogin();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log("Sign Up:", signUpData);
    onCloseSignUp();
  };

  return (
    <>
      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onCloseLogin}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#1F2937] dark:text-white">
                  {t("common.login")}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCloseLogin}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#6B7280] dark:text-gray-300 mb-2">
                    {t("common.email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-[#E0E7FF] dark:border-gray-600 rounded-xl bg-[#F7F9FB] dark:bg-gray-700 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6CFF] transition-colors duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] dark:text-gray-300 mb-2">
                    {t("common.password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-12 py-3 border border-[#E0E7FF] dark:border-gray-600 rounded-xl bg-[#F7F9FB] dark:bg-gray-700 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6CFF] transition-colors duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#2F6CFF]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-[#2F6CFF] hover:underline"
                  >
                    {t("common.forgotPassword")}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] hover:from-[#2557CC] to-[#3D6FCC] text-white py-3 rounded-xl"
                >
                  {t("common.login")}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[#6B7280] dark:text-gray-300">
                  {t("common.dontHaveAccount")}{" "}
                  <button
                    onClick={onSwitchToSignUp}
                    className="text-[#2F6CFF] hover:underline"
                  >
                    {t("common.signUp")}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Up Modal */}
      <AnimatePresence>
        {isSignUpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onCloseSignUp}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#1F2937] dark:text-white">
                  {t("common.signUp")}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCloseSignUp}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#6B7280] dark:text-gray-300 mb-2">
                    {t("common.name")}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="text"
                      value={signUpData.name}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-[#E0E7FF] dark:border-gray-600 rounded-xl bg-[#F7F9FB] dark:bg-gray-700 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6CFF] transition-colors duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] dark:text-gray-300 mb-2">
                    {t("common.email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="email"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-[#E0E7FF] dark:border-gray-600 rounded-xl bg-[#F7F9FB] dark:bg-gray-700 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6CFF] transition-colors duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] dark:text-gray-300 mb-2">
                    {t("common.phone")}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="tel"
                      value={signUpData.phone}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-[#E0E7FF] dark:border-gray-600 rounded-xl bg-[#F7F9FB] dark:bg-gray-700 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6CFF] transition-colors duration-300"
                      placeholder="+880 1234 567890"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] dark:text-gray-300 mb-2">
                    {t("common.password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-12 py-3 border border-[#E0E7FF] dark:border-gray-600 rounded-xl bg-[#F7F9FB] dark:bg-gray-700 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F6CFF] transition-colors duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#2F6CFF]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2F6CFF] to-[#4F88FF] hover:from-[#2557CC] to-[#3D6FCC] text-white py-3 rounded-xl"
                >
                  {t("common.createAccount")}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[#6B7280] dark:text-gray-300">
                  {t("common.alreadyHaveAccount")}{" "}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-[#2F6CFF] hover:underline"
                  >
                    {t("common.login")}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
