import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiUser, FiPlus } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    { id: 1, username: 'tech_guru', name: 'Sarah Johnson' },
    { id: 2, username: 'design_master', name: 'Alex Chen' },
    { id: 3, username: 'ai_researcher', name: 'Dr. Michael Wong' },
  ]);
  const [suggestedUsers, setSuggestedUsers] = useState([
    { id: 4, username: 'web_dev', name: 'Jamie Smith', isFollowing: false },
    { id: 5, username: 'data_scientist', name: 'Priya Patel', isFollowing: false },
    { id: 6, username: 'ux_designer', name: 'Carlos Mendez', isFollowing: true },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const results = [
      { id: 7, username: 'react_dev', name: 'Taylor Swift', isFollowing: false },
      { id: 8, username: 'tailwind_lover', name: 'Chris Hemsworth', isFollowing: true },
      { id: 9, username: searchQuery.toLowerCase(), name: `${searchQuery} User`, isFollowing: false },
    ];
    
    setSearchResults(results);
    
    if (!recentSearches.some(item => item.username === searchQuery.toLowerCase())) {
      setRecentSearches(prev => [
        { id: Date.now(), username: searchQuery.toLowerCase(), name: `${searchQuery} User` },
        ...prev.slice(0, 2)
      ]);
    }
    setSearchQuery(''); // Clear input after search
  };

  const toggleFollow = (userId) => {
    setSuggestedUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing } 
          : user
      )
    );
    
    setSearchResults(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing } 
          : user
      )
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeRecentSearch = (id) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-3 sm:p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-4 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            Discover People
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-1 sm:mt-2">
            Find and connect with interesting people around the world
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="relative">
            <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username or name..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl py-2 sm:py-3 pl-10 sm:pl-12 pr-8 sm:pr-10 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-3 sm:mt-4 w-full sm:w-auto bg-gradient-to-r from-green-600 to-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow-lg hover:shadow-green-500/20 transition-all duration-300"
          >
            Search
          </motion.button>
        </motion.form>

        {/* Search Results */}
        <AnimatePresence>
          {searchResults.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-300">Search Results</h2>
              <div className="space-y-3 sm:space-y-4">
                {searchResults.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border border-gray-800 hover:border-green-500 transition-colors duration-300"
                  >
                    <div className="flex items-center w-full sm:w-auto">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-purple-600 p-0.5 mr-3 sm:mr-4">
                        <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                          <FiUser className="w-full h-full p-2 text-green-300" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base text-white">{user.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">@{user.username}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFollow(user.id)}
                      className={`flex items-center justify-center space-x-2 px-4 py-1.5 sm:py-2 rounded-full sm:rounded-lg text-sm w-full sm:w-auto ${user.isFollowing ? 'bg-gray-800 text-gray-300' : 'bg-gradient-to-r from-green-600 to-purple-600 text-white'}`}
                    >
                      {user.isFollowing ? (
                        <>
                          <FaHeart className="text-green-500" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <FiPlus />
                          <span>Follow</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 sm:mb-8"
                >
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-green-300">Recent Searches</h2>
                    <button 
                      onClick={() => setRecentSearches([])}
                      className="text-gray-400 hover:text-green-400 text-xs sm:text-sm"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {recentSearches.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 rounded-lg p-2.5 sm:p-3 flex items-center justify-between hover:bg-gray-850 transition-colors duration-300"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-900/50 flex items-center justify-center mr-2 sm:mr-3">
                            <FiUser className="text-green-400 text-sm sm:text-base" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base text-white">{item.name}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">@{item.username}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2">
                          <button
                            onClick={() => setSearchQuery(item.username)}
                            className="text-green-400 hover:text-green-300 p-1"
                          >
                            <FiSearch size={16} />
                          </button>
                          <button
                            onClick={() => removeRecentSearch(item.id)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggested Users */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-300">Suggested for You</h2>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {suggestedUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(34, 197, 94, 0.15)" }}
                      className="bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-800 hover:border-green-500 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-purple-600 p-0.5 mr-3">
                            <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                              <FiUser className="w-full h-full p-2 text-green-300" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base text-white">{user.name}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">@{user.username}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFollow(user.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${user.isFollowing ? 'bg-gray-800 text-green-500' : 'bg-green-600 text-white'}`}
                        >
                          {user.isFollowing ? <FaHeart size={14} /> : <FiPlus size={14} />}
                        </motion.button>
                      </div>
                      <div className="mt-2 sm:mt-3 flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">{Math.floor(Math.random() * 1000)} followers</span>
                        <span className="text-green-400">{Math.floor(Math.random() * 100)} mutuals</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Search;