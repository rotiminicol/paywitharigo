import { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter, ChevronDown, Star, BookOpen, Zap, Users } from 'lucide-react';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: 'UX Designer',
          company: 'Ijeuwa Technologies',
          location: 'Remote',
          type: 'Full-time',
          salary: '$80k - $95k',
          posted: '2 days ago',
          featured: true,
          logo: '🎨',
          skills: ['Figma', 'UI/UX', 'Prototyping']
        },
        {
          id: 2,
          title: 'Frontend Developer',
          company: 'Ijeuwa Social',
          location: 'San Francisco',
          type: 'Contract',
          salary: '$70 - $90/hr',
          posted: '1 day ago',
          featured: true,
          logo: '💻',
          skills: ['React', 'Tailwind', 'TypeScript']
        },
        {
          id: 3,
          title: 'Backend Engineer',
          company: 'Ijeuwa Network',
          location: 'New York',
          type: 'Full-time',
          salary: '$110k - $140k',
          posted: '3 days ago',
          featured: false,
          logo: '🛠️',
          skills: ['Node.js', 'MongoDB', 'AWS']
        },
        {
          id: 4,
          title: 'Social Media Manager',
          company: 'Ijeuwa Marketing',
          location: 'Remote',
          type: 'Part-time',
          salary: '$45k - $55k',
          posted: '5 days ago',
          featured: false,
          logo: '📱',
          skills: ['Content Creation', 'Analytics', 'Campaign Management']
        },
        {
          id: 5,
          title: 'Product Manager',
          company: 'Ijeuwa Product',
          location: 'Austin',
          type: 'Full-time',
          salary: '$120k - $150k',
          posted: '6 hours ago',
          featured: true,
          logo: '📊',
          skills: ['Roadmapping', 'User Research', 'Agile']
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filterOptions = [
    { id: 'all', label: 'All Jobs' },
    { id: 'featured', label: 'Featured' },
    { id: 'remote', label: 'Remote' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'recent', label: 'Recently Added' }
  ];

  const filteredJobs = jobs.filter(job => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'featured') return job.featured;
    if (selectedFilter === 'remote') return job.location === 'Remote';
    if (selectedFilter === 'full-time') return job.type === 'Full-time';
    if (selectedFilter === 'recent') return job.posted.includes('day') && parseInt(job.posted) <= 2;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with animated gradient background */}
      <div className="bg-gradient-to-r from-purple-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(76,29,149,0.4),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(22,163,74,0.3),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">Find Your Dream Job at Ijeuwa</h1>
            <p className="text-purple-200 mb-6 md:mb-8">Join our growing social network and build the future of communication</p>
            
            {/* Search Bar with subtle animation */}
            <div className="bg-black/70 backdrop-blur-sm rounded-lg shadow-xl p-3 flex flex-col border border-purple-500/40 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center flex-1 p-2 border-b border-green-500/40 group transition-all duration-500">
                <Search className="text-green-400 mr-2 flex-shrink-0 group-hover:scale-110 transition-all duration-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-purple-300 focus:placeholder-green-300 transition-colors duration-300" 
                />
              </div>
              <div className="flex items-center flex-1 p-2 border-b border-green-500/40 group transition-all duration-500">
                <MapPin className="text-green-400 mr-2 flex-shrink-0 group-hover:scale-110 transition-all duration-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Location or Remote"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-purple-300 focus:placeholder-green-300 transition-colors duration-300" 
                />
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-md mt-3 transition-all duration-300 w-full shadow-lg transform hover:scale-[1.02] active:scale-95">
                Find Jobs
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated separator */}
        <div className="h-4 bg-gradient-to-r from-purple-600 via-green-500 to-purple-600 relative">
          <div className="absolute top-0 left-0 right-0 h-full bg-black">
            <svg className="w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-black"></path>
            </svg>
          </div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Filter Options with animation */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-black -mx-2 px-2">
              {filterOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    selectedFilter === option.id
                      ? 'bg-gradient-to-r from-purple-600 to-green-600 text-white shadow-md shadow-green-500/20 transform scale-105'
                      : 'bg-black text-gray-300 border border-purple-500/40 hover:border-green-500'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-black border border-purple-500/40 rounded-lg text-gray-300 text-sm font-medium hover:border-green-500 transition-all duration-300 w-full justify-center group"
              >
                <Filter size={16} className="mr-2 text-purple-400 group-hover:text-green-400 transition-colors duration-300" />
                More Filters
                <ChevronDown 
                  size={16} 
                  className={`ml-2 text-purple-400 group-hover:text-green-400 transition-all duration-300 ${showFilters ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            
            {/* Expandable filter section */}
            {showFilters && (
              <div className="bg-black/80 border border-purple-500/30 rounded-lg p-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-purple-300">Experience Level</label>
                    <select className="w-full bg-black border border-green-500/30 rounded-lg p-2 text-white">
                      <option>Any Experience</option>
                      <option>Entry Level</option>
                      <option>Mid Level</option>
                      <option>Senior</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-purple-300">Salary Range</label>
                    <select className="w-full bg-black border border-green-500/30 rounded-lg p-2 text-white">
                      <option>Any Salary</option>
                      <option>$0 - $50k</option>
                      <option>$50k - $100k</option>
                      <option>$100k+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-purple-300">Job Type</label>
                    <select className="w-full bg-black border border-green-500/30 rounded-lg p-2 text-white">
                      <option>Any Type</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Jobs List with enhanced animations */}
        <div className="space-y-4">
          {loading ? (
            // Loading Skeleton with pulse animation
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-black rounded-lg shadow-md p-4 md:p-6 border border-purple-500/30">
                  <div className="flex items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-900/30 rounded-md mr-3 md:mr-4 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-5 md:h-6 bg-purple-900/30 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-purple-900/30 rounded w-2/4 mb-3"></div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-6 bg-green-900/30 rounded w-16"></div>
                        <div className="h-6 bg-green-900/30 rounded w-20"></div>
                      </div>
                      <div className="h-4 bg-purple-900/30 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <div 
                    key={job.id}
                    className="bg-black/80 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-green-500/10 transition-all duration-500 overflow-hidden group animate-fade-in border border-purple-500/40 hover:border-green-500/70"
                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="p-4 md:p-6 relative">
                      {/* Animated gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-green-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <div className="flex items-start relative z-10">
                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-900/30 to-green-900/30 text-green-400 rounded-md flex items-center justify-center text-lg md:text-xl mr-3 md:mr-4 group-hover:scale-110 transition-all duration-500 border border-purple-500/30 group-hover:border-green-500/50 shadow-lg">
                          <span className="animate-pulse-slow">{job.logo}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-1">{job.title}</h3>
                              <p className="text-purple-300 text-sm md:text-base">{job.company}</p>
                            </div>
                            {job.featured && (
                              <span className="bg-green-900/30 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-green-500/30 self-start mt-2 md:mt-0 inline-flex w-fit animate-pulse-slow">
                                <Star size={12} className="mr-1" />
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center text-xs font-medium bg-purple-900/30 text-purple-300 px-2 py-1 rounded-md border border-purple-500/30 group-hover:bg-purple-900/50 group-hover:border-purple-500/50 transition-all duration-300">
                              <Briefcase size={10} className="mr-1" />
                              {job.type}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-green-900/30 text-green-300 px-2 py-1 rounded-md border border-green-500/30 group-hover:bg-green-900/50 group-hover:border-green-500/50 transition-all duration-300">
                              <MapPin size={10} className="mr-1" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-purple-900/30 text-purple-300 px-2 py-1 rounded-md border border-purple-500/30 group-hover:bg-purple-900/50 group-hover:border-purple-500/50 transition-all duration-300">
                              <Users size={10} className="mr-1" />
                              {job.salary}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-black text-gray-300 px-2 py-1 rounded-md border border-gray-600 group-hover:border-green-500/50 transition-all duration-300">
                              <Clock size={10} className="mr-1" />
                              {job.posted}
                            </span>
                          </div>
                          
                          <div className="mt-3 md:mt-4">
                            <h4 className="text-xs md:text-sm font-medium text-green-300 mb-1 md:mb-2">Skills:</h4>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {job.skills.map((skill, i) => (
                                <span 
                                  key={i} 
                                  className="text-xs bg-black text-gray-300 px-2 py-0.5 md:py-1 rounded group-hover:bg-green-900/30 group-hover:text-green-300 transition-all duration-300 border border-gray-600 group-hover:border-green-500/50"
                                  style={{ transitionDelay: `${i * 50}ms` }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-3 md:space-y-0">
                            <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">Be among the first 20 applicants</div>
                            <div className="flex space-x-2 w-full md:w-auto">
                              <button className="text-gray-400 hover:text-green-400 transition-colors duration-300 p-2 border border-purple-500/40 hover:border-green-500 rounded-md">
                                <BookOpen size={16} />
                              </button>
                              <button className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center flex-1 md:flex-auto transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-green-500/20">
                                <Zap size={16} className="mr-1" />
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12 bg-black rounded-lg shadow-lg border border-purple-500/40 animate-fade-in">
                <div className="text-5xl mb-4 animate-bounce">🔍</div>
                <h3 className="text-lg font-medium text-green-400 mb-2">No jobs found</h3>
                <p className="text-purple-300">Try adjusting your search filters</p>
              </div>
            )
          )}
        </div>
        
        {/* Job Alerts Section with enhanced mobile design */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-purple-900/30 to-green-900/20 rounded-xl p-6 border border-purple-500/40 animate-fade-in relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between relative z-10">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 mb-2">Get job alerts for Ijeuwa positions</h3>
              <p className="text-purple-300 text-sm md:text-base">Be the first to know when new positions open up</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-3 bg-black/70 backdrop-blur-sm border border-purple-500/40 rounded-t-md sm:rounded-r-none sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full text-white placeholder-purple-300 mb-2 sm:mb-0" 
              />
              <button className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-medium px-6 py-3 rounded-b-md sm:rounded-l-none sm:rounded-r-md transition-all duration-300 w-full sm:w-auto transform hover:scale-[1.02] active:scale-95 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile floating action button for quick apply */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 animate-slide-up-delayed">
        <button className="bg-gradient-to-r from-purple-600 to-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all duration-300">
          <Zap size={24} />
        </button>
      </div>
      
    </div>
  );
};

export default Job;