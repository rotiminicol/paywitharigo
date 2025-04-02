import { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter, ChevronDown, Star, BookOpen, Zap, Users } from 'lucide-react';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="animate-fade-in-down">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Find Your Dream Job at Ijeuwa</h1>
            <p className="text-purple-200 mb-6 md:mb-8">Join our growing social network and build the future of communication</p>
            
            {/* Search Bar - Stacked on mobile */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col border border-gray-700">
              <div className="flex items-center flex-1 p-2 border-b border-gray-700">
                <Search className="text-purple-400 mr-2 flex-shrink-0" size={20} />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-purple-300" 
                />
              </div>
              <div className="flex items-center flex-1 p-2 border-b border-gray-700">
                <MapPin className="text-purple-400 mr-2 flex-shrink-0" size={20} />
                <input 
                  type="text" 
                  placeholder="Location or Remote"
                  className="w-full outline-none text-gray-200 bg-transparent placeholder-purple-300" 
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md m-2 transition-colors duration-300 w-full">
                Find Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Filter Options - Horizontally scrollable on mobile */}
        <div className="mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800 -mx-2 px-2">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    selectedFilter === option.id
                      ? 'bg-purple-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-purple-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <button className="flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm font-medium hover:border-purple-500 transition-colors duration-300 w-full justify-center">
                <Filter size={16} className="mr-2" />
                More Filters
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
  
        {/* Jobs List */}
        <div className="space-y-4">
          {loading ? (
            // Loading Skeleton - Mobile Optimized
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-700">
                  <div className="flex items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-md mr-3 md:mr-4 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-5 md:h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/4 mb-3"></div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-6 bg-gray-700 rounded w-16"></div>
                        <div className="h-6 bg-gray-700 rounded w-20"></div>
                      </div>
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
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
                    className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group animate-fade-in border border-gray-700 hover:border-purple-500"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-900/30 text-purple-400 rounded-md flex items-center justify-center text-lg md:text-xl mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                          {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">{job.title}</h3>
                              <p className="text-purple-300 text-sm md:text-base">{job.company}</p>
                            </div>
                            {job.featured && (
                              <span className="bg-yellow-900/30 text-yellow-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-yellow-500/30 self-start mt-2 md:mt-0 inline-flex w-fit">
                                <Star size={12} className="mr-1" />
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center text-xs font-medium bg-purple-900/30 text-purple-300 px-2 py-1 rounded-md border border-purple-500/30">
                              <Briefcase size={10} className="mr-1" />
                              {job.type}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-emerald-900/30 text-emerald-300 px-2 py-1 rounded-md border border-emerald-500/30">
                              <MapPin size={10} className="mr-1" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-violet-900/30 text-violet-300 px-2 py-1 rounded-md border border-violet-500/30">
                              <Users size={10} className="mr-1" />
                              {job.salary}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded-md border border-gray-600">
                              <Clock size={10} className="mr-1" />
                              {job.posted}
                            </span>
                          </div>
                          
                          <div className="mt-3 md:mt-4">
                            <h4 className="text-xs md:text-sm font-medium text-purple-300 mb-1 md:mb-2">Skills:</h4>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {job.skills.map((skill, i) => (
                                <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 md:py-1 rounded group-hover:bg-purple-900/30 group-hover:text-purple-300 transition-colors duration-300 border border-gray-600">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-3 md:space-y-0">
                            <div className="text-xs text-gray-400">Be among the first 20 applicants</div>
                            <div className="flex space-x-2 w-full md:w-auto">
                              <button className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2 border border-gray-700 rounded-md">
                                <BookOpen size={16} />
                              </button>
                              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center justify-center flex-1 md:flex-auto">
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
              <div className="text-center py-8 md:py-12 bg-gray-800 rounded-lg shadow border border-gray-700">
                <div className="text-3xl mb-4 text-purple-400">🔍</div>
                <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
                <p className="text-gray-400">Try adjusting your search filters</p>
              </div>
            )
          )}
        </div>
        
        {/* Job Alerts Section - Mobile Optimized */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-purple-900/30 to-black rounded-xl p-4 md:p-6 border border-purple-500/30 animate-fade-in">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-base md:text-lg font-semibold text-white mb-1">Get job alerts for Ijeuwa positions</h3>
              <p className="text-purple-300 text-sm md:text-base">Be the first to know when new positions open up</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-t-md sm:rounded-r-none sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full text-white placeholder-purple-300 mb-2 sm:mb-0" 
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-b-md sm:rounded-l-none sm:rounded-r-md transition-colors duration-300 w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;