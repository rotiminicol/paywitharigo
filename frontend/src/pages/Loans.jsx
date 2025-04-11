import { useState } from 'react';

export default function Loan() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateLoan = () => {
    // Convert annual interest rate to monthly
    const monthlyInterestRate = interestRate / 100 / 12;
    
    // Calculate monthly payment using the loan formula
    const monthlyPaymentValue = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / 
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    
    const totalPaymentValue = monthlyPaymentValue * loanTerm;
    const totalInterestValue = totalPaymentValue - loanAmount;
    
    setMonthlyPayment(monthlyPaymentValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Loan Calculator</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-blue-800 font-medium mb-2">Loan Amount ($)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 font-medium mb-2">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 font-medium mb-2">Loan Term (months)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button 
          onClick={calculateLoan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
        >
          Calculate
        </button>
        
        {monthlyPayment > 0 && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Loan Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-700 font-medium">Monthly Payment:</p>
                <p className="text-xl font-bold">${monthlyPayment}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Total Payment:</p>
                <p className="text-xl font-bold">${totalPayment}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Total Interest:</p>
                <p className="text-xl font-bold">${totalInterest}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Principal Amount:</p>
                <p className="text-xl font-bold">${loanAmount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}