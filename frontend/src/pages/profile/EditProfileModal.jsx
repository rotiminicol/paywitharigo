import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import {
  X,
  User,
  Lock,
  Mail,
  Smartphone,
  MapPin,
  Calendar,
  Shield,
  AlertCircle,
  Check,
  CreditCard
} from "react-feather";

const BankProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    cardNotifications: true,
    securityAlerts: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
    
    if (name === "newPassword") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        address: authUser.address || "",
        dateOfBirth: authUser.dateOfBirth || "",
        cardNotifications: authUser.preferences?.cardNotifications ?? true,
        securityAlerts: authUser.preferences?.securityAlerts ?? true,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsOpen(false);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { y: -20, opacity: 0 }
  };

  const tabVariants = {
    inactive: { opacity: 0.6, y: 5 },
    active: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "personal":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <User className="text-blue-500" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <Mail className="text-blue-500" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <Smartphone className="text-blue-500" size={20} />
              <input
                type="tel"
                placeholder="Phone Number"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.phone}
                name="phone"
                onChange={handleInputChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <MapPin className="text-blue-500 mt-1" size={20} />
              <textarea
                placeholder="Home Address"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 min-h-[80px] resize-none"
                value={formData.address}
                name="address"
                onChange={handleInputChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <Calendar className="text-blue-500" size={20} />
              <input
                type="date"
                placeholder="Date of Birth"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.dateOfBirth}
                name="dateOfBirth"
                onChange={handleInputChange}
              />
            </motion.div>
          </motion.div>
        );
      case "security":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <Lock className="text-blue-500" size={20} />
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <Lock className="text-blue-500" size={20} />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </motion.div>
            
            {formData.newPassword && (
              <motion.div 
                variants={itemVariants}
                className="px-2"
              >
                <div className="flex gap-1 mb-1">
                  <div className={`h-2 flex-1 rounded-full ${passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                  <div className={`h-2 flex-1 rounded-full ${passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                  <div className={`h-2 flex-1 rounded-full ${passwordStrength >= 3 ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                  <div className={`h-2 flex-1 rounded-full ${passwordStrength >= 4 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                </div>
                <p className="text-xs text-gray-600">
                  {passwordStrength === 0 && "Password too weak"}
                  {passwordStrength === 1 && "Password strength: Weak"}
                  {passwordStrength === 2 && "Password strength: Fair"}
                  {passwordStrength === 3 && "Password strength: Good"}
                  {passwordStrength === 4 && "Password strength: Strong"}
                </p>
              </motion.div>
            )}
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 group hover:border-blue-300 focus-within:border-blue-500 transition-all duration-300">
              <Lock className="text-blue-500" size={20} />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </motion.div>
            
            {formData.newPassword && formData.confirmPassword && (
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-2 pl-2"
              >
                {formData.newPassword === formData.confirmPassword ? (
                  <>
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-sm text-red-600">Passwords don't match</span>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      case "preferences":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-blue-500" size={20} />
                  <span className="font-medium text-gray-800">Card Transaction Alerts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.cardNotifications}
                    name="cardNotifications"
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 pl-8">Receive notifications for all card transactions</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <Shield className="text-blue-500" size={20} />
                  <span className="font-medium text-gray-800">Security Alerts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.securityAlerts}
                    name="securityAlerts"
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 pl-8">Get alerted about suspicious account activities</p>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <User size={18} />
        Update Profile
      </motion.button>
  
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              {formSuccess && (
                <motion.div
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0 z-20 bg-white bg-opacity-95 backdrop-blur-sm flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                  >
                    <Check size={40} className="text-green-600" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-semibold text-gray-800 mb-2"
                  >
                    Profile Updated!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600"
                  >
                    Your changes have been saved successfully.
                  </motion.p>
                </motion.div>
              )}
              
              <div className="px-6 pt-6 pb-2">
                <div className="flex justify-between items-center mb-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-800">Your Profile</h3>
                    <p className="text-gray-500 text-sm">Update your personal settings</p>
                  </motion.div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-800 transition-colors p-1"
                  >
                    <X size={22} />
                  </motion.button>
                </div>

                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex border-b border-gray-200 mb-6"
                >
                  <motion.button
                    variants={tabVariants}
                    animate={activeTab === "personal" ? "active" : "inactive"}
                    onClick={() => setActiveTab("personal")}
                    className={`pb-3 px-4 text-sm font-medium relative ${activeTab === "personal" ? "text-blue-600" : "text-gray-500"}`}
                  >
                    Personal Info
                    {activeTab === "personal" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </motion.button>
                  
                  <motion.button
                    variants={tabVariants}
                    animate={activeTab === "security" ? "active" : "inactive"}
                    onClick={() => setActiveTab("security")}
                    className={`pb-3 px-4 text-sm font-medium relative ${activeTab === "security" ? "text-blue-600" : "text-gray-500"}`}
                  >
                    Security
                    {activeTab === "security" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </motion.button>
                  
                  <motion.button
                    variants={tabVariants}
                    animate={activeTab === "preferences" ? "active" : "inactive"}
                    onClick={() => setActiveTab("preferences")}
                    className={`pb-3 px-4 text-sm font-medium relative ${activeTab === "preferences" ? "text-blue-600" : "text-gray-500"}`}
                  >
                    Preferences
                    {activeTab === "preferences" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </motion.button>
                </motion.div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <div key={activeTab} className="min-h-[300px]">
                      {renderTab()}
                    </div>
                  </AnimatePresence>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 pb-6 flex gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#718096" }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2.5 rounded-lg bg-gray-500 text-white flex-1 font-medium text-sm"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#2563EB" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="px-4 py-2.5 rounded-lg bg-blue-600 text-white flex-1 font-medium text-sm shadow-lg shadow-blue-500/30"
                    >
                      {isUpdatingProfile ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : "Save Changes"}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BankProfileModal;