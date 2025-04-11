import  { useState } from 'react';

const Investment = () => {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(10);
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const calculateInvestment = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    let balance = initialAmount;
    
    // Calculate compound interest with monthly contributions
    for (let i = 0; i < totalMonths; i++) {
      // Add monthly contribution
      balance += monthlyContribution;
      // Apply monthly interest
      balance *= (1 + monthlyRate);
    }
    
    const totalContributionsValue = initialAmount + (monthlyContribution * totalMonths);
    const earningsValue = balance - totalContributionsValue;
    
    setFinalBalance(balance.toFixed(2));
    setTotalContributions(totalContributionsValue.toFixed(2));
    setTotalEarnings(earningsValue.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Investment Calculator</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-blue-800 font-medium mb-2">Initial Investment ($)</label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 font-medium mb-2">Monthly Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 font-medium mb-2">Annual Return (%)</label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 font-medium mb-2">Time Period (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button 
          onClick={calculateInvestment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
        >
          Calculate
        </button>
        
        {finalBalance > 0 && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Investment Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-700 font-medium">Final Balance:</p>
                <p className="text-xl font-bold">${finalBalance}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Total Contributions:</p>
                <p className="text-xl font-bold">${totalContributions}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Total Earnings:</p>
                <p className="text-xl font-bold">${totalEarnings}</p>
              </div>
              <div>
                <p className="text-blue-700 font-medium">Initial Investment:</p>
                <p className="text-xl font-bold">${initialAmount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Investment;