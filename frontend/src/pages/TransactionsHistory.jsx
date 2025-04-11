import { useState, useEffect } from 'react';
import { Search, Calendar, Filter, ArrowUpRight, ArrowDownLeft, CreditCard, Clock, ChevronDown, Download } from 'lucide-react';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Simulate fetching transaction data
    setTimeout(() => {
      const mockTransactions = [
        {
          id: 1,
          type: 'credit',
          title: 'Money Received',
          amount: 2500.00,
          date: 'Apr 10, 2025',
          time: '14:32',
          recipient: 'John Smith',
          status: 'completed',
          category: 'transfer'
        },
        {
          id: 2,
          type: 'debit',
          title: 'Online Purchase',
          amount: 120.50,
          date: 'Apr 08, 2025',
          time: '09:15',
          recipient: 'Tech Store Inc.',
          status: 'completed',
          category: 'shopping'
        },
        {
          id: 3,
          type: 'debit',
          title: 'Subscription',
          amount: 14.99,
          date: 'Apr 05, 2025',
          time: '00:01',
          recipient: 'Premium Service',
          status: 'completed',
          category: 'subscription'
        },
        {
          id: 4,
          type: 'credit',
          title: 'Refund',
          amount: 39.99,
          date: 'Apr 03, 2025',
          time: '16:45',
          recipient: 'Online Retailer',
          status: 'completed',
          category: 'refund'
        },
        {
          id: 5,
          type: 'debit',
          title: 'Money Sent',
          amount: 500.00,
          date: 'Apr 01, 2025',
          time: '10:22',
          recipient: 'Sarah Johnson',
          status: 'completed',
          category: 'transfer'
        },
        {
          id: 6,
          type: 'debit',
          title: 'Bill Payment',
          amount: 89.95,
          date: 'Mar 28, 2025',
          time: '17:30',
          recipient: 'Utility Company',
          status: 'pending',
          category: 'bill'
        }
      ];
      
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let results = transactions;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             t.recipient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      if (filterType === 'incoming') {
        results = results.filter(t => t.type === 'credit');
      } else if (filterType === 'outgoing') {
        results = results.filter(t => t.type === 'debit');
      } else if (filterType === 'pending') {
        results = results.filter(t => t.status === 'pending');
      }
    }
    
    setFilteredTransactions(results);
  }, [searchTerm, filterType, transactions]);

  const TransactionCard = ({ transaction, index }) => {
    const isCredit = transaction.type === 'credit';
    const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
    const iconColor = isCredit ? 'text-green-500' : 'text-red-500';
    const amountColor = isCredit ? 'text-green-500' : 'text-red-500';
    const amountPrefix = isCredit ? '+' : '-';
    const isPending = transaction.status === 'pending';
    
    return (
      <div 
        className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3 transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-in`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}>
              <Icon className={`${iconColor}`} size={18} />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-800">{transaction.title}</h3>
              <p className="text-sm text-gray-500">{transaction.recipient}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${amountColor}`}>{amountPrefix}${transaction.amount.toFixed(2)}</p>
            <div className="flex items-center text-xs text-gray-500 justify-end">
              <Clock size={12} className="mr-1" />
              <span>{transaction.date} · {transaction.time}</span>
            </div>
          </div>
        </div>
        {isPending && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
            <button className="text-xs text-blue-600 hover:underline">Track</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-blue-100">View and manage your payment activities</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search transactions..."
              className="ml-2 flex-grow bg-transparent outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center ${filterType === 'incoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilterType('incoming')}
              >
                Incoming
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center ${filterType === 'outgoing' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilterType('outgoing')}
              >
                Outgoing
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full flex items-center ${filterType === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setFilterType('pending')}
              >
                Pending
              </button>
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={16} className="mr-1" />
                More Filters
                <ChevronDown size={16} className={`ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {filterOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100 p-3 w-64 z-10 animate-fade-in">
                  <div className="mb-3">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Date Range</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                      <Calendar size={16} className="text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Select dates"
                        className="ml-2 flex-grow bg-transparent outline-none text-gray-700 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Amount</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Min"
                        className="border rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-700 text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="Max"
                        className="border rounded-lg px-3 py-2 bg-gray-50 outline-none text-gray-700 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-sm text-gray-500 mr-2">Reset</button>
                    <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">Apply</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Transactions list */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">Recent Transactions</h2>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading your transactions...</p>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div>
              {filteredTransactions.map((transaction, index) => (
                <TransactionCard 
                  key={transaction.id} 
                  transaction={transaction}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredTransactions.length > 0 && !isLoading && (
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-l-lg text-gray-600 hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-blue-600 border border-blue-600 text-white hover:bg-blue-700">1</button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-r-lg text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        )}
      </main>
    </div>
  );
}