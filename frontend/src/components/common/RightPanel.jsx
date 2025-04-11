import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }
  };

  return (
    <motion.div 
      className="hidden lg:flex flex-col w-96 h-[calc(100vh-1rem)] my-2 mx-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
                variants={itemVariants}
              >
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

export default RightPanel;