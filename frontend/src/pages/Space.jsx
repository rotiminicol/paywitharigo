import { Mic, Headphones, Calendar, Users, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header - Responsive optimization */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-fade-in-down"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Spaces</h1>
            <p className="text-purple-300 text-sm md:text-base mb-4 md:mb-8">Join live audio conversations on topics you care about</p>
            
            {/* Search Bar - Mobile optimized */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gray-800 rounded-lg shadow-lg p-1 md:p-2 flex flex-col sm:flex-row border border-purple-900"
            >
              <div className="flex items-center flex-1 p-2">
                <Search className="text-purple-400 mr-2 w-5 h-5 md:w-auto md:h-auto" size={20} />
                <input 
                  type="text" 
                  placeholder="Search spaces..."
                  className="w-full outline-none bg-transparent text-gray-200 placeholder-purple-300 text-sm md:text-base" 
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-4 md:px-6 py-2 rounded-md m-1 md:m-2 text-sm md:text-base w-full sm:w-auto transition-colors duration-300"
              >
                Search
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Create Space Button - Optimized for mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center sm:justify-end mb-4 md:mb-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-purple-700 hover:bg-purple-600 text-white font-medium px-3 md:px-4 py-2 rounded-lg transition-all duration-300 shadow-lg text-sm md:text-base"
          >
            <Plus className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
            Start a Space
          </motion.button>
        </motion.div>
  
        {/* Spaces List - Single column on mobile, two columns on larger screens */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {spaces.map(space => (
            <motion.div 
              key={space.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700"
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-900 text-purple-400 rounded-md flex items-center justify-center text-xl mr-3 md:mr-4">
                    {space.isLive ? (
                      <Mic size={20} className="animate-pulse" />
                    ) : (
                      <Headphones size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0"> {/* Prevent content overflow */}
                    <div className="flex justify-between items-start">
                      <div className="pr-2"> {/* Add padding to prevent overlap with badge */}
                        <h3 className="text-base md:text-lg font-semibold text-white truncate">{space.title}</h3>
                        <p className="text-purple-300 text-xs md:text-sm truncate">Hosted by {space.host}</p>
                      </div>
                      {space.isLive ? (
                        <motion.span 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="bg-red-900 text-red-300 text-xs font-medium px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded-full flex items-center flex-shrink-0"
                        >
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                          <span className="whitespace-nowrap">LIVE</span>
                        </motion.span>
                      ) : (
                        <span className="bg-gray-700 text-purple-300 text-xs font-medium px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded-full flex items-center flex-shrink-0">
                          <Calendar size={10} className="mr-1" />
                          <span className="whitespace-nowrap">Upcoming</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 md:mt-3">
                      <p className="text-white text-sm md:text-base font-medium truncate">{space.topic}</p>
                      <div className="flex items-center mt-1 md:mt-2 text-xs md:text-sm text-purple-300">
                        <Users size={12} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{space.listeners.toLocaleString()} {space.isLive ? 'listening' : 'interested'}</span>
                      </div>
                      {space.scheduled && (
                        <div className="flex items-center mt-1 text-xs md:text-sm text-purple-300">
                          <Calendar size={12} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{space.scheduled}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 md:mt-6">
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full ${space.isLive ? 'bg-purple-700 hover:bg-purple-600' : 'bg-purple-900 hover:bg-purple-800'} text-white font-medium py-1.5 md:py-2 rounded-md transition-all duration-300 flex items-center justify-center shadow-md text-sm md:text-base`}
                      >
                        {space.isLive ? (
                          <>
                            <Headphones size={14} className="mr-1.5 md:mr-2" />
                            Join Space
                          </>
                        ) : (
                          <>
                            <Calendar size={14} className="mr-1.5 md:mr-2" />
                            Set Reminder
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SpacePage;