import React, { useState } from 'react';
import { Wallet, PiggyBank, TrendingUp, DollarSign, Calendar, Plus, Trash2 } from 'lucide-react';

const Savings = () => {
  const [goal, setGoal] = useState(10000);
  const [current, setCurrent] = useState(2500);
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 500, date: '2025-04-01', description: 'Monthly deposit' },
    { id: 2, amount: 1000, date: '2025-03-15', description: 'Bonus savings' },
    { id: 3, amount: 1000, date: '2025-02-15', description: 'Initial deposit' }
  ]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const progress = Math.min(Math.round((current / goal) * 100), 100);
  const remaining = goal - current;
  const monthsToGoal = Math.ceil(remaining / 500); // Assuming $500 monthly savings

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) return;
    
    const transaction = {
      id: transactions.length + 1,
      amount: parseFloat(newTransaction.amount),
      date: newTransaction.date,
      description: newTransaction.description
    };
    
    setTransactions([transaction, ...transactions]);
    setCurrent(current + transaction.amount);
    setNewTransaction({ amount: '', description: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleRemoveTransaction = (id, amount) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setCurrent(current - amount);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <PiggyBank className="mr-2 text-blue-600" />
          Savings Tracker
        </h1>
        <div className="text-sm text-gray-500">Last updated: April 10, 2025</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center text-gray-500 mb-1">
            <Wallet className="mr-2 h-4 w-4" />
            <span>Current Savings</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">${current.toLocaleString()}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center text-gray-500 mb-1">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Savings Goal</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">${goal.toLocaleString()}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center text-gray-500 mb-1">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Estimated Goal Date</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{monthsToGoal} months</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Progress toward goal</span>
          <span className="text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          ${remaining.toLocaleString()} remaining to reach your goal
        </div>
      </div>

      {/* Add Transaction */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium mb-3">Add New Transaction</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="pl-8 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              className="p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Description"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
              className="p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleAddTransaction}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium p-4 border-b">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">${transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleRemoveTransaction(transaction.id, transaction.amount)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Savings;