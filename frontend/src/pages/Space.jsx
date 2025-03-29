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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl font-bold mb-2">Spaces</h1>
            <p className="text-purple-100 mb-8">Join live audio conversations on topics you care about</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex">
              <div className="flex items-center flex-1 p-2">
                <Search className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Search spaces..."
                  className="w-full outline-none text-gray-700" 
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md m-2 transition-colors duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Create Space Button */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300">
            <Plus className="mr-2" size={18} />
            Start a Space
          </button>
        </div>

        {/* Spaces List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.map(space => (
            <div 
              key={space.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center text-xl mr-4">
                    {space.isLive ? (
                      <Mic size={24} className="animate-pulse" />
                    ) : (
                      <Headphones size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{space.title}</h3>
                        <p className="text-gray-600 text-sm">Hosted by {space.host}</p>
                      </div>
                      {space.isLive ? (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                          LIVE
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <Calendar size={12} className="mr-1" />
                          Upcoming
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-gray-800 font-medium">{space.topic}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Users size={14} className="mr-1" />
                        {space.listeners.toLocaleString()} {space.isLive ? 'listening' : 'interested'}
                      </div>
                      {space.scheduled && (
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {space.scheduled}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <button className={`w-full ${space.isLive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-pink-600 hover:bg-pink-700'} text-white font-medium py-2 rounded-md transition-colors duration-300 flex items-center justify-center`}>
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
    </div>
  );
};

export default SpacePage;