import  { useState, useEffect } from 'react';
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

  // Simulate loading eligibility and data
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

  // Monetization options
  const monetizationOptions = [
    {
      id: 'creator-fund',
      title: 'Creator Fund',
      description: 'Get paid for creating engaging content that resonates with the Ijeuwa community',
      icon: <Award size={24} className="text-yellow-500" />,
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
      icon: <Lock size={24} className="text-purple-500" />,
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
      icon: <Gift size={24} className="text-red-500" />,
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
      icon: <Users size={24} className="text-blue-500" />,
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

  // Monetization stats
  const stats = [
    {
      title: 'Total Earnings',
      value: `$${earnings.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign size={20} className="text-green-500" />
    },
    {
      title: 'This Month',
      value: `$${earnings.thisMonth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '-18.7%',
      isPositive: false,
      icon: <CreditCard size={20} className="text-blue-500" />
    },
    {
      title: 'Last Month',
      value: `$${earnings.lastMonth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      change: '+5.3%',
      isPositive: true,
      icon: <BarChart size={20} className="text-purple-500" />
    },
    {
      title: 'Pending Payout',
      value: `$${earnings.pending.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      info: 'Processes on the 15th',
      icon: <TrendingUp size={20} className="text-yellow-500" />
    }
  ];

  // Sample revenue chart data
  const chartData = [
    { month: 'Jan', amount: 150 },
    { month: 'Feb', amount: 220 },
    { month: 'Mar', amount: 180 },
    { month: 'Apr', amount: 320 },
    { month: 'May', amount: 280 },
    { month: 'Jun', amount: 410 }
  ];

  // Tabs
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'options', label: 'Monetization Options' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Payment Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl font-bold mb-2">Monetize Your Content</h1>
            <p className="text-emerald-100 mb-8">Turn your passion into income with Ijeuwas monetization tools</p>
            
            {/* Tabs */}
            <div className="flex overflow-x-auto space-x-1 bg-white bg-opacity-20 rounded-lg p-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-white text-emerald-700 shadow-sm' 
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading Skeleton
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 h-32">
                  <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="h-40 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ) : isEligible ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-medium text-gray-500">{stat.title}</div>
                    <div className="p-2 bg-gray-100 rounded-lg">{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  {stat.change && (
                    <div className={`text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      {stat.isPositive ? '+' : ''}{stat.change}
                      <TrendingUp size={16} className={`ml-1 ${stat.isPositive ? '' : 'transform rotate-180'}`} />
                    </div>
                  )}
                  {stat.info && (
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <AlertCircle size={14} className="mr-1" />
                      {stat.info}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Overview</h2>
              <div className="relative h-64">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-52">
                  {chartData.map((item, index) => {
                    const heightPercentage = (item.amount / Math.max(...chartData.map(d => d.amount))) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center justify-end" style={{ height: '100%', width: `${100 / chartData.length}%` }}>
                        <div 
                          className="w-4/5 bg-gradient-to-t from-emerald-500 to-blue-500 rounded-t-lg relative group transition-all duration-500"
                          style={{ height: `${heightPercentage}%` }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            ${item.amount}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Monetization Options */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 animate-fade-in" style={{ animationDelay: '300ms' }}>Monetization Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {monetizationOptions.map((option, index) => (
                <div 
                  key={option.id} 
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border ${option.featured ? 'border-emerald-500' : 'border-transparent'} animate-fade-in`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  {option.featured && (
                    <div className="bg-emerald-500 text-white text-xs font-bold uppercase px-3 py-1 flex items-center justify-center">
                      <Star size={12} className="mr-1" />
                      Recommended for you
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4 p-3 bg-gray-100 rounded-lg">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Lightbulb size={16} className="mr-2 text-yellow-500" />
                          Requirements
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {option.requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                              <Check size={16} className="mr-2 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Sparkles size={16} className="mr-2 text-purple-500" />
                          Benefits
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {option.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Check size={16} className="mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-md font-medium flex items-center justify-center hover:from-emerald-600 hover:to-blue-600 transition-all duration-300">
                        Apply Now
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Get Started Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Ready to start earning?</h2>
                  <p className="text-gray-600 mb-6">Complete your payment setup to start receiving funds from your monetization options.</p>
                  <button className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium flex items-center justify-center transition-colors duration-300">
                    <CreditCard size={18} className="mr-2" />
                    Set Up Payment Methods
                  </button>
                </div>
                <div className="flex-shrink-0 bg-emerald-100 rounded-lg p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center text-gray-700">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3">
                        <Check size={16} className="text-emerald-700" />
                      </div>
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3">
                        <Check size={16} className="text-emerald-700" />
                      </div>
                      <span>Multiple payout options</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3">
                        <Check size={16} className="text-emerald-700" />
                      </div>
                      <span>Automatic monthly payments</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3">
                        <Check size={16} className="text-emerald-700" />
                      </div>
                      <span>Detailed earnings reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Tips */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-8 text-white animate-fade-in" style={{ animationDelay: '700ms' }}>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Zap size={24} className="mr-2 text-yellow-300" />
                Tips to Maximize Your Earnings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Users size={18} className="mr-2 text-indigo-200" />
                    Grow Your Audience
                  </h3>
                  <p className="text-indigo-100 text-sm">Post consistently and engage with your followers to build a loyal audience thats more likely to support you financially.</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Star size={18} className="mr-2 text-indigo-200" />
                    Create Quality Content
                  </h3>
                  <p className="text-indigo-100 text-sm">Focus on producing high-quality, unique content that provides value to your audience and stands out from the crowd.</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Mail size={18} className="mr-2 text-indigo-200" />
                    Promote Your Monetization
                  </h3>
                  <p className="text-indigo-100 text-sm">Dont be shy about letting your audience know how they can support you. Mention your monetization options in your content.</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="inline-flex items-center text-white underline hover:text-indigo-200 transition-colors">
                  Read our full creator earnings guide
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </>
        ) : (
          // Not eligible content
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto animate-fade-in">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Youre not eligible for monetization yet</h2>
            <p className="text-gray-600 mb-6">Your account needs to meet certain requirements before you can start monetizing your content.</p>
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Requirements you need to meet:</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-red-600 text-xs">✕</span>
                  </div>
                  <div>
                    <span className="font-medium">Account age:</span> At least 30 days old
                    <div className="text-sm text-gray-500">Your account is 18 days old</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-red-600 text-xs">✕</span>
                  </div>
                  <div>
                    <span className="font-medium">Content posted:</span> At least 10 posts
                    <div className="text-sm text-gray-500">You have 4 posts</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-yellow-600 text-xs">!</span>
                  </div>
                  <div>
                    <span className="font-medium">Followers:</span> At least 100 followers
                    <div className="text-sm text-gray-500">You have 78 followers</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check size={12} className="text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-medium">Profile completion:</span> 100% complete
                    <div className="text-sm text-gray-500">Your profile is complete</div>
                  </div>
                </li>
              </ul>
            </div>
            <button className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-300">
              Learn How to Grow Your Account
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Have questions about monetization? <a href="#" className="text-emerald-600 hover:underline">Check our FAQ</a> or <a href="#" className="text-emerald-600 hover:underline">contact support</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Monetize;