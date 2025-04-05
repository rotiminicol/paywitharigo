import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiMessageSquare, FiGlobe, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const Miamour = () => {
  const features = [
    {
      icon: <FiHeart className="w-6 h-6 md:w-8 md:h-8 text-green-400" />,
      title: "Authentic Connections",
      description: "Find meaningful relationships based on shared interests and values."
    },
    {
      icon: <FiUsers className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />,
      title: "Community Focused",
      description: "Join groups and communities that match your passions and lifestyle."
    },
    {
      icon: <FiMessageSquare className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Real Conversations",
      description: "Engage in genuine discussions without algorithms controlling your feed."
    },
    {
      icon: <FiGlobe className="w-6 h-6 md:w-8 md:h-8 text-green-500" />,
      title: "Global Reach",
      description: "Connect with people from around the world who share your interests."
    },
    {
      icon: <FiStar className="w-6 h-6 md:w-8 md:h-8 text-purple-300" />,
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
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black z-10"></div>
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-900/20 via-black to-purple-900/20"
          ></motion.div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-24">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-green-600 rounded-full flex items-center justify-center mb-6"
            >
              <FaHeart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              Miamour
            </h1>
            <p className="mt-4 text-base sm:text-xl md:text-2xl text-gray-300">
              Where meaningful connections blossom
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-green-600 text-white font-medium rounded-full shadow-lg transition-all"
              >
                Join Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-6 py-3 bg-white text-black font-medium rounded-full shadow-lg transition-all"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Why Choose <span className="text-purple-400">Miamour</span>?
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Redefining social connection with authentic relationships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)" }}
              className="bg-gray-900 p-6 rounded-2xl border border-purple-900/50"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
          >
            What Our <span className="text-green-400">Community</span> Says
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-black p-6 rounded-2xl border border-green-900/50"
              >
                <p className="text-gray-300 text-sm italic mb-4">{testimonial.quote}</p>
                <p className="text-purple-400 text-sm font-medium">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-900/50 to-green-900/50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Find Your <span className="text-green-400">Tribe</span>?
          </h2>
          <p className="text-gray-300 mb-6 text-base sm:text-lg">
            Join thousands building meaningful connections
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)" }}
              href="#"
              className="px-6 py-3 bg-green-600 text-white rounded-full"
            >
              Sign Up Free
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)" }}
              href="#"
              className="px-6 py-3 bg-purple-600 text-white rounded-full"
            >
              Take a Tour
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-black border-t border-purple-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-600 rounded-full flex items-center justify-center mr-3">
                <FaHeart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Miamour
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {['About', 'Features', 'Community', 'Privacy', 'Terms'].map((item) => (
                <a key={item} href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Miamour. All rights reserved.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Miamour;