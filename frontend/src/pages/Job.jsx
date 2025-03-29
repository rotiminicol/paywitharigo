import  { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter, ChevronDown, Star, BookOpen, Zap, Users } from 'lucide-react';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Simulate loading jobs
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-fade-in-down">
            <h1 className="text-3xl font-bold mb-2">Find Your Dream Job at Ijeuwa</h1>
            <p className="text-blue-100 mb-8">Join our growing social network and build the future of communication</p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row">
              <div className="flex items-center flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
                <Search className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="w-full outline-none text-gray-700" 
                />
              </div>
              <div className="flex items-center flex-1 p-2 border-b md:border-b-0 md:border-r border-gray-200">
                <MapPin className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Location or Remote"
                  className="w-full outline-none text-gray-700" 
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md m-2 transition-colors duration-300">
                Find Jobs
              </button>
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
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:border-blue-400 transition-colors duration-300">
              <Filter size={16} className="mr-2" />
              More Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {loading ? (
            // Loading Skeleton
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-300 rounded-md mr-4"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/4 mb-3"></div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
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
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          {job.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{job.title}</h3>
                              <p className="text-gray-600">{job.company}</p>
                            </div>
                            {job.featured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                <Star size={12} className="mr-1" />
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                              <Briefcase size={12} className="mr-1" />
                              {job.type}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-md">
                              <MapPin size={12} className="mr-1" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md">
                              <Users size={12} className="mr-1" />
                              {job.salary}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                              <Clock size={12} className="mr-1" />
                              {job.posted}
                            </span>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills:</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2.5 py-1 rounded group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors duration-300">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6 flex items-center justify-between">
                            <div className="text-xs text-gray-500">Be among the first 20 applicants</div>
                            <div className="flex space-x-2">
                              <button className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                                <BookOpen size={18} />
                              </button>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 flex items-center">
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
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            )
          )}
        </div>
        
        {/* Job Alerts Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Get job alerts for Ijeuwa positions</h3>
              <p className="text-gray-600">Be the first to know when new positions open up</p>
            </div>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64" 
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-r-md transition-colors duration-300">
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