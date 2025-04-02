import { useState, useEffect } from 'react';
import { Search, Users, UserPlus, Filter, ChevronDown, Star, Bell, X, ChevronRight,  Share2, MoreHorizontal } from 'lucide-react';

const List = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Simulate loading lists
  useEffect(() => {
    setTimeout(() => {
      setLists([
        {
          id: 1,
          name: 'Tech Influencers',
          description: 'Top voices in the tech industry sharing insights and news',
          memberCount: 42,
          isPublic: true,
          owner: 'Sarah Johnson',
          ownerAvatar: '👩‍💻',
          featured: true,
          following: true
        },
        {
          id: 2,
          name: 'Startup Founders',
          description: 'Entrepreneurs building the next big thing',
          memberCount: 128,
          isPublic: true,
          owner: 'Alex Wong',
          ownerAvatar: '🚀',
          featured: false,
          following: true
        },
        {
          id: 3,
          name: 'Design Inspiration',
          description: 'Creative designs and UX insights',
          memberCount: 95,
          isPublic: false,
          owner: 'Miguel Rodriguez',
          ownerAvatar: '🎨',
          featured: true,
          following: false
        },
        {
          id: 4,
          name: 'Web3 Innovators',
          description: 'Leading thinkers in blockchain and decentralized tech',
          memberCount: 67,
          isPublic: true,
          owner: 'Priya Sharma',
          ownerAvatar: '⛓️',
          featured: false,
          following: false
        },
        {
          id: 5,
          name: 'Product Managers',
          description: 'Building better products and discussing strategies',
          memberCount: 112,
          isPublic: true,
          owner: 'Jordan Lee',
          ownerAvatar: '📊',
          featured: true,
          following: true
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'following', label: 'Following' },
    { id: 'featured', label: 'Featured' },
    { id: 'public', label: 'Public' },
    { id: 'private', label: 'Private' }
  ];

  const filteredLists = lists.filter(list => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'following') return list.following;
    if (selectedFilter === 'featured') return list.featured;
    if (selectedFilter === 'public') return list.isPublic;
    if (selectedFilter === 'private') return !list.isPublic;
    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="animate-fade-in-down">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">Lists</h1>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-800 text-white hover:bg-purple-700 font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center transition-colors duration-300 border border-purple-500 text-sm md:text-base"
              >
                <UserPlus size={16} className="mr-1 md:mr-2" />
                <span className="hidden sm:inline">Create List</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>
            <p className="text-purple-200 mb-6 md:mb-8 text-sm md:text-base">Organize your Ijeuwa experience with curated lists</p>
            
            {/* Search Bar */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-2 flex items-center border border-purple-500">
              <Search className="text-purple-400 ml-1 mr-2" size={18} />
              <input 
                type="text" 
                placeholder="Search lists..."
                className="w-full outline-none bg-gray-900 text-white py-1 md:py-2 text-sm md:text-base" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Filter Options */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto custom-scrollbar">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedFilter(option.id)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedFilter === option.id
                    ? 'bg-purple-700 text-white shadow-md transform scale-105'
                    : 'bg-gray-900 text-gray-300 border border-purple-800 hover:border-purple-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center w-full md:w-auto">
            <button className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-gray-900 border border-purple-800 rounded-lg text-gray-300 text-xs md:text-sm font-medium hover:border-purple-600 transition-colors duration-300 w-full md:w-auto justify-center">
              <Filter size={14} className="mr-1 md:mr-2" />
              More Filters
              <ChevronDown size={14} className="ml-1 md:ml-2" />
            </button>
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-3 md:space-y-4">
          {loading ? (
            // Loading Skeleton
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900 rounded-lg shadow-md p-4 md:p-6 border border-gray-800">
                  <div className="flex items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full mr-3 md:mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 md:h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                      <div className="h-3 md:h-4 bg-gray-800 rounded w-2/4 mb-3"></div>
                      <div className="h-3 md:h-4 bg-gray-800 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredLists.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {filteredLists.map((list, index) => (
                  <div 
                    key={list.id}
                    className="bg-gray-900 rounded-lg shadow-md hover:shadow-purple-900/30 transition-all duration-300 overflow-hidden group animate-fade-in border border-gray-800 hover:border-purple-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-900 text-purple-300 rounded-full flex items-center justify-center text-lg md:text-xl mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300">
                          {list.ownerAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="overflow-hidden">
                              <div className="flex items-center truncate">
                                <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 truncate">
                                  {list.name}
                                </h3>
                                {list.featured && (
                                  <span className="ml-1 md:ml-2 bg-purple-900 text-purple-300 text-xs font-medium px-1.5 py-0.5 md:px-2.5 rounded-full flex items-center whitespace-nowrap">
                                    <Star size={10} className="mr-0.5 md:mr-1" />
                                    <span className="hidden sm:inline">Featured</span>
                                  </span>
                                )}
                                {!list.isPublic && (
                                  <span className="ml-1 md:ml-2 bg-gray-800 text-gray-300 text-xs font-medium px-1.5 py-0.5 md:px-2.5 rounded-full flex items-center whitespace-nowrap">
                                    <span className="hidden sm:inline">Private</span>
                                    <span className="sm:hidden">🔒</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-xs md:text-sm truncate">By {list.owner}</p>
                            </div>
                            <div className="flex items-center ml-2">
                              <button className="text-gray-500 hover:text-purple-400 transition-colors duration-300 p-0.5 md:p-1">
                                <Share2 size={16} />
                              </button>
                              <button className="text-gray-500 hover:text-purple-400 transition-colors duration-300 p-0.5 md:p-1 ml-0.5 md:ml-1">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <p className="mt-1 md:mt-2 text-gray-400 text-sm md:text-base line-clamp-2">{list.description}</p>
                          
                          <div className="mt-3 md:mt-4 flex justify-between items-center">
                            <div className="flex items-center text-gray-500 text-xs md:text-sm">
                              <Users size={14} className="mr-0.5 md:mr-1" />
                              {list.memberCount} members
                            </div>
                            
                            <button 
                              className={`px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center transition-all duration-300 ${
                                list.following 
                                  ? 'bg-purple-900 text-purple-300 hover:bg-purple-800'
                                  : 'bg-purple-700 text-white hover:bg-purple-600'
                              }`}
                            >
                              {list.following ? (
                                <>
                                  <Bell size={12} className="mr-0.5 md:mr-1" />
                                  <span className="hidden sm:inline">Following</span>
                                  <span className="sm:hidden">✓</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus size={12} className="mr-0.5 md:mr-1" />
                                  Follow
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="mt-2 md:mt-3 flex justify-end">
                            <button className="text-purple-400 font-medium text-xs md:text-sm flex items-center hover:text-purple-300 transition-colors duration-300">
                              View List
                              <ChevronRight size={14} className="ml-0.5 md:ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
                <div className="text-3xl mb-3 md:mb-4">📋</div>
                <h3 className="text-base md:text-lg font-medium text-white mb-1 md:mb-2">No lists found</h3>
                <p className="text-gray-400 text-sm md:text-base">Try adjusting your search filters</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 bg-purple-700 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-300 flex items-center mx-auto"
                >
                  <UserPlus size={16} className="mr-1 md:mr-2" />
                  Create New List
                </button>
              </div>
            )
          )}
        </div>
        
        {/* Create New List CTA */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-purple-900/30 to-purple-600/30 rounded-xl p-4 md:p-6 border border-purple-900 animate-fade-in">
          <div className="flex flex-col items-center text-center md:text-left md:flex-row justify-between">
            <div className="mb-3 md:mb-0">
              <h3 className="text-base md:text-lg font-semibold text-white mb-1">Create your own lists</h3>
              <p className="text-gray-400 text-sm md:text-base">Curate content from your favorites</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-700 hover:bg-purple-600 text-white font-medium px-4 py-2 md:px-6 md:py-3 rounded-md transition-colors duration-300 flex items-center text-sm md:text-base"
            >
              <UserPlus size={16} className="mr-1 md:mr-2" />
              Create New List
            </button>
          </div>
        </div>
      </div>

      {/* Create List Modal - Mobile Optimized */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full animate-fade-in-up border border-purple-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h3 className="text-lg md:text-xl font-semibold text-white">Create New List</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-300 text-sm md:text-base font-medium mb-1 md:mb-2">List Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-white text-sm md:text-base" 
                  placeholder="E.g., Tech News"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-300 text-sm md:text-base font-medium mb-1 md:mb-2">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 md:h-24 bg-gray-800 text-white text-sm md:text-base" 
                  placeholder="What's this list about?"
                ></textarea>
              </div>
              <div className="mb-4 md:mb-4">
                <label className="block text-gray-300 text-sm md:text-base font-medium mb-1 md:mb-2">Privacy</label>
                <div className="flex space-x-3 md:space-x-4">
                  <label className="flex items-center text-gray-300 text-sm md:text-base">
                    <input type="radio" name="privacy" className="mr-2 accent-purple-600" defaultChecked />
                    <span>Public</span>
                  </label>
                  <label className="flex items-center text-gray-300 text-sm md:text-base">
                    <input type="radio" name="privacy" className="mr-2 accent-purple-600" />
                    <span>Private</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-gray-800 bg-gray-900 flex justify-end rounded-b-lg sticky bottom-0">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 md:px-4 md:py-2 border border-gray-700 text-gray-300 rounded-md mr-2 hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base"
              >
                Cancel
              </button>
              <button className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 text-sm md:text-base">
                Create List
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default List;