import { Search, Users, Hash, PlusCircle, MessageSquare } from 'lucide-react';

const CommunitiesPage = () => {
  const communities = [
    {
      id: 1,
      name: 'Tech Enthusiasts',
      members: 1250,
      tags: ['Technology', 'Programming', 'Innovation'],
      isPublic: true,
      description: 'Discuss the latest in tech and programming'
    },
    {
      id: 2,
      name: 'Digital Artists',
      members: 842,
      tags: ['Art', 'Design', 'Creativity'],
      isPublic: true,
      description: 'Showcase and discuss digital artwork'
    },
    {
      id: 3,
      name: 'Startup Founders',
      members: 356,
      tags: ['Entrepreneurship', 'Business', 'Startups'],
      isPublic: false,
      description: 'Network with fellow entrepreneurs'
    },
    {
      id: 4,
      name: 'Blockchain Developers',
      members: 723,
      tags: ['Blockchain', 'Web3', 'Crypto'],
      isPublic: true,
      description: 'Everything about blockchain technology'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl font-bold mb-2">Communities</h1>
            <p className="text-blue-100 mb-8">Connect with like-minded people in specialized groups</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex">
              <div className="flex items-center flex-1 p-2">
                <Search className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Search communities..."
                  className="w-full outline-none text-gray-700" 
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md m-2 transition-colors duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Create Community Button */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300">
            <PlusCircle className="mr-2" size={18} />
            Create Community
          </button>
        </div>

        {/* Communities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map(community => (
            <div 
              key={community.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center text-xl mr-4">
                    <Users size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                        <p className="text-gray-600 text-sm">{community.description}</p>
                      </div>
                      {!community.isPublic && (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Private
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                        <Users size={12} className="mr-1" />
                        {community.members.toLocaleString()} members
                      </span>
                      {community.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                          <Hash size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300 flex items-center">
                        <MessageSquare size={16} className="mr-1" />
                        View Discussions
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-300">
                        Join
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

export default CommunitiesPage;