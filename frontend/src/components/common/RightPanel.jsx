import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiDollarSign,
  FiTrendingUp,
  FiCreditCard,
  FiPieChart,
  FiArrowUpRight,
  FiArrowDownRight,
  FiTarget,
  FiBell,
  FiRefreshCw,
  FiCalendar,
  FiStar,
} from 'react-icons/fi';
import { SiBitcoin, SiEthereum } from 'react-icons/si';
import { FaEuroSign, FaPoundSign, FaYenSign } from 'react-icons/fa';

const BankingRightPanel = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const financialInsights = [
    {
      id: 1,
      title: 'Save on Subscriptions',
      description: 'You could save $42/mo by reviewing your recurring payments',
      actionText: 'Review Now',
      icon: 'savings',
    },
    {
      id: 2,
      title: 'Budget Alert',
      description: 'Your dining budget is 85% spent with 10 days remaining',
      actionText: 'View Budget',
      icon: 'alert',
    },
    {
      id: 3,
      title: 'Credit Score Update',
      description: 'Your score increased 15 points this month',
      actionText: 'See Details',
      icon: 'credit',
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      payee: 'Netflix',
      amount: 15.99,
      date: 'Apr 15',
      category: 'Entertainment',
    },
    {
      id: 2,
      payee: 'Apartment Rent',
      amount: 1450.0,
      date: 'May 1',
      category: 'Housing',
    },
  ];

  const financialGoals = [
    {
      id: 1,
      name: 'Vacation Fund',
      current: 2450,
      target: 3500,
      dueDate: 'Aug 2025',
      progress: 70,
    },
    {
      id: 2,
      name: 'Emergency Fund',
      current: 8750,
      target: 10000,
      dueDate: 'Dec 2025',
      progress: 87,
    },
  ];

  const exchangeRates = [
    { currency: 'USD', symbol: <FiDollarSign />, rate: 1.0, change: 0.0 },
    { currency: 'EUR', symbol: <FaEuroSign />, rate: 0.92, change: -0.12 },
    { currency: 'GBP', symbol: <FaPoundSign />, rate: 0.79, change: 0.05 },
    { currency: 'JPY', symbol: <FaYenSign />, rate: 151.23, change: 0.34 },
  ];

  const cryptoRates = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: <SiBitcoin className="text-orange-500" />,
      price: 63452.78,
      change: 2.45,
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: <SiEthereum className="text-purple-500" />,
      price: 3456.21,
      change: -1.23,
    },
  ];

  useEffect(() => {
    const updateTime = () => {
      setLastUpdated(
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastUpdated(
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      setRefreshing(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  const renderInsightIcon = (iconType) => {
    switch (iconType) {
      case 'savings':
        return <FiDollarSign className="text-green-400" />;
      case 'alert':
        return <FiBell className="text-orange-400" />;
      case 'credit':
        return <FiTrendingUp className="text-blue-400" />;
      default:
        return <FiStar className="text-blue-400" />;
    }
  };

  return (
    <motion.div
      className="hidden lg:flex flex-col w-96 h-[calc(100vh-1rem)] my-2 mx-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold">Financial Insights</h2>
        <p className="text-sm opacity-90 mt-1">Your personal financial assistant</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex border-b border-gray-200 bg-gray-50"
        variants={itemVariants}
      >
        {[
          { id: 'insights', label: 'Insights', icon: <FiPieChart /> },
          { id: 'payments', label: 'Payments', icon: <FiCreditCard /> },
          { id: 'goals', label: 'Goals', icon: <FiTarget /> },
          { id: 'rates', label: 'Rates', icon: <FiDollarSign /> },
          { id: 'crypto', label: 'Crypto', icon: <FiTrendingUp /> },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
            aria-label={`Switch to ${tab.label} tab`}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <AnimatePresence mode="wait">
          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <motion.h3
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiStar className="text-blue-500" />
                Your Insights
              </motion.h3>
              {financialInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  variants={cardVariants}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-50">
                      {renderInsightIcon(insight.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      {insight.actionText}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <motion.h3
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiCreditCard className="text-blue-500" />
                Upcoming Payments
              </motion.h3>
              {upcomingPayments.map((payment) => (
                <motion.div
                  key={payment.id}
                  variants={cardVariants}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-50">
                        <FiCalendar className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{payment.payee}</h4>
                        <p className="text-xs text-gray-500">
                          {payment.date} • {payment.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${payment.amount.toFixed(2)}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Modify
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Schedule New Payment
              </motion.button>
            </motion.div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <motion.h3
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiTarget className="text-blue-500" />
                Your Financial Goals
              </motion.h3>
              {financialGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  variants={cardVariants}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{goal.name}</h4>
                    <p className="text-xs text-gray-500">By {goal.dueDate}</p>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">${goal.current.toLocaleString()}</span>
                    <span className="text-gray-900 font-medium">${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: '0%' }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-600">{goal.progress}% complete</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Add Funds
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Create New Goal
              </motion.button>
            </motion.div>
          )}

          {/* Exchange Rates Tab */}
          {activeTab === 'rates' && (
            <motion.div
              key="rates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <motion.h3
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiDollarSign className="text-blue-500" />
                Currency Exchange Rates
              </motion.h3>
              {exchangeRates.map((rate) => (
                <motion.div
                  key={rate.currency}
                  variants={cardVariants}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                        {rate.symbol}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{rate.currency}</h4>
                        <p className="text-xs text-gray-500">
                          1 USD = {rate.rate} {rate.currency}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        rate.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {rate.change >= 0 ? (
                        <span className="flex items-center">
                          <FiArrowUpRight className="mr-1" />
                          {Math.abs(rate.change)}%
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FiArrowDownRight className="mr-1" />
                          {Math.abs(rate.change)}%
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Crypto Tab */}
          {activeTab === 'crypto' && (
            <motion.div
              key="crypto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <motion.h3
                className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                variants={itemVariants}
              >
                <FiTrendingUp className="text-blue-500" />
                Cryptocurrency Prices
              </motion.h3>
              {cryptoRates.map((crypto) => (
                <motion.div
                  key={crypto.symbol}
                  variants={cardVariants}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-50">{crypto.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{crypto.name}</h4>
                        <p className="text-xs text-gray-500">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${crypto.price.toLocaleString()}</p>
                      <p
                        className={`text-xs font-medium ${
                          crypto.change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        className="p-4 border-t border-gray-200 bg-gray-50 text-center"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            disabled={refreshing}
            aria-label="Refresh data"
          >
            <FiRefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>
        <motion.p
          className="text-xs text-blue-600 mt-2"
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