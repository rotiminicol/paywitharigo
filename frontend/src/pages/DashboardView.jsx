import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from "./Modals";

const DashboardView = ({ accountDetails, setAccountDetails, setActiveTab }) => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  const recentTransactions = [
    { id: 1, type: 'credit', amount: 15000, from: 'Salary - ACME Inc', date: '10 Apr, 2025', status: 'completed' },
    { id: 2, type: 'debit', amount: 2500, to: 'Netflix Subscription', date: '08 Apr, 2025', status: 'completed' },
    { id: 3, type: 'debit', amount: 5000, to: 'Transfer to Sarah', date: '05 Apr, 2025', status: 'completed' },
  ];

  const handleAddMoney = () => {
    const amount = parseFloat(addMoneyAmount);
    if (!isNaN(amount) && amount > 0) {
      setAccountDetails((prev) => ({ ...prev, balance: prev.balance + amount }));
      setAddMoneyAmount('');
      setShowAddMoneyModal(false);
    }
  };

  return (
    <>
      <motion.div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome back, {accountDetails.name}</h2>
        <motion.div
          whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(37, 99, 235, 0.2)' }}
          className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 mb-1">Available Balance</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{accountDetails.currency}</span>
                <span className="text-4xl font-bold ml-1">
                  {accountDetails.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAccountDetails(!showAccountDetails)}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                {showAccountDetails ? (
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                ) : (
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                )}
                {!showAccountDetails && (
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                )}
              </svg>
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: showAccountDetails ? 1 : 0, height: showAccountDetails ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-blue-100 text-sm">Account Number</span>
                <span className="font-medium">{accountDetails.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100 text-sm">Account Name</span>
                <span className="font-medium">{accountDetails.name}</span>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-wrap gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-white/20 py-3 rounded-xl font-medium text-sm backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send Money</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddMoneyModal(true)}
              className="flex-1 bg-white/20 py-3 rounded-xl font-medium text-sm backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Money</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Transfer', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
            { name: 'Pay Bills', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
            { name: 'Buy Airtime', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
            { name: 'Investments', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
          ].map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(37, 99, 235, 0.1)', backgroundColor: 'rgba(37, 99, 235, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 flex flex-col items-center justify-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <span className="text-gray-700 font-medium text-sm">{action.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 text-sm font-medium flex items-center gap-1"
            onClick={() => setActiveTab('transactions')} // Now defined via props
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
          {recentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ backgroundColor: 'rgba(37, 99, 235, 0.03)' }}
              className={`p-4 flex items-center justify-between ${
                index !== recentTransactions.length - 1 ? 'border-b border-blue-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {transaction.type === 'credit' ? transaction.from : transaction.to}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {showAddMoneyModal && (
        <Modal onClose={() => setShowAddMoneyModal(false)}>
          <h2 className="text-xl font-semibold mb-4">Add Money</h2>
          <input
            type="number"
            value={addMoneyAmount}
            onChange={(e) => setAddMoneyAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddMoney}
            className="w-full p-3 bg-blue-600 text-white rounded-md"
          >
            Add Money
          </motion.button>
        </Modal>
      )}
    </>
  );
};

export default DashboardView;