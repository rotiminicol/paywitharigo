import { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const ArigoPayCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  
  const cards = [
    {
      type: 'Platinum',
      number: '•••• •••• •••• 4291',
      holder: 'ALEX MORGAN',
      expiry: '09/28',
      gradient: 'bg-gradient-to-br from-slate-700 to-slate-900',
      logo: 'ARIGO PLATINUM',
      status: 'active'
    },
    {
      type: 'Gold',
      number: '•••• •••• •••• 7634',
      holder: 'ALEX MORGAN',
      expiry: '11/27',
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-700',
      logo: 'ARIGO GOLD',
      status: 'active'
    },
    {
      type: 'Business',
      number: '•••• •••• •••• 1082',
      holder: 'ALEX MORGAN',
      expiry: '05/26',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      logo: 'ARIGO BUSINESS',
      status: 'inactive'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Arigo Pay Cards</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 ${
              activeCard === index ? 'scale-105' : 'hover:scale-105'
            }`}
            onClick={() => setActiveCard(index)}
          >
            {/* Credit Card */}
            <div className={`${card.gradient} rounded-xl p-4 h-48 flex flex-col justify-between`}>
              <div className="flex justify-between items-start">
                <div className="font-bold text-white text-xs tracking-widest opacity-80">
                  {card.logo}
                </div>
                <CreditCard className="text-white opacity-80" size={20} />
              </div>
              
              <div className="font-mono text-lg text-white mt-4">
                {card.number}
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="text-xs text-white">
                  <div className="opacity-70 mb-1">CARD HOLDER</div>
                  <div>{card.holder}</div>
                </div>
                <div className="text-xs text-white">
                  <div className="opacity-70 mb-1">EXPIRES</div>
                  <div>{card.expiry}</div>
                </div>
              </div>
            </div>
            
            {/* Card Info */}
            <div className="bg-white p-4 rounded-b-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{card.type} Card</h3>
                  <p className="text-xs text-gray-500">Last used 2 days ago</p>
                </div>
                <div className="flex items-center">
                  {card.status === 'active' ? (
                    <CheckCircle className="text-green-500" size={18} />
                  ) : (
                    <AlertCircle className="text-red-500" size={18} />
                  )}
                  <span className={`ml-1 text-xs ${card.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                    {card.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Card Details Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">{cards[activeCard].type} Card Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Card Number</dt>
                <dd className="font-mono">{cards[activeCard].number}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Name on Card</dt>
                <dd>{cards[activeCard].holder}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Expiry Date</dt>
                <dd>{cards[activeCard].expiry}</dd>
              </div>
            </dl>
          </div>
          <div>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Status</dt>
                <dd className="flex items-center">
                  {cards[activeCard].status === 'active' ? (
                    <>
                      <CheckCircle className="text-green-500 mr-1" size={16} />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-red-500 mr-1" size={16} />
                      <span>Inactive</span>
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Spending Limit</dt>
                <dd>{cards[activeCard].type === 'Platinum' ? '$25,000' : cards[activeCard].type === 'Gold' ? '$10,000' : '$15,000'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Card Type</dt>
                <dd>{cards[activeCard].type}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition">
            Freeze Card
          </button>
          <button className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
            Manage Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArigoPayCards;