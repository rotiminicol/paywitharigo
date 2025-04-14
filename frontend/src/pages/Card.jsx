import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  
  CheckCircle, 
  AlertCircle, 
  Zap, 
  Lock, 
  RotateCw,
  Eye,
  EyeOff,
  Share2,
  MoreVertical
} from 'lucide-react';
import ArigoPayLogo from '/Money.png'

const ArigoPayCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      id: 'card1',
      type: 'Platinum',
      number: '4242424242424291',
      holder: 'ALEX MORGAN',
      expiry: '09/28',
      cvv: '123',
      gradient: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900',
      logo: 'ARIGO PLATINUM',
      status: 'active',
      limit: '$25,000',
      balance: '$8,245.67',
      transactions: 24,
      benefits: ['3% Cashback', 'Airport Lounge Access', 'No Foreign Fees']
    },
    {
      id: 'card2',
      type: 'Gold',
      number: '5555555555557634',
      holder: 'ALEX MORGAN',
      expiry: '11/27',
      cvv: '456',
      gradient: 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700',
      logo: 'ARIGO GOLD',
      status: 'active',
      limit: '$10,000',
      balance: '$3,421.89',
      transactions: 12,
      benefits: ['2% Cashback', 'Extended Warranty', 'Travel Insurance']
    },
    {
      id: 'card3',
      type: 'Business',
      number: '3782822463101082',
      holder: 'ALEX MORGAN',
      expiry: '05/26',
      cvv: '789',
      gradient: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      logo: 'ARIGO BUSINESS',
      status: 'inactive',
      limit: '$15,000',
      balance: '$0.00',
      transactions: 0,
      benefits: ['5% Office Supplies', 'Employee Cards', 'Expense Reports']
    }
  ];

  const toggleCardNumberVisibility = () => {
    setShowFullNumber(!showFullNumber);
  };

  const formatCardNumber = (number) => {
    if (showFullNumber) {
      return number.replace(/(\d{4})/g, '$1 ').trim();
    }
    return '•••• •••• •••• ' + number.slice(-4);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <img src={ArigoPayLogo} alt="Arigo Pay" className="h-10 w-10" />
              Your Payment Cards
            </h1>
            <p className="text-gray-600">Manage your Arigo Pay cards and settings</p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              List
            </motion.button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transition-all duration-300 ${
                  activeCard === index ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setActiveCard(index)}
              >
                {/* Card Background */}
                <div className={`${card.gradient} h-48 p-6 flex flex-col justify-between relative`}>
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        initial={{
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                          scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                          transition: {
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                        style={{
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 10 + 5}px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Card Header */}
                  <div className="flex justify-between items-start z-10">
                    <div className="text-white text-opacity-90 font-bold tracking-wider">
                      {card.logo}
                    </div>
                    <div className="flex items-center gap-2">
                      {card.status === 'active' ? (
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Zap className="text-yellow-300" size={18} fill="currentColor" />
                        </motion.div>
                      ) : (
                        <Lock className="text-white opacity-70" size={18} />
                      )}
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="z-10">
                    <div className="font-mono text-white text-xl tracking-wider mb-1">
                      {formatCardNumber(card.number)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-white text-opacity-70">CARD HOLDER</div>
                        <div className="text-sm text-white font-medium">{card.holder}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white text-opacity-70">EXPIRES</div>
                        <div className="text-sm text-white font-medium">{card.expiry}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-white p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{card.type}</h3>
                    <p className="text-xs text-gray-500">
                      {card.status === 'active' ? 'Active' : 'Inactive'} • {card.transactions} transactions
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {card.status === 'active' ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle className="text-green-500" size={18} />
                      </motion.div>
                    ) : (
                      <AlertCircle className="text-red-500" size={18} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                whileHover={{ x: 5 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
                  activeCard === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveCard(index)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`${card.gradient} w-full md:w-48 h-32 md:h-auto p-4 flex flex-col justify-between`}>
                    <div className="text-white text-opacity-90 font-bold text-sm">
                      {card.logo}
                    </div>
                    <div className="font-mono text-white text-lg">
                      •••• •••• •••• {card.number.slice(-4)}
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="font-semibold">{card.type}</h3>
                      <p className="text-sm text-gray-600">{card.holder}</p>
                      <p className="text-xs text-gray-500 mt-1">Expires {card.expiry}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <div className="text-right">
                        <p className="text-sm font-medium">{card.limit} limit</p>
                        <p className="text-xs text-gray-500">{card.balance} balance</p>
                      </div>
                      {card.status === 'active' ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Selected Card Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[activeCard].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-10 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{cards[activeCard].type} Card</h2>
                  <p className="text-gray-600">Detailed information and settings</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={toggleCardNumberVisibility}
                    aria-label={showFullNumber ? "Hide card number" : "Show card number"}
                  >
                    {showFullNumber ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Share2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical size={20} />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card Preview */}
                <div className={`${cards[activeCard].gradient} rounded-xl p-6 h-64 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0"></div>
                  <div className="z-10 flex justify-between items-start">
                    <div className="text-white text-opacity-90 font-bold tracking-wider">
                      {cards[activeCard].logo}
                    </div>
                    <div className="text-white text-opacity-80">
                      {cards[activeCard].status === 'active' ? (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        >
                          <RotateCw size={20} />
                        </motion.div>
                      ) : (
                        <Lock size={20} />
                      )}
                    </div>
                  </div>
                  <div className="z-10">
                    <div className="font-mono text-white text-xl tracking-wider mb-4">
                      {formatCardNumber(cards[activeCard].number)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-white text-opacity-70">CARD HOLDER</div>
                        <div className="text-sm text-white font-medium">{cards[activeCard].holder}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white text-opacity-70">EXPIRES</div>
                        <div className="text-sm text-white font-medium">{cards[activeCard].expiry}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Card Information</h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm text-gray-500">Card Number</dt>
                          <dd className="font-mono flex items-center gap-2">
                            {formatCardNumber(cards[activeCard].number)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Name on Card</dt>
                          <dd>{cards[activeCard].holder}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Expiry Date</dt>
                          <dd>{cards[activeCard].expiry}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">CVV</dt>
                          <dd className="font-mono">•••</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Card Status</h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm text-gray-500">Status</dt>
                          <dd className="flex items-center gap-2">
                            {cards[activeCard].status === 'active' ? (
                              <>
                                <CheckCircle className="text-green-500" size={18} />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="text-red-500" size={18} />
                                <span>Inactive</span>
                              </>
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Spending Limit</dt>
                          <dd>{cards[activeCard].limit}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Current Balance</dt>
                          <dd>{cards[activeCard].balance}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Recent Transactions</dt>
                          <dd>{cards[activeCard].transactions}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Card Benefits */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Card Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {cards[activeCard].benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {benefit}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-8 flex flex-wrap gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium flex items-center gap-2"
                >
                  <Lock size={16} />
                  Freeze Card
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Cancel Card
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security Settings
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArigoPayCards;