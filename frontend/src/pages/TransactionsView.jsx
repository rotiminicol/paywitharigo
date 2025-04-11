import { motion } from 'framer-motion';

const TransactionsView = () => {
  const transactions = [
    { id: 1, type: 'credit', amount: 15000, from: 'Salary - ACME Inc', date: '10 Apr, 2025', status: 'completed' },
    { id: 2, type: 'debit', amount: 2500, to: 'Netflix Subscription', date: '08 Apr, 2025', status: 'completed' },
    { id: 3, type: 'debit', amount: 5000, to: 'Transfer to Sarah', date: '05 Apr, 2025', status: 'completed' },
    { id: 4, type: 'credit', amount: 7500, from: 'Refund - Amazon', date: '03 Apr, 2025', status: 'completed' },
    { id: 5, type: 'debit', amount: 1200, to: 'Grocery Store', date: '01 Apr, 2025', status: 'completed' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
      <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ backgroundColor: 'rgba(37, 99, 235, 0.03)' }}
            className={`p-4 flex items-center justify-between ${
              index !== transactions.length - 1 ? 'border-b border-blue-100' : ''
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
  );
};

export default TransactionsView;