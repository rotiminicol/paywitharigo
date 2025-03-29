import { useState, useEffect } from 'react';
import { Search, Users, UserPlus, Filter, ChevronDown, Star, Bell, X, ChevronRight, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

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
    { id: 'all', label: 'All Lists' },
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
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-in-down">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Lists</h1>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-800 text-white hover:bg-purple-700 font-medium px-4 py-2 rounded-full flex items-center transition-colors duration-300 border border-purple-500"
              >
                <UserPlus size={18} className="mr-2" />
                Create List
              </button>
            </div>
            <p className="text-purple-200 mb-8">Organize your Ijeuwa experience with curated lists of accounts</p>
            
            {/* Search Bar */}
            <div className="bg-gray-900 rounded-lg shadow-lg p-2 flex items-center border border-purple-500">
              <Search className="text-purple-400 ml-2 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search for lists by name, description, or creator"
                className="w-full outline-none bg-gray-900 text-white py-2" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Options */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === option.id
                    ? 'bg-purple-700 text-white shadow-md transform scale-105'
                    : 'bg-gray-900 text-gray-300 border border-purple-800 hover:border-purple-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center px-4 py-2 bg-gray-900 border border-purple-800 rounded-lg text-gray-300 text-sm font-medium hover:border-purple-600 transition-colors duration-300">
              <Filter size={16} className="mr-2" />
              More Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-4">
          {loading ? (
            // Loading Skeleton
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-800 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-2/4 mb-3"></div>
                      <div className="h-4 bg-gray-800 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredLists.length > 0 ? (
              <div className="space-y-4">
                {filteredLists.map((list, index) => (
                  <div 
                    key={list.id}
                    className="bg-gray-900 rounded-lg shadow-md hover:shadow-purple-900/30 transition-all duration-300 overflow-hidden group animate-fade-in border border-gray-800 hover:border-purple-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-900 text-purple-300 rounded-full flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          {list.ownerAvatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                                  {list.name}
                                </h3>
                                {list.featured && (
                                  <span className="ml-2 bg-purple-900 text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                    <Star size={12} className="mr-1" />
                                    Featured
                                  </span>
                                )}
                                {!list.isPublic && (
                                  <span className="ml-2 bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                    Private
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm">By {list.owner}</p>
                            </div>
                            <div className="flex items-center">
                              <button className="text-gray-500 hover:text-purple-400 transition-colors duration-300 p-1">
                                <Share2 size={18} />
                              </button>
                              <button className="text-gray-500 hover:text-purple-400 transition-colors duration-300 p-1 ml-1">
                                <Bookmark size={18} />
                              </button>
                              <button className="text-gray-500 hover:text-purple-400 transition-colors duration-300 p-1 ml-1">
                                <MoreHorizontal size={18} />
                              </button>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-gray-400">{list.description}</p>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Users size={16} className="mr-1" />
                              {list.memberCount} members
                            </div>
                            
                            <button 
                              className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center transition-all duration-300 ${
                                list.following 
                                  ? 'bg-purple-900 text-purple-300 hover:bg-purple-800'
                                  : 'bg-purple-700 text-white hover:bg-purple-600'
                              }`}
                            >
                              {list.following ? (
                                <>
                                  <Bell size={14} className="mr-1" />
                                  Following
                                </>
                              ) : (
                                <>
                                  <UserPlus size={14} className="mr-1" />
                                  Follow
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="mt-3 flex justify-end">
                            <button className="text-purple-400 font-medium text-sm flex items-center hover:text-purple-300 transition-colors duration-300">
                              View List
                              <ChevronRight size={16} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900 rounded-lg shadow border border-gray-800">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-white mb-2">No lists found</h3>
                <p className="text-gray-400">Try adjusting your search filters or create a new list</p>
              </div>
            )
          )}
        </div>
        
        {/* Create New List CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-purple-600/30 rounded-xl p-6 border border-purple-900 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-1">Create your own personalized lists</h3>
              <p className="text-gray-400">Curate content from your favorite creators and topics</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-700 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 flex items-center"
            >
              <UserPlus size={18} className="mr-2" />
              Create New List
            </button>
          </div>
        </div>
      </div>

      {/* Create List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full animate-fade-in-up border border-purple-800">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">Create New List</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">List Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-white" 
                  placeholder="E.g., Tech News, Favorite Creators"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 bg-gray-800 text-white" 
                  placeholder="What's this list about?"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Privacy</label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-gray-300">
                    <input type="radio" name="privacy" className="mr-2 accent-purple-600" defaultChecked />
                    <span>Public</span>
                  </label>
                  <label className="flex items-center text-gray-300">
                    <input type="radio" name="privacy" className="mr-2 accent-purple-600" />
                    <span>Private</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-800 bg-gray-900 flex justify-end rounded-b-lg">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md mr-2 hover:bg-gray-800 transition-colors duration-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors duration-300">
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