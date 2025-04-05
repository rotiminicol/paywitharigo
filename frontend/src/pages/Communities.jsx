import { Search, Users, Hash, PlusCircle, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const CommunitiesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="animate-pulse">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500">
              Communities
            </h1>
            <p className="text-green-300 mb-8 text-base">
              Connect with like-minded people in specialized groups
            </p>
            
            {/* Search Bar */}
            <div className="bg-black border border-green-500 rounded-lg shadow-lg flex flex-col sm:flex-row animate-bounce duration-1000" 
                 style={{animationDuration: "4s"}}>
              <div className="flex items-center flex-1 p-3">
                <Search className="text-green-400 mr-2" size={18} />
                <input 
                  type="text" 
                  placeholder="Search communities..."
                  className="w-full outline-none bg-transparent text-white placeholder-green-300 text-base" 
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md m-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 text-base">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Create Community Button */}
        <div className="flex justify-end mb-6 animate-pulse" style={{animationDuration: "2s"}}>
          <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 text-base">
            <PlusCircle className="mr-2" size={16} />
            Create Community
          </button>
        </div>

        {/* Communities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div 
              key={community.id}
              className="bg-gray-900 border-2 border-purple-700 rounded-lg shadow-md hover:shadow-xl hover:shadow-green-500/20 transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(community.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 bg-green-900 text-green-300 rounded-md flex items-center justify-center text-xl mr-4 transition-all duration-500 ${hoveredCard === community.id ? 'rotate-12 scale-110' : ''}`}>
                    <Users size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-purple-300 truncate">
                          {community.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {community.description}
                        </p>
                      </div>
                      {!community.isPublic && (
                        <span className="bg-black text-purple-300 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2 border border-purple-500">
                          Private
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-xs font-medium bg-green-900/50 text-green-300 px-3 py-1 rounded-md">
                        <Users size={12} className="mr-1" />
                        {community.members.toLocaleString()} members
                      </span>
                      {community.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs font-medium bg-purple-900/50 text-purple-300 px-3 py-1 rounded-md transition-all duration-300 hover:bg-purple-800 hover:text-white"
                        >
                          <Hash size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <button 
                        className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors duration-300 flex items-center hover:underline"
                      >
                        <MessageSquare size={16} className="mr-1" />
                        View Discussions
                      </button>
                      <button 
                        className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${hoveredCard === community.id ? 'animate-pulse' : ''}`}
                        style={{animationDuration: "1.5s"}}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Specific Navigation - Appears only on small screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-purple-800 py-3 px-4 flex justify-around items-center animate-slide-up">
          <button className="flex flex-col items-center text-green-400">
            <Users size={20} />
            <span className="text-xs mt-1">Communities</span>
          </button>
          <button className="flex flex-col items-center text-purple-400">
            <MessageSquare size={20} />
            <span className="text-xs mt-1">Messages</span>
          </button>
          <button className="flex flex-col items-center text-purple-400">
            <Search size={20} />
            <span className="text-xs mt-1">Discover</span>
          </button>
          <button className="flex flex-col items-center text-purple-400">
            <PlusCircle size={20} />
            <span className="text-xs mt-1">Create</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage;