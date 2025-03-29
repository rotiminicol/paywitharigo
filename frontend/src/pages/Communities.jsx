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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">Communities</h1>
            <p className="text-purple-200 mb-8">Connect with like-minded people in specialized groups</p>
            
            {/* Search Bar */}
            <div className="bg-gray-800 border border-purple-500 rounded-lg shadow-lg p-2 flex animate-slide-up" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center flex-1 p-2">
                <Search className="text-purple-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Search communities..."
                  className="w-full outline-none bg-transparent text-white placeholder-purple-300" 
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md m-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Create Community Button */}
        <div className="flex justify-end mb-6 animate-fade-in" style={{animationDelay: "0.4s"}}>
          <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
            <PlusCircle className="mr-2" size={18} />
            Create Community
          </button>
        </div>

        {/* Communities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community, index) => (
            <div 
              key={community.id}
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden animate-fade-in"
              style={{animationDelay: `${0.5 + index * 0.1}s`}}
              onMouseEnter={() => setHoveredCard(community.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 bg-purple-900 text-purple-300 rounded-md flex items-center justify-center text-xl mr-4 transition-all duration-300 ${hoveredCard === community.id ? 'scale-110' : ''}`}>
                    <Users size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">{community.name}</h3>
                        <p className="text-gray-400 text-sm">{community.description}</p>
                      </div>
                      {!community.isPublic && (
                        <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Private
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-xs font-medium bg-purple-900/50 text-purple-300 px-2.5 py-1 rounded-md">
                        <Users size={12} className="mr-1" />
                        {community.members.toLocaleString()} members
                      </span>
                      {community.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs font-medium bg-gray-700 text-gray-300 px-2.5 py-1 rounded-md transition-all duration-300 hover:bg-purple-800 hover:text-purple-200"
                        >
                          <Hash size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <button 
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300 flex items-center hover:underline"
                      >
                        <MessageSquare size={16} className="mr-1" />
                        View Discussions
                      </button>
                      <button 
                        className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${hoveredCard === community.id ? 'animate-pulse' : ''}`}
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
      </div>
      
    
    </div>
  );
};

export default CommunitiesPage;