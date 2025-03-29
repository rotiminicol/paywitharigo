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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-fade-in-down"
          >
            <h1 className="text-3xl font-bold mb-2">Spaces</h1>
            <p className="text-purple-300 mb-8">Join live audio conversations on topics you care about</p>
            
            {/* Search Bar */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gray-800 rounded-lg shadow-lg p-2 flex border border-purple-900"
            >
              <div className="flex items-center flex-1 p-2">
                <Search className="text-purple-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Search spaces..."
                  className="w-full outline-none bg-transparent text-gray-200 placeholder-purple-300" 
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-md m-2 transition-colors duration-300"
              >
                Search
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Create Space Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end mb-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-purple-700 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-lg"
          >
            <Plus className="mr-2" size={18} />
            Start a Space
          </motion.button>
        </motion.div>

        {/* Spaces List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {spaces.map(space => (
            <motion.div 
              key={space.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-900 text-purple-400 rounded-md flex items-center justify-center text-xl mr-4">
                    {space.isLive ? (
                      <Mic size={24} className="animate-pulse" />
                    ) : (
                      <Headphones size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{space.title}</h3>
                        <p className="text-purple-300 text-sm">Hosted by {space.host}</p>
                      </div>
                      {space.isLive ? (
                        <motion.span 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="bg-red-900 text-red-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                          LIVE
                        </motion.span>
                      ) : (
                        <span className="bg-gray-700 text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <Calendar size={12} className="mr-1" />
                          Upcoming
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-white font-medium">{space.topic}</p>
                      <div className="flex items-center mt-2 text-sm text-purple-300">
                        <Users size={14} className="mr-1" />
                        {space.listeners.toLocaleString()} {space.isLive ? 'listening' : 'interested'}
                      </div>
                      {space.scheduled && (
                        <div className="flex items-center mt-1 text-sm text-purple-300">
                          <Calendar size={14} className="mr-1" />
                          {space.scheduled}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full ${space.isLive ? 'bg-purple-700 hover:bg-purple-600' : 'bg-purple-900 hover:bg-purple-800'} text-white font-medium py-2 rounded-md transition-all duration-300 flex items-center justify-center shadow-md`}
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