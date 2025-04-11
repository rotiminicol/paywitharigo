import { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle, ChevronDown,  CreditCard, Loader } from 'lucide-react';
import { motion } from "framer-motion";

// Simulated banks data (normally would come from Paystack API)
const NIGERIAN_BANKS = [
  { id: 1, name: 'Access Bank', code: '044' },
  { id: 2, name: 'First Bank', code: '011' },
  { id: 3, name: 'GTBank', code: '058' },
  { id: 4, name: 'UBA', code: '033' },
  { id: 5, name: 'Zenith Bank', code: '057' },
  { id: 6, name: 'Kuda Bank', code: '090267' },
  { id: 7, name: 'Moniepoint', code: '50515' },
  { id: 8, name: 'Palmpay', code: '100033' },
  { id: 9, name: 'Sterling Bank', code: '232' },
  { id: 10, name: 'Wema Bank', code: '035' }
];

// Transaction history (simulated)
const RECENT_TRANSACTIONS = [
  { id: 1, name: 'Chioma Okafor', bank: 'GTBank', amount: 50000, date: '2025-04-08', status: 'success' },
  { id: 2, name: 'Emeka Nwosu', bank: 'Access Bank', amount: 25000, date: '2025-04-07', status: 'success' },
  { id: 3, name: 'Folake Adeyemi', bank: 'UBA', amount: 75000, date: '2025-04-05', status: 'failed' }
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

const Transfer = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(250000); // Demo balance

  // Function to verify account number (simulated Paystack API call)
  const verifyAccount = () => {
    if (!selectedBank || accountNumber.length !== 10) return;
    
    setVerifying(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock response based on input to simulate API
      if (accountNumber === '0123456789') {
        setAccountName('John Okonkwo');
      } else if (accountNumber === '9876543210') {
        setAccountName('Amina Ibrahim');
      } else {
        // Generate a random Nigerian name for demo purposes
        const firstNames = ['Chioma', 'Emeka', 'Ngozi', 'Oluwaseun', 'Tunde', 'Blessing', 'Chinedu'];
        const lastNames = ['Okafor', 'Mohammed', 'Adeyemi', 'Okonkwo', 'Ibrahim', 'Nwosu', 'Eze'];
        const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        setAccountName(randomName);
      }
      setVerifying(false);
    }, 1500);
  };

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      verifyAccount();
    } else {
      setAccountName('');
    }
  }, [accountNumber, selectedBank]);

  const handleTransfer = () => {
    if (!selectedBank || !accountNumber || !accountName || !amount || parseFloat(amount) <= 0) {
      setTransferError('Please fill all required fields correctly');
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setTransferError('Insufficient funds');
      return;
    }

    setLoading(true);
    setTransferError(null);

    // Simulate API call to Paystack for transfer
    setTimeout(() => {
      // Mock successful transfer
      setAvailableBalance(prev => prev - parseFloat(amount));
      setLoading(false);
      setTransferSuccess(true);
      
      // Reset form after success message display
      setTimeout(() => {
        setSelectedBank(null);
        setAccountNumber('');
        setAccountName('');
        setAmount('');
        setNarration('');
        setTransferSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Bank Transfer</h1>
          <p className="text-blue-100">Transfer funds to any Nigerian bank account</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main transfer form */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Transfer Details</h2>
              
              {transferSuccess ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6"
                >
                  <CheckCircle className="text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-green-800">Transfer Successful!</p>
                    <p className="text-green-600 text-sm">Your transfer of {formatCurrency(amount)} to {accountName} has been processed.</p>
                  </div>
                </motion.div>
              ) : null}

              {transferError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-6">
                  <AlertTriangle className="text-red-500 mr-3" />
                  <p className="text-red-700">{transferError}</p>
                </div>
              ) : null}

              {/* Bank Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Select Bank</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setBankDropdownOpen(!bankDropdownOpen)}
                  >
                    <span>{selectedBank ? selectedBank.name : 'Select a bank'}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  {bankDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                    >
                      {NIGERIAN_BANKS.map(bank => (
                        <div
                          key={bank.id}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => {
                            setSelectedBank(bank);
                            setBankDropdownOpen(false);
                          }}
                        >
                          {bank.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Account Number */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Account Number</label>
                <input
                  type="text"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10-digit account number"
                  value={accountNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setAccountNumber(value);
                    }
                  }}
                />
              </div>

              {/* Account Name - Read only */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Account Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    value={accountName}
                    readOnly
                    placeholder={verifying ? "Verifying..." : "Account name will appear here"}
                  />
                  {verifying && (
                    <div className="absolute right-3 top-3">
                      <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="text"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Available balance: {formatCurrency(availableBalance)}</p>
              </div>

              {/* Narration */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Narration (Optional)</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What's this transfer for?"
                  rows={2}
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                />
              </div>

              {/* Transfer Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center"
                onClick={handleTransfer}
                disabled={loading || !selectedBank || !accountNumber || !accountName || !amount}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  <>
                    Transfer Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="font-medium text-gray-800 mb-4">Recent Transactions</h3>
              
              <div className="space-y-3">
                {RECENT_TRANSACTIONS.map(tx => (
                  <motion.div 
                    key={tx.id} 
                    whileHover={{ y: -2 }}
                    className="p-3 border border-gray-100 rounded-lg hover:shadow-md"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{tx.name}</p>
                      <div className={`text-sm ${tx.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.status === 'success' ? 'Success' : 'Failed'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{tx.bank}</div>
                    <div className="flex justify-between mt-1">
                      <div className="font-medium text-blue-600">{formatCurrency(tx.amount)}</div>
                      <div className="text-xs text-gray-500">{tx.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Transfer Tips</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    Verify account details before transferring
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    Transfers between Nigerian banks are processed within minutes
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 rounded-full p-1">
                      <CheckCircle className="h-3 w-3 text-blue-600" />
                    </div>
                    Save recipients for faster transfers next time
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Need Help?
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our support team is available 24/7 to assist with any transfer issues.
                </p>
                <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;