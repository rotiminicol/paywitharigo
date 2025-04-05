import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Award, Lock, Check, Mail, CreditCard, ChevronRight, Gift, Star, Users, Zap, Sparkles, Lightbulb, AlertCircle, BarChart } from 'lucide-react';

const Monetize = () => {
  const [isEligible, setIsEligible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [earnings, setEarnings] = useState({
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
    pending: 0
  });

  useEffect(() => {
    setTimeout(() => {
      setIsEligible(true);
      setEarnings({
        total: 1243.87,
        thisMonth: 342.51,
        lastMonth: 421.06,
        pending: 124.30
      });
      setLoading(false);
    }, 1500);
  }, []);

  const monetizationOptions = [
    {
      id: 'creator-fund',
      title: 'Creator Fund',
      description: 'Get paid for creating engaging content that resonates with the Ijeuwa community',
      icon: <Award size={24} className="text-green-400" />,
      requirements: [
        'At least 1,000 followers',
        'Posted at least 20 times in the last 30 days',
        'Consistent engagement metrics',
        'Account in good standing'
      ],
      benefits: [
        'Monthly payments based on engagement',
        'Performance bonuses for viral content',
        'Early access to new monetization features'
      ],
      featured: true
    },
    {
      id: 'premium-content',
      title: 'Premium Content',
      description: 'Offer exclusive content to subscribers who pay a monthly fee',
      icon: <Lock size={24} className="text-green-400" />,
      requirements: [
        'At least 500 followers',
        'Verified account',
        'Regular posting schedule',
        'Original content creation'
      ],
      benefits: [
        'Set your own subscription price',
        'Keep 85% of subscription revenue',
        'Analytics to understand subscriber preferences',
        'Tools to manage subscriber relationships'
      ],
      featured: false
    },
    {
      id: 'tips-donations',
      title: 'Tips & Donations',
      description: 'Let your followers support you directly with one-time payments',
      icon: <Gift size={24} className="text-green-400" />,
      requirements: [
        'Verified account',
        'Account in good standing',
        'Complete payment information'
      ],
      benefits: [
        'Receive support directly from your audience',
        'Keep 95% of all tips',
        'Custom thank-you messages',
        'Automatic shout-outs for top supporters'
      ],
      featured: false
    },
    {
      id: 'brand-partnerships',
      title: 'Brand Partnerships',
      description: 'Connect with brands for sponsored content opportunities',
      icon: <Users size={24} className="text-green-400" />,
      requirements: [
        'At least 5,000 followers',
        'Strong engagement metrics',
        'Niche-specific content focus',
        'Professional profile'
      ],
      benefits: [
        'Matched with relevant brands',
        'Negotiation support',
        'Contract templates and tools',
        'Performance analytics for sponsors'
      ],
      featured: true
    }
  ];

  const stats = [
    {
      title: 'Total Earnings',
      value: `$${earnings.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign size={20} className="text-green-400" />
    },
    {
      title: 'This Month',
      value: `$${earnings.thisMonth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '-18.7%',
      isPositive: false,
      icon: <CreditCard size={20} className="text-green-400" />
    },
    {
      title: 'Last Month',
      value: `$${earnings.lastMonth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+5.3%',
      isPositive: true,
      icon: <BarChart size={20} className="text-green-400" />
    },
    {
      title: 'Pending Payout',
      value: `$${earnings.pending.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      info: 'Processes on the 15th',
      icon: <TrendingUp size={20} className="text-green-400" />
    }
  ];

  const chartData = [
    { month: 'Jan', amount: 150 },
    { month: 'Feb', amount: 220 },
    { month: 'Mar', amount: 180 },
    { month: 'Apr', amount: 320 },
    { month: 'May', amount: 280 },
    { month: 'Jun', amount: 410 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'options', label: 'Monetization Options' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Payment Settings' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="animate-pulse">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 animate-bounce">Monetize Your Content</h1>
            <p className="text-green-300 mb-6 md:mb-8">Turn your passion into income with Ijeuwas monetization tools</p>
            
            {/* Tabs - Improved for mobile with animation */}
            <div className="flex overflow-x-auto hide-scrollbar space-x-1 bg-black rounded-lg p-1 border border-purple-800">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all duration-500 whitespace-nowrap flex-shrink-0 transform hover:scale-105 ${
                    activeTab === tab.id 
                      ? 'bg-purple-800 text-white shadow-lg shadow-purple-900/50' 
                      : 'text-gray-300 hover:bg-purple-900/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {loading ? (
          <div className="animate-pulse space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-black rounded-lg shadow-md p-4 md:p-6 h-28 md:h-32 border border-purple-700">
                  <div className="h-4 md:h-5 bg-purple-900/50 rounded w-1/2 mb-3 md:mb-4"></div>
                  <div className="h-6 md:h-8 bg-purple-900/50 rounded w-3/4 mb-2"></div>
                  <div className="h-3 md:h-4 bg-purple-900/50 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="bg-black rounded-lg shadow-md p-4 md:p-6 border border-purple-700">
              <div className="h-5 md:h-6 bg-purple-900/50 rounded w-1/3 mb-4 md:mb-6"></div>
              <div className="h-32 md:h-40 bg-purple-900/50 rounded w-full"></div>
            </div>
          </div>
        ) : isEligible ? (
          <>
            {/* Stats Cards - Improved grid for mobile with animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-black rounded-lg shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-500 border border-purple-700 transform hover:scale-105 animate-fade-in hover:border-green-500"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div className="font-medium text-sm md:text-base text-gray-400">{stat.title}</div>
                    <div className="p-1 md:p-2 bg-purple-900/30 rounded-lg">
                      {React.cloneElement(stat.icon, { size: 16 })}
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  {stat.change && (
                    <div className={`text-xs md:text-sm ${stat.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                      {stat.isPositive ? '+' : ''}{stat.change}
                      <TrendingUp size={14} className={`ml-1 ${stat.isPositive ? '' : 'transform rotate-180'}`} />
                    </div>
                  )}
                  {stat.info && (
                    <div className="text-xs md:text-sm text-gray-400 flex items-center mt-1">
                      <AlertCircle size={12} className="mr-1" />
                      {stat.info}
                    </div>
                  )}
                </div>
              ))}
            </div>
  
            {/* Revenue Chart - Improved for mobile with animations */}
            <div className="bg-black rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-purple-700 transform hover:border-green-500 transition-all duration-500" style={{ animationDelay: '600ms' }}>
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Revenue Overview</h2>
              <div className="relative h-56 md:h-64">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-44 md:h-52">
                  {chartData.map((item, index) => {
                    const heightPercentage = (item.amount / Math.max(...chartData.map(d => d.amount))) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center justify-end" style={{ height: '100%', width: `${100 / chartData.length}%` }}>
                        <div 
                          className="w-3/5 sm:w-4/5 bg-gradient-to-t from-green-600 to-purple-900 rounded-t-lg relative group transition-all duration-500 transform hover:scale-110"
                          style={{ 
                            height: `${heightPercentage}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div className="absolute -top-8 md:-top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-purple-500">
                            ${item.amount}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2 truncate">{item.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
  
            {/* Monetization Options - Improved for mobile with animations */}
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4" style={{ animationDelay: '700ms' }}>Monetization Options</h2>
            <div className="grid grid-cols-1 gap-4 md:gap-6 mb-6 md:mb-8">
              {monetizationOptions.map((option, index) => (
                <div 
                  key={option.id} 
                  className={`bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border ${option.featured ? 'border-green-500' : 'border-purple-700'} transform hover:scale-105`}
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  {option.featured && (
                    <div className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 flex items-center justify-center">
                      <Star size={12} className="mr-1" />
                      Recommended for you
                    </div>
                  )}
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start mb-4 sm:mb-0">
                      <div className="flex-shrink-0 p-2 md:p-3 bg-purple-900/30 rounded-lg mb-3 sm:mb-0 sm:mr-4">
                        {React.cloneElement(option.icon, { size: 20 })}
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-white">{option.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{option.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                          <Lightbulb size={14} className="mr-2 text-green-400" />
                          Requirements
                        </h4>
                        <ul className="text-xs md:text-sm text-gray-400 space-y-1">
                          {option.requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                              <Check size={14} className="mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                          <Sparkles size={14} className="mr-2 text-green-400" />
                          Benefits
                        </h4>
                        <ul className="text-xs md:text-sm text-gray-400 space-y-1">
                          {option.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Check size={14} className="mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-6">
                      <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-green-600 text-white rounded-md font-medium flex items-center justify-center hover:from-purple-700 hover:to-green-700 transition-all duration-500 transform hover:scale-105">
                        Apply Now
                        <ChevronRight size={16} className="ml-1 animate-pulse" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Get Started Section - Improved for mobile with animations */}
            <div className="bg-black rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8 border border-purple-700 transform hover:border-green-500 transition-all duration-500" style={{ animationDelay: '1000ms' }}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Ready to start earning?</h2>
                  <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Complete your payment setup to start receiving funds from your monetization options.</p>
                  <button className="py-2 md:py-3 px-4 md:px-6 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium flex items-center justify-center transition-all duration-500 mx-auto md:mx-0 transform hover:scale-105">
                    <CreditCard size={16} className="mr-2" />
                    Set Up Payment Methods
                  </button>
                </div>
                <div className="flex-shrink-0 bg-purple-900/30 rounded-lg p-4 md:p-6 border border-green-500/30 w-full md:w-auto">
                  <div className="flex flex-col space-y-3 md:space-y-4">
                    <div className="flex items-center text-gray-300 text-sm md:text-base">
                      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-green-800/50 rounded-full flex items-center justify-center mr-2 md:mr-3">
                        <Check size={14} className="text-green-300" />
                      </div>
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm md:text-base">
                      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-green-800/50 rounded-full flex items-center justify-center mr-2 md:mr-3">
                        <Check size={14} className="text-green-300" />
                      </div>
                      <span>Multiple payout options</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm md:text-base">
                      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-green-800/50 rounded-full flex items-center justify-center mr-2 md:mr-3">
                        <Check size={14} className="text-green-300" />
                      </div>
                      <span>Automatic monthly payments</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm md:text-base">
                      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-green-800/50 rounded-full flex items-center justify-center mr-2 md:mr-3">
                        <Check size={14} className="text-green-300" />
                      </div>
                      <span>Detailed earnings reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Creator Tips - Improved for mobile with animations */}
            <div className="bg-gradient-to-r from-purple-900 to-black rounded-lg shadow-lg p-4 md:p-8 text-white border border-green-500/30 transform hover:scale-105 transition-all duration-500" style={{ animationDelay: '1100ms' }}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center justify-center md:justify-start">
                <Zap size={20} className="mr-2 text-green-400" />
                Tips to Maximize Your Earnings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-purple-900/30 p-3 md:p-4 rounded-lg border border-green-500/30 transform hover:scale-105 transition-all duration-300">
                  <h3 className="font-medium mb-2 flex items-center text-sm md:text-base">
                    <Users size={16} className="mr-2 text-green-300" />
                    Grow Your Audience
                  </h3>
                  <p className="text-purple-200 text-xs md:text-sm">Post consistently and engage with your followers to build a loyal audience thats more likely to support you financially.</p>
                </div>
                <div className="bg-purple-900/30 p-3 md:p-4 rounded-lg border border-green-500/30 transform hover:scale-105 transition-all duration-300">
                  <h3 className="font-medium mb-2 flex items-center text-sm md:text-base">
                    <Star size={16} className="mr-2 text-green-300" />
                    Create Quality Content
                  </h3>
                  <p className="text-purple-200 text-xs md:text-sm">Focus on producing high-quality, unique content that provides value to your audience and stands out from the crowd.</p>
                </div>
                <div className="bg-purple-900/30 p-3 md:p-4 rounded-lg border border-green-500/30 sm:col-span-2 md:col-span-1 transform hover:scale-105 transition-all duration-300">
                  <h3 className="font-medium mb-2 flex items-center text-sm md:text-base">
                    <Mail size={16} className="mr-2 text-green-300" />
                    Promote Your Monetization
                  </h3>
                  <p className="text-purple-200 text-xs md:text-sm">Dont be shy about letting your audience know how they can support you. Mention your monetization options in your content.</p>
                </div>
              </div>
              <div className="mt-4 md:mt-6 text-center">
                <a href="#" className="inline-flex items-center text-green-300 text-sm underline hover:text-green-200 transition-colors">
                  Read our full creator earnings guide
                  <ChevronRight size={14} className="ml-1 animate-bounce" />
                </a>
              </div>
            </div>
          </>
        ) : (
          // Not eligible content - Improved for mobile with animations
          <div className="bg-black rounded-lg shadow-lg p-4 md:p-8 text-center max-w-2xl mx-auto border border-purple-700 transform hover:border-red-500 transition-all duration-500">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-red-500/30 animate-pulse">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Youre not eligible for monetization yet</h2>
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">Your account needs to meet certain requirements before you can start monetizing your content.</p>
            <div className="bg-purple-900/10 rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-purple-600">
              <h3 className="text-base md:text-lg font-medium text-white mb-3 md:mb-4">Requirements you need to meet:</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-red-900/30 rounded-full flex items-center justify-center mt-0.5 mr-2 md:mr-3 border border-red-500/30">
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm md:text-base text-gray-300">Account age:</span> At least 30 days old
                    <div className="text-xs md:text-sm text-gray-500">Your account is 18 days old</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-red-900/30 rounded-full flex items-center justify-center mt-0.5 mr-2 md:mr-3 border border-red-500/30">
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm md:text-base text-gray-300">Content posted:</span> At least 10 posts
                    <div className="text-xs md:text-sm text-gray-500">You have 4 posts</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-yellow-900/30 rounded-full flex items-center justify-center mt-0.5 mr-2 md:mr-3 border border-yellow-500/30">
                    <span className="text-yellow-400 text-xs">!</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm md:text-base text-gray-300">Followers:</span> At least 100 followers
                    <div className="text-xs md:text-sm text-gray-500">You have 78 followers</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-green-900/30 rounded-full flex items-center justify-center mt-0.5 mr-2 md:mr-3 border border-green-500/30">
                    <Check size={12} className="text-green-300" />
                  </div>
                  <div>
                    <span className="font-medium text-sm md:text-base text-gray-300">Profile completion:</span> 100% complete
                    <div className="text-xs md:text-sm text-gray-500">Your profile is complete</div>
                  </div>
                </li>
              </ul>
            </div>
            <button className="py-2 md:py-3 px-4 md:px-6 bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white rounded-md font-medium transition-all duration-500 transform hover:scale-105 text-sm md:text-base">
              Learn How to Grow Your Account
            </button>
          </div>
        )}
      </div>
  
      {/* Footer - Improved for mobile with animations */}
      <div className="bg-black mt-8 md:mt-12 py-4 md:py-6 border-t border-purple-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-xs md:text-sm">
          <p>Have questions about monetization? <a href="#" className="text-green-400 hover:text-green-300 hover:underline transition-colors">Check our FAQ</a> or <a href="#" className="text-green-400 hover:text-green-300 hover:underline transition-colors">contact support</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Monetize;