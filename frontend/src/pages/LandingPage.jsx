import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X,CreditCard,Lock,Smartphone,User } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ArigoPayLogo from "/ijuewa.png"

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.scrollBehavior = 'smooth';
  }, []);

  // Animation Variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  // Custom Animation for Hero
  const heroAnimation = {
    animate: { rotate: [0, 360], scale: [1, 1.1, 1] },
    transition: { duration: 10, repeat: Infinity, ease: 'linear' },
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 will-change-transform"
      >
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center"
          >
            <img src={ArigoPayLogo} alt="Arigo Pay Logo" />
          </motion.div>
          <span className="text-xl font-semibold text-blue-700">Arigo Pay</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <motion.a whileHover={{ y: -2, color: '#1d4ed8' }} href="#services">
            Services
          </motion.a>
          <motion.a whileHover={{ y: -2, color: '#1d4ed8' }} href="#about">
            About Us
          </motion.a>
          <motion.a whileHover={{ y: -2, color: '#1d4ed8' }} href="#rates">
            Rates
          </motion.a>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(29, 78, 216, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </motion.a>
        </div>
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
  
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="md:hidden absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50"
            >
              <div className="flex flex-col space-y-4">
                <a href="#services" className="hover:text-blue-600 transition-colors">
                  Services
                </a>
                <a href="#about" className="hover:text-blue-600 transition-colors">
                  About Us
                </a>
                <a href="#rates" className="hover:text-blue-600 transition-colors">
                  Rates
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition-colors"
                >
                  Log In
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
  
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-20 pb-32 px-6 max-w-6xl mx-auto"
      >
        <div
          className={`absolute top-20 -left-10 h-64 w-64 bg-blue-200 rounded-full filter blur-3xl opacity-10 ${
            isVisible ? 'animate-pulse' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 h-64 w-64 bg-blue-300 rounded-full filter blur-3xl opacity-10 ${
            isVisible ? 'animate-pulse' : 'opacity-0'
          }`}
        ></div>
  
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Secure Banking,{' '}
              <span className="text-blue-600">Simplified</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Manage your finances with confidence using Arigo Pay’s secure, user-friendly platform. Start today.
            </p>
            <div className="flex space-x-4 pt-4">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(29, 78, 216, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-md flex items-center space-x-2 shadow-md hover:bg-blue-700"
              >
                <span>Open an Account</span>
                <ArrowRight size={18} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#eff6ff', borderColor: '#1d4ed8' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:text-blue-700 transition-all"
              >
                Explore Services
              </motion.button>
            </div>
          </motion.div>
  
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
            className="md:w-1/2 mt-10 md:mt-0"
          >
            <div className="relative w-full h-96">
              <motion.div
                {...heroAnimation}
                className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl opacity-20"
              />
              <motion.div
                animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 left-10 w-48 h-48 bg-white border-2 border-blue-400 rounded-lg flex items-center justify-center shadow-md"
              >
                <CreditCard size={64} className="text-blue-600" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
  
      {/* Services */}
      <section id="services" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-900"
          >
            Why Bank with Arigo Pay
          </motion.h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="h-8 w-8 text-blue-600" />,
                title: 'Secure Transactions',
                description: 'Your funds are protected with industry-leading encryption and fraud detection.',
              },
              {
                icon: <CreditCard className="h-8 w-8 text-blue-600" />,
                title: 'Flexible Accounts',
                description: 'Choose from a range of accounts tailored to your personal or business needs.',
              },
              {
                icon: <Smartphone className="h-8 w-8 text-blue-600" />,
                title: 'Mobile Banking',
                description: 'Manage your money anytime, anywhere with our intuitive mobile app.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 will-change-transform"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-4 flex justify-center"
                >
                  {service.icon}
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    borderColor: ['#1d4ed8', '#60a5fa', '#1d4ed8'],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-32 border-2 border-blue-400 rounded-md mb-4 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Testimonials */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-900"
          >
            Trusted by Our Customers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                text: 'Arigo Pay makes managing my finances so easy and secure. I trust them completely!',
              },
              {
                name: 'Michael Lee',
                text: 'Their mobile app is a game-changer. I can handle everything on the go!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <User size={24} className="text-blue-600" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Call to Action */}
      <section className="py-20 px-6 relative overflow-hidden bg-white">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 bg-blue-100 rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 bg-blue-200 rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>
  
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Bank Smarter?</h2>
          <p className="text-gray-600 mb-8">Join thousands of customers who trust Arigo Pay for their financial needs.</p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(29, 78, 216, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-md text-lg font-medium shadow-md hover:bg-blue-700"
          >
            Open Your Account
          </motion.a>
        </motion.div>
      </section>
  
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <CreditCard size={18} className="text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-700">Arigo Pay</span>
            </motion.div>
            <div className="flex space-x-8">
              <motion.a whileHover={{ y: -2, color: '#1d4ed8' }} href="/privacy" className="text-gray-600">
                Privacy Policy
              </motion.a>
              <motion.a whileHover={{ y: -2, color: '#1d4ed8' }} href="/terms" className="text-gray-600">
                Terms of Service
              </motion.a>
              <motion.a whileHover={{ y: -2, color: '#1d4ed8' }} href="/contact" className="text-gray-600">
                Contact Us
              </motion.a>
            </div>
          </div>
          <div className="text-center md:text-left text-gray-500 text-sm mt-8">
            © 2025 Arigo Pay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
 
};

export default LandingPage;