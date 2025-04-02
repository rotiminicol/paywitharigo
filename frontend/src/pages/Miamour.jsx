import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiMessageSquare, FiGlobe, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const Miamour = () => {
  const features = [
    {
      icon: <FiHeart className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />,
      title: "Authentic Connections",
      description: "Find meaningful relationships based on shared interests and values."
    },
    {
      icon: <FiUsers className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />,
      title: "Community Focused",
      description: "Join groups and communities that match your passions and lifestyle."
    },
    {
      icon: <FiMessageSquare className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />,
      title: "Real Conversations",
      description: "Engage in genuine discussions without algorithms controlling your feed."
    },
    {
      icon: <FiGlobe className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
      title: "Global Reach",
      description: "Connect with people from around the world who share your interests."
    },
    {
      icon: <FiStar className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />,
      title: "Premium Experience",
      description: "Enjoy an ad-free environment with exclusive features for members."
    }
  ];

  const testimonials = [
    {
      quote: "Miamour helped me find my creative tribe. The communities are so supportive!",
      author: "Alex, Digital Artist"
    },
    {
      quote: "Finally a platform where real connections happen. Met my best friend here!",
      author: "Jamie, Photographer"
    },
    {
      quote: "The quality of interactions on Miamour is unlike any other social platform.",
      author: "Taylor, Writer"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:px-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 8 
              }}
              className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6"
            >
              <FaHeart className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Miamour
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Where meaningful connections blossom
            </p>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              A social platform designed for authentic relationships and shared passions
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Join Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-2 sm:px-8 sm:py-3 bg-gray-800 text-white font-medium rounded-lg border border-gray-700 hover:bg-gray-700 transition-all"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            Why Choose <span className="text-purple-400">Miamour</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-2 sm:mt-4 text-base sm:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Were redefining social connection with features designed for real relationships
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative bg-gray-800/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Our <span className="text-pink-400">Community</span> Says
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15 }}
                className="bg-gray-800/50 p-5 sm:p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-all"
              >
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-300 italic mb-3 sm:mb-4">{testimonial.quote}</p>
                <p className="text-purple-300 text-sm sm:text-base font-medium">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-6 sm:p-8 md:p-12 border border-purple-500/20">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
            >
              Ready to Find Your <span className="text-pink-400">Tribe</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8"
            >
              Join thousands of others building meaningful connections
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Sign Up Free
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 text-white font-medium rounded-lg border border-gray-700 hover:bg-gray-700 transition-all"
              >
                Take a Tour
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Miamour
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">Features</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">Community</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Miamour. All rights reserved.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Miamour;