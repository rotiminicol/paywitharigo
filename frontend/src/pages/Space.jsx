import { Mic, Headphones, Calendar, Users, Plus, Search } from 'lucide-react';

const SpacePage = () => {
  const spaces = [
    {
      id: 1,
      title: 'Tech Talk Live',
      host: 'Tech Enthusiasts',
      listeners: 245,
      isLive: true,
      topic: 'The Future of AI',
      scheduled: null
    },
    {
      id: 2,
      title: 'Artist Corner',
      host: 'Digital Artists Community',
      listeners: 132,
      isLive: true,
      topic: 'Digital Painting Techniques',
      scheduled: null
    },
    {
      id: 3,
      title: 'Startup Stories',
      host: 'Founders Network',
      listeners: 0,
      isLive: false,
      topic: 'Bootstrapping to $1M ARR',
      scheduled: 'Tomorrow, 2:00 PM'
    },
    {
      id: 4,
      title: 'Crypto AMA',
      host: 'Blockchain Developers',
      listeners: 0,
      isLive: false,
      topic: 'Ask Me Anything: Web3 Security',
      scheduled: 'Friday, 5:00 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header - Enhanced with animation and gradients */}
      <div className="bg-gradient-to-r from-black via-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="animate-fade-in transition-all duration-500 transform translate-y-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-green-400">Spaces</h1>
            <p className="text-white text-sm md:text-base mb-6 md:mb-8">Join live audio conversations on topics you care about</p>
            
            {/* Search Bar - Enhanced for mobile and desktop */}
            <div className="bg-black/40 backdrop-blur-md rounded-lg shadow-lg p-2 flex flex-col sm:flex-row border border-purple-500 hover:border-green-400 transition-all duration-300">
              <div className="flex items-center flex-1 p-2">
                <Search className="text-green-400 mr-2 w-5 h-5 md:w-auto md:h-auto" size={20} />
                <input 
                  type="text" 
                  placeholder="Search spaces..."
                  className="w-full outline-none bg-transparent text-white placeholder-purple-300 text-sm md:text-base focus:ring-1 focus:ring-green-400 transition-all" 
                />
              </div>
              <button 
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 md:px-6 py-2 rounded-md m-1 md:m-2 text-sm md:text-base w-full sm:w-auto transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Main Content - Enhanced visuals */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Create Space Button - Enhanced for both mobile and desktop */}
        <div className="flex justify-center sm:justify-end mb-6 md:mb-8 animate-fade-in transition-opacity duration-700 delay-300">
          <button 
            className="flex items-center bg-purple-700 hover:bg-purple-600 text-white font-medium px-4 md:px-5 py-2 md:py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 text-sm md:text-base border-l-4 border-green-400 transform hover:scale-105 active:scale-95"
          >
            <Plus className="mr-2 w-5 h-5" />
            Start a Space
          </button>
        </div>
  
        {/* Spaces List - Enhanced with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {spaces.map((space, index) => (
            <div 
              key={space.id}
              className={`animate-fade-slide-up bg-gradient-to-br from-black to-purple-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-purple-800 hover:border-green-400 transform hover:-translate-y-1`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-5 md:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-green-900/50 text-green-400 rounded-md flex items-center justify-center text-xl mr-4">
                    {space.isLive ? (
                      <Mic size={22} className="animate-pulse" />
                    ) : (
                      <Headphones size={22} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0"> 
                    <div className="flex justify-between items-start">
                      <div className="pr-3"> 
                        <h3 className="text-base md:text-lg font-bold text-white truncate">{space.title}</h3>
                        <p className="text-purple-300 text-xs md:text-sm truncate">Hosted by {space.host}</p>
                      </div>
                      {space.isLive ? (
                        <span 
                          className="bg-green-900/50 text-green-400 text-xs font-medium px-2 py-1 rounded-full flex items-center flex-shrink-0 animate-pulse-slow"
                        >
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                          <span className="whitespace-nowrap">LIVE</span>
                        </span>
                      ) : (
                        <span className="bg-purple-900/50 text-purple-300 text-xs font-medium px-2 py-1 rounded-full flex items-center flex-shrink-0">
                          <Calendar size={12} className="mr-1.5" />
                          <span className="whitespace-nowrap">Upcoming</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 md:mt-4">
                      <p className="text-white text-sm md:text-base font-medium truncate">{space.topic}</p>
                      <div className="flex items-center mt-2 text-xs md:text-sm text-purple-300">
                        <Users size={14} className="mr-1.5 flex-shrink-0" />
                        <span className="truncate">{space.listeners.toLocaleString()} {space.isLive ? 'listening' : 'interested'}</span>
                      </div>
                      {space.scheduled && (
                        <div className="flex items-center mt-1.5 text-xs md:text-sm text-purple-300">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span className="truncate">{space.scheduled}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-5 md:mt-6">
                      <button 
                        className={`w-full ${space.isLive ? 'bg-green-600 hover:bg-green-500' : 'bg-purple-700 hover:bg-purple-600'} text-white font-medium py-2 md:py-2.5 rounded-md transition-all duration-300 flex items-center justify-center shadow-md text-sm md:text-base transform hover:scale-102 active:scale-98`}
                      >
                        {space.isLive ? (
                          <>
                            <Headphones size={16} className="mr-2" />
                            Join Space
                          </>
                        ) : (
                          <>
                            <Calendar size={16} className="mr-2" />
                            Set Reminder
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-specific navigation for "dope" mobile experience */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black border-t border-purple-800 p-3 backdrop-blur-lg bg-opacity-90">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center text-green-400">
            <Headphones size={24} />
            <span className="text-xs mt-1">Spaces</span>
          </button>
          <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity">
            <Users size={24} />
            <span className="text-xs mt-1">Following</span>
          </button>
          <button className="flex flex-col items-center p-1 bg-purple-800 rounded-full text-white">
            <Plus size={24} />
          </button>
          <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity">
            <Mic size={24} />
            <span className="text-xs mt-1">Recent</span>
          </button>
          <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity">
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpacePage;