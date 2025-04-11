import { useState, useEffect } from 'react';
import { ArrowRight, Send, Phone, Wifi, Zap, Bus, Gamepad2, AlertCircle, Check } from 'lucide-react';

const Bills = () => {
  const [activeTab, setActiveTab] = useState('transfer');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [networkProvider, setNetworkProvider] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);

  // Fetch Nigerian banks using Paystack API
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        // In a real implementation, this would be a server-side call
        // For demo purposes, we're adding some sample banks
        setBanks([
          { name: 'Access Bank', code: '044' },
          { name: 'First Bank of Nigeria', code: '011' },
          { name: 'Guaranty Trust Bank', code: '058' },
          { name: 'United Bank for Africa', code: '033' },
          { name: 'Zenith Bank', code: '057' },
          { name: 'Wema Bank', code: '035' },
          { name: 'Sterling Bank', code: '232' },
          { name: 'Fidelity Bank', code: '070' },
        ]);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to Paystack
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      
      // Reset form after successful transaction
      setTimeout(() => {
        setShowSuccessModal(false);
        setAmount('');
        setAccountNumber('');
        setSelectedBank('');
        setPhoneNumber('');
        setNetworkProvider('');
        setMeterNumber('');
      }, 3000);
    }, 2000);
  };

  const tabs = [
    { id: 'transfer', name: 'Transfer', icon: <Send className="w-5 h-5" /> },
    { id: 'airtime', name: 'Airtime', icon: <Phone className="w-5 h-5" /> },
    { id: 'data', name: 'Data', icon: <Wifi className="w-5 h-5" /> },
    { id: 'electricity', name: 'Electricity', icon: <Zap className="w-5 h-5" /> },
    { id: 'transport', name: 'Transport', icon: <Bus className="w-5 h-5" /> },
    { id: 'betting', name: 'Betting', icon: <Gamepad2 className="w-5 h-5" /> }
  ];

  const networkProviders = [
    { id: 'mtn', name: 'MTN Nigeria' },
    { id: 'airtel', name: 'Airtel Nigeria' },
    { id: 'glo', name: 'Globacom' },
    { id: '9mobile', name: '9Mobile' }
  ];

  const electricityProviders = [
    { id: 'ekedc', name: 'Eko Electricity' },
    { id: 'ikedc', name: 'Ikeja Electricity' },
    { id: 'aedc', name: 'Abuja Electricity' },
    { id: 'phedc', name: 'Port Harcourt Electricity' }
  ];

  const transportProviders = [
    { id: 'lagbus', name: 'Lagos BRT' },
    { id: 'ubernigeria', name: 'Uber Nigeria' },
    { id: 'boltng', name: 'Bolt Nigeria' }
  ];

  const bettingProviders = [
    { id: 'bet9ja', name: 'Bet9ja' },
    { id: 'betking', name: 'BetKing' },
    { id: 'sportybet', name: 'SportyBet' },
    { id: 'nairabet', name: 'NairaBet' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Nigerian Bills Payment Portal</h1>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto mb-8 pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 mr-4 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transfer Form */}
            {activeTab === 'transfer' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select a bank</option>
                    {banks.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter 10-digit account number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    maxLength={10}
                    pattern="\d{10}"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    min="100"
                  />
                </div>
              </div>
            )}

            {/* Airtime Form */}
            {activeTab === 'airtime' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network Provider</label>
                  <select
                    value={networkProvider}
                    onChange={(e) => setNetworkProvider(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select network provider</option>
                    {networkProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    min="50"
                  />
                </div>
              </div>
            )}

            {/* Data Form */}
            {activeTab === 'data' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network Provider</label>
                  <select
                    value={networkProvider}
                    onChange={(e) => setNetworkProvider(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select network provider</option>
                    {networkProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Plan</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select data plan</option>
                    <option value="daily">Daily (100MB - ₦100)</option>
                    <option value="weekly">Weekly (1GB - ₦500)</option>
                    <option value="monthly">Monthly (3GB - ₦1,500)</option>
                    <option value="premium">Premium (10GB - ₦5,000)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            {/* Electricity Form */}
            {activeTab === 'electricity' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Electricity Provider</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select electricity provider</option>
                    {electricityProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meter Number</label>
                  <input
                    type="text"
                    value={meterNumber}
                    onChange={(e) => setMeterNumber(e.target.value)}
                    placeholder="Enter meter number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    min="500"
                  />
                </div>
              </div>
            )}

            {/* Transport Form */}
            {activeTab === 'transport' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transport Provider</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select transport provider</option>
                    {transportProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card/Account Number</label>
                  <input
                    type="text"
                    placeholder="Enter card or account number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    min="100"
                  />
                </div>
              </div>
            )}

            {/* Betting Form */}
            {activeTab === 'betting' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Betting Provider</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select betting provider</option>
                    {bettingProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID / Account Number</label>
                  <input
                    type="text"
                    placeholder="Enter user ID or account number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    min="100"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 transform active:scale-95"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  Pay Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              )}
            </button>
          </form>

          {/* Recent Transactions */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center p-3 border-b border-gray-200">
                <div>
                  <p className="font-medium">Bank Transfer to GTBank</p>
                  <p className="text-sm text-gray-500">Apr 10, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₦25,000</p>
                  <p className="text-sm text-green-600">Successful</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-gray-200">
                <div>
                  <p className="font-medium">MTN Airtime Purchase</p>
                  <p className="text-sm text-gray-500">Apr 09, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₦2,000</p>
                  <p className="text-sm text-green-600">Successful</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3">
                <div>
                  <p className="font-medium">Ikeja Electric Payment</p>
                  <p className="text-sm text-gray-500">Apr 08, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₦10,000</p>
                  <p className="text-sm text-green-600">Successful</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl animate-scaleIn">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction Successful!</h3>
              <p className="text-gray-600 mb-6">Your transaction has been processed successfully.</p>
              <div className="border-t border-gray-200 w-full pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">NGN{Math.floor(Math.random() * 1000000000)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₦{amount || '10,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">Apr 10, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Animation for Debit Alert */}
      <div className="fixed top-4 right-4 z-50">
        {isLoading && (
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full border-l-4 border-red-500 animate-slideInRight">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Debit Alert</p>
                <p className="text-sm text-gray-500">
                  Your account has been debited with ₦{amount || '0.00'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;