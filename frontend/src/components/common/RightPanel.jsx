import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { FiDollarSign, FiTrendingUp, FiPieChart, FiCreditCard, FiShield, FiRefreshCw, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { FaEuroSign, FaPoundSign, FaYenSign } from "react-icons/fa";

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState("rates");
  const [lastUpdated, setLastUpdated] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const exchangeRates = [
    { currency: "USD", symbol: <FiDollarSign />, rate: 1.00, change: 0.00 },
    { currency: "EUR", symbol: <FaEuroSign />, rate: 0.92, change: -0.12 },
    { currency: "GBP", symbol: <FaPoundSign />, rate: 0.79, change: 0.05 },
    { currency: "JPY", symbol: <FaYenSign />, rate: 151.23, change: 0.34 },
  ];

  const cryptoRates = [
    { name: "Bitcoin", symbol: "BTC", icon: <SiBitcoin className="text-orange-500" />, price: 63452.78, change: 2.45 },
    { name: "Ethereum", symbol: "ETH", icon: <SiEthereum className="text-purple-500" />, price: 3456.21, change: -1.23 },
  ];

  const recentTransactions = [
    { id: 1, description: "Grocery Store", amount: -85.23, date: "10:45 AM", category: "Food" },
    { id: 2, description: "Salary Deposit", amount: 3250.00, date: "Apr 1", category: "Income" },
    { id: 3, description: "Electric Bill", amount: -120.75, date: "Mar 29", category: "Utilities" },
  ];

  const financialTips = [
    "Set aside 20% of income for savings",
    "Review your monthly subscriptions",
    "Consider diversifying investments",
  ];

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString());
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
      setRefreshing(false);
    }, 1000);
  };
=======
import { 
  FiTrendingUp, 
  FiStar, 
  FiInfo, 
  FiCreditCard, 
  FiPieChart, 
  FiDollarSign, 
  FiCalendar, 
  FiArrowUpRight, 
  FiArrowDownRight,
  FiTarget,
  FiActivity,
  FiLock,
  FiBell
} from "react-icons/fi";

const BankingRightPanel = () => {
  const [activeTab, setActiveTab] = useState("insights");
  const [animateBackground, setAnimateBackground] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setAnimateBackground(prev => !prev), 15000);
    return () => clearInterval(interval);
  }, []);

  // Mock data for financial insights
  const { data: financialInsights, isLoading: isInsightsLoading } = useQuery({
    queryKey: ["financialInsights"],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        { 
          id: 1, 
          title: "Save on Subscriptions", 
          description: "You could save $42/mo by reviewing your recurring payments",
          actionText: "Review Now",
          icon: "savings"
        },
        { 
          id: 2, 
          title: "Budget Alert", 
          description: "Your dining budget is 85% spent with 10 days remaining",
          actionText: "View Budget",
          icon: "alert"
        },
        { 
          id: 3, 
          title: "Credit Score Update", 
          description: "Your score increased 15 points this month",
          actionText: "See Details",
          icon: "credit"
        },
        { 
          id: 4, 
          title: "Investment Opportunity", 
          description: "New high-yield savings account available at 4.5% APY",
          actionText: "Learn More",
          icon: "opportunity"
        }
      ];
    }
  });

  // Mock data for upcoming payments
  const { data: upcomingPayments, isLoading: isPaymentsLoading } = useQuery({
    queryKey: ["upcomingPayments"],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        { 
          id: 1, 
          payee: "Netflix", 
          amount: 15.99,
          date: "Apr 15",
          logo: "streaming",
          category: "Entertainment"
        },
        { 
          id: 2, 
          payee: "Apartment Rent", 
          amount: 1450.00,
          date: "May 1",
          logo: "home",
          category: "Housing"
        },
        { 
          id: 3, 
          payee: "Car Insurance", 
          amount: 98.45,
          date: "Apr 22",
          logo: "insurance",
          category: "Insurance"
        }
      ];
    },
    enabled: activeTab === "payments",
  });

  // Mock data for goal progress
  const { data: financialGoals, isLoading: isGoalsLoading } = useQuery({
    queryKey: ["financialGoals"],
    queryFn: async () => {
      // In a real app, this would be an API call
      return [
        { 
          id: 1, 
          name: "Vacation Fund", 
          current: 2450,
          target: 3500,
          dueDate: "Aug 2025",
          progress: 70
        },
        { 
          id: 2, 
          name: "Emergency Fund", 
          current: 8750,
          target: 10000,
          dueDate: "Dec 2025",
          progress: 87
        },
        { 
          id: 3, 
          name: "New Car", 
          current: 12000,
          target: 30000,
          dueDate: "Sep 2026",
          progress: 40
        }
      ];
    }
  });
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
<<<<<<< HEAD
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80
      }
=======
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
  };

  const backgroundVariants = {
    pattern1: {
      scale: [1, 1.3, 1.1, 1.4, 1],
      rotate: [0, 15, -15, 10, 0],
      opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
    },
    pattern2: {
      scale: [1.3, 1, 1.4, 0.9, 1.3],
      rotate: [0, -20, 15, -10, 0],
      opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  // Function to render the correct icon for insights
  const renderInsightIcon = (iconType) => {
    switch(iconType) {
      case "savings": return <FiDollarSign className="text-green-400" />;
      case "alert": return <FiBell className="text-orange-400" />;
      case "credit": return <FiTrendingUp className="text-blue-400" />;
      case "opportunity": return <FiTarget className="text-purple-400" />;
      default: return <FiInfo className="text-blue-400" />;
    }
  };

  // Function to render the correct logo for payments
  const renderPaymentLogo = (logoType) => {
    switch(logoType) {
      case "streaming": return <div className="bg-red-500 rounded-full p-1"><FiActivity className="text-white" /></div>;
      case "home": return <div className="bg-blue-500 rounded-full p-1"><FiHome className="text-white" /></div>;
      case "insurance": return <div className="bg-green-500 rounded-full p-1"><FiLock className="text-white" /></div>;
      default: return <div className="bg-purple-500 rounded-full p-1"><FiDollarSign className="text-white" /></div>;
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
    }
  };

  return (
    <motion.div 
      className="hidden lg:flex flex-col w-96 h-[calc(100vh-1rem)] my-2 mx-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
<<<<<<< HEAD
    >
      {/* Header */}
      <motion.div 
        className="p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white"
        variants={itemVariants}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Financial Insights</h2>
            <p className="text-sm opacity-90 mt-1">Real-time market data</p>
=======
      className="hidden lg:block my-2 mx-1 w-96 h-[calc(100vh-0.5rem)] overflow-hidden bg-white/5 backdrop-blur-md border-2 border-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/30"
    >
      <div id="banking-panel-container" className="h-full flex flex-col relative overflow-y-auto scrollbar-hide">
        {/* Vibrant Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 -left-20 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"
            animate={animateBackground ? "pattern1" : "pattern2"}
            variants={backgroundVariants}
          />
          <motion.div 
            className="absolute bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl"
            animate={animateBackground ? "pattern2" : "pattern1"}
            variants={backgroundVariants}
          />
          <motion.div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Header */}
        <motion.div 
          className="p-5 border-b border-blue-600/50 bg-gradient-to-b from-black/80 to-transparent"
          whileHover={{ boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)" }}
        >
          <motion.h2 
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-indigo-400"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%"],
              textShadow: ["0 0 10px rgba(37, 99, 235, 0.5)", "0 0 20px rgba(67, 56, 202, 0.5)", "0 0 10px rgba(37, 99, 235, 0.5)"]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          >
            Financial Insights
          </motion.h2>
          <motion.p
            className="text-sm text-white/80 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your personal financial assistant
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="px-4 py-3 border-b border-blue-600/50">
          <div className="flex gap-3">
            {[
              { id: "insights", label: "Insights", icon: <FiPieChart /> },
              { id: "payments", label: "Payments", icon: <FiCreditCard /> },
              { id: "goals", label: "Goals", icon: <FiTarget /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-semibold ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-blue-600 via-white/20 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
                    : "text-white/70 bg-black/50 hover:bg-blue-900/30"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <motion.span
                  animate={activeTab === tab.id ? { rotate: [0, 360], scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1.5, repeat: activeTab === tab.id ? Infinity : 0 }}
                >
                  {tab.icon}
                </motion.span> 
                {tab.label}
              </motion.button>
            ))}
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
          </div>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            disabled={refreshing}
          >
            <FiRefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
          </motion.button>
        </div>
        <motion.p 
          className="text-xs mt-3 opacity-80"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Last updated: {lastUpdated}
        </motion.p>
      </motion.div>

<<<<<<< HEAD
      {/* Tabs */}
      <motion.div 
        className="flex border-b border-gray-200 bg-gray-50"
        variants={itemVariants}
      >
        {[
          { id: "rates", label: "Exchange Rates", icon: <FiDollarSign /> },
          { id: "crypto", label: "Crypto", icon: <FiTrendingUp /> },
          { id: "transactions", label: "Transactions", icon: <FiCreditCard /> }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === tab.id 
                ? "text-blue-600 border-b-2 border-blue-600 bg-white" 
                : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Exchange Rates Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "rates" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiDollarSign className="text-blue-500" />
                Currency Exchange Rates
              </motion.h3>
              
              <motion.div 
                className="space-y-3"
                variants={containerVariants}
              >
                {exchangeRates.map((rate, ) => (
                  <motion.div
                    key={rate.currency}
                    variants={cardVariants}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                          {rate.symbol}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{rate.currency}</h4>
                          <p className="text-xs text-gray-500">1 USD = {rate.rate} {rate.currency}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        rate.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}>
                        {rate.change >= 0 ? (
                          <span className="flex items-center">
                            <FiArrowUpRight className="mr-1" /> {Math.abs(rate.change)}%
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <FiArrowDownRight className="mr-1" /> {Math.abs(rate.change)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
                  <FiPieChart /> Currency Converter
                </h4>
                <div className="grid grid-cols-5 gap-2 items-center">
                  <input 
                    type="number" 
                    className="col-span-2 p-2 border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Amount"
                    defaultValue="100"
                  />
                  <select className="col-span-2 p-2 border border-gray-300 rounded-md text-sm bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                  </select>
                  <motion.button 
                    className="col-span-1 p-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Convert
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Crypto Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "crypto" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
=======
        {/* Balance Summary */}
        <div className="px-4 py-4 border-b border-blue-600/50">
          <motion.h3 
            className="text-lg font-bold text-white mb-3 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiStar className="text-blue-400 animate-pulse" /> Account Overview
          </motion.h3>
          <motion.div 
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05, boxShadow: "0 0 20px rgba(67, 56, 202, 0.5)" }}
              className="flex-1 min-w-[140px]"
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-white/20 to-indigo-600 p-0.5 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all duration-500">
                  <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm"></div>
                </div>
                <div className="relative flex flex-col p-4">
                  <p className="text-xs text-blue-400 group-hover:text-white transition-colors duration-500">
                    Checking
                  </p>
                  <p className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-500">
                    $3,842.75
                  </p>
                  <div className="flex items-center mt-2 text-xs text-green-400">
                    <FiArrowUpRight className="mr-1" /> +$245 this week
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05, boxShadow: "0 0 20px rgba(67, 56, 202, 0.5)" }}
              className="flex-1 min-w-[140px]"
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-white/20 to-blue-600 p-0.5 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all duration-500">
                  <div className="w-full h-full rounded-2xl bg-black/80 backdrop-blur-sm"></div>
                </div>
                <div className="relative flex flex-col p-4">
                  <p className="text-xs text-indigo-400 group-hover:text-white transition-colors duration-500">
                    Savings
                  </p>
                  <p className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-500">
                    $12,650.32
                  </p>
                  <div className="flex items-center mt-2 text-xs text-green-400">
                    <FiArrowUpRight className="mr-1" /> +$750 this month
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
          <motion.div className="flex flex-col gap-4" variants={containerVariants}>
            <AnimatePresence mode="wait">
              {activeTab === "insights" && (
                <>
                  {financialInsights?.map((insight) => (
                    <motion.div
                      key={insight.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="group relative overflow-hidden rounded-2xl border border-blue-600/30"
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 0 25px rgba(37, 99, 235, 0.5)" 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                      <div className="flex items-center justify-between gap-3 p-4 hover:bg-blue-900/30 transition-all duration-500">
                        <div className="flex gap-3 items-center">
                          <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                            <motion.div 
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-white/20 to-indigo-600 opacity-80 group-hover:opacity-100 transition-all duration-500"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            ></motion.div>
                            <div className="relative w-full h-full rounded-full flex items-center justify-center border-2 border-blue-400 group-hover:border-white transition-all duration-500">
                              {renderInsightIcon(insight.icon)}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <motion.p 
                              className="text-sm font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors duration-500"
                              whileHover={{ x: 5 }}
                            >
                              {insight.title}
                            </motion.p>
                            <p className="text-xs text-gray-300 group-hover:text-white transition-colors duration-500">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 15px rgba(67, 56, 202, 0.7)" }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-600 via-white/20 to-indigo-600 text-white rounded-full py-1.5 px-4 text-xs font-semibold"
                        >
                          {insight.actionText}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}

              {activeTab === "payments" && (
                <>
                  <motion.h3 
                    className="text-sm font-semibold text-white/80 mb-2"
                    variants={itemVariants}
                  >
                    Upcoming Payments
                  </motion.h3>
                  
                  {upcomingPayments?.map((payment) => (
                    <motion.div
                      key={payment.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="group relative overflow-hidden rounded-2xl border border-blue-600/30"
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 0 25px rgba(37, 99, 235, 0.5)" 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                      <div className="flex items-center justify-between gap-3 p-4 hover:bg-blue-900/30 transition-all duration-500">
                        <div className="flex gap-3 items-center">
                          <div className="relative w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-all duration-500">
                            <motion.div 
                              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-white/20 to-indigo-600 opacity-80 group-hover:opacity-100 transition-all duration-500"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            ></motion.div>
                            <div className="relative w-full h-full rounded-full flex items-center justify-center border-2 border-blue-400 group-hover:border-white transition-all duration-500">
                              <FiCalendar className="text-white" size={16} />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <motion.p 
                              className="text-sm font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors duration-500"
                              whileHover={{ x: 5 }}
                            >
                              {payment.payee}
                            </motion.p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-500">
                                {payment.category}
                              </span>
                              <span className="inline-block w-1 h-1 rounded-full bg-blue-400"></span>
                              <span className="text-xs text-blue-400 group-hover:text-white transition-colors duration-500">
                                {payment.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-500">
                            ${payment.amount.toFixed(2)}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 15px rgba(67, 56, 202, 0.7)" }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs text-blue-400 group-hover:text-white transition-colors duration-500"
                          >
                            Modify
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-2 p-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-500"
                  >
                    Schedule New Payment
                  </motion.button>
                </>
              )}

              {activeTab === "goals" && (
                <>
                  <motion.h3 
                    className="text-sm font-semibold text-white/80 mb-2"
                    variants={itemVariants}
                  >
                    Your Financial Goals
                  </motion.h3>
                  
                  {financialGoals?.map((goal) => (
                    <motion.div
                      key={goal.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="group relative overflow-hidden rounded-2xl border border-blue-600/30"
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 0 25px rgba(37, 99, 235, 0.5)" 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                      <div className="p-4 hover:bg-blue-900/30 transition-all duration-500">
                        <div className="flex items-center justify-between mb-3">
                          <motion.p 
                            className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-500"
                            whileHover={{ x: 5 }}
                          >
                            {goal.name}
                          </motion.p>
                          <p className="text-xs text-blue-400 group-hover:text-white transition-colors duration-500">
                            By {goal.dueDate}
                          </p>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-500">
                              ${goal.current.toLocaleString()}
                            </span>
                            <span className="text-white font-semibold">
                              ${goal.target.toLocaleString()}
                            </span>
                          </div>
                          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                              initial={{ width: "0%" }}
                              animate={{ width: `${goal.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-300 group-hover:text-white transition-colors duration-500">
                            {goal.progress}% complete
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 15px rgba(67, 56, 202, 0.7)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 via-white/20 to-indigo-600 text-white rounded-full py-1 px-3 text-xs font-semibold"
                          >
                            Add Funds
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-2 p-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-500"
                  >
                    Create New Goal
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Quick Actions Section */}
        <div className="px-4 py-4 border-t border-blue-600/50 bg-gradient-to-t from-black/80 to-transparent">
          <motion.h3 
            className="text-lg font-bold text-white mb-4 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiActivity className="text-blue-400 animate-bounce" /> Quick Actions
          </motion.h3>
          <motion.div className="grid grid-cols-2 gap-3">
            {[
              { name: "Transfer", icon: <FiArrowUpRight size={16} /> },
              { name: "Pay Bills", icon: <FiCreditCard size={16} /> },
              { name: "Statements", icon: <FiCalendar size={16} /> },
              { name: "Security", icon: <FiLock size={16} /> }
            ].map((action, index) => (
              <motion.div
                key={action.name}
                custom={index}
                initial="hidden"
                animate="visible"
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(67, 56, 202, 0.5)"
                }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900/30 to-blue-900/30 transition-all duration-500"
              >
<<<<<<< HEAD
                <FiTrendingUp className="text-blue-500" />
                Cryptocurrency Prices
              </motion.h3>
              
              <motion.div 
                className="space-y-3"
                variants={containerVariants}
              >
                {cryptoRates.map((crypto, ) => (
                  <motion.div
                    key={crypto.symbol}
                    variants={cardVariants}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gray-50">
                          {crypto.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{crypto.name}</h4>
                          <p className="text-xs text-gray-500">{crypto.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${crypto.price.toLocaleString()}</p>
                        <p className={`text-xs font-medium ${
                          crypto.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
                  <FiShield /> Crypto Safety Tips
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <motion.li 
                    className="flex items-start gap-2"
                    whileHover={{ x: 2 }}
                  >
                    <span className="text-blue-500">•</span> Only use reputable exchanges
                  </motion.li>
                  <motion.li 
                    className="flex items-start gap-2"
                    whileHover={{ x: 2 }}
                  >
                    <span className="text-blue-500">•</span> Enable two-factor authentication
                  </motion.li>
                  <motion.li 
                    className="flex items-start gap-2"
                    whileHover={{ x: 2 }}
                  >
                    <span className="text-blue-500">•</span> Consider cold storage for large amounts
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transactions Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "transactions" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiCreditCard className="text-blue-500" />
                Recent Transactions
              </motion.h3>
              
              <motion.div 
                className="space-y-3"
                variants={containerVariants}
              >
                {recentTransactions.map((txn, ) => (
                  <motion.div
                    key={txn.id}
                    variants={cardVariants}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{txn.description}</h4>
                        <p className="text-xs text-gray-500">{txn.date} • {txn.category}</p>
                      </div>
                      <p className={`font-medium ${
                        txn.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {txn.amount >= 0 ? '+' : ''}{txn.amount.toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
                  <FiPieChart /> Financial Tips
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  {financialTips.map((tip, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2"
                      whileHover={{ x: 2 }}
                    >
                      <span className="text-blue-500">•</span> {tip}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
=======
                <div className="p-3">
                  <div className="flex items-center justify-center gap-2 flex-col">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-white/20 to-indigo-600 flex items-center justify-center group-hover:scale-115 transition-all duration-500"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      {action.icon}
                    </motion.div>
                    <motion.span 
                      className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-500 block"
                      whileHover={{ y: -2 }}
                    >
                      {action.name}
                    </motion.span>
                  </div>
                </div>
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-white to-indigo-500"                  
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-blue-600/50 text-center">
          <motion.p 
            className="text-xs text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 15px rgba(37, 99, 235, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 text-xs text-blue-400 hover:text-white transition-colors duration-500"
          >
            Need help? Contact support
          </motion.button>
        </div>
>>>>>>> 7a483a2ff38bcec8f107555b34aa4e41f5787718
      </div>

      {/* Footer */}
      <motion.div 
        className="p-4 border-t border-gray-200 bg-gray-50 text-center"
        variants={itemVariants}
      >
        <p className="text-xs text-gray-500">
          Data provided by Arigo Bank • Rates may vary
        </p>
        <motion.p 
          className="text-xs text-blue-600 mt-1"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Secure banking with 256-bit encryption
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default BankingRightPanel;