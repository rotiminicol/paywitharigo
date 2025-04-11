import { useState, useEffect } from 'react';
import {
  ArrowRight,
  CreditCard,
  Lock,
  Smartphone,
  Menu,
  X,
  User,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Placeholder for logo; replace with actual import
const ArigoPayLogo = '/ijuewa.png';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll-based animations for hero section
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.scrollBehavior = 'smooth';
    return () => {
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

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
        className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden"
          >
            <img src={ArigoPayLogo} alt="Arigo Pay Logo" className="h-full w-full object-contain" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
            Arigo Pay
          </span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <motion.a
            whileHover={{ y: -2 }}
            href="#features"
            className="hover:text-blue-600 transition-colors"
          >
            Features
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href="#security"
            className="hover:text-blue-600 transition-colors"
          >
            Security
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href="#about"
            className="hover:text-blue-600 transition-colors"
          >
            About
          </motion.a>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(29, 78, 216, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full text-white transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Log In
          </motion.a>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
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
              className="md:hidden absolute top-16 right-6 bg-white border border-blue-100 rounded-lg shadow-xl p-4 z-50"
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#security"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security
                </a>
                <a
                  href="#about"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full text-white text-center transition-colors hover:opacity-90"
                  onClick={() => setMobileMenuOpen(false)}
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
          className={`absolute top-20 -left-10 h-64 w-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 ${
            isVisible ? 'animate-pulse' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 h-64 w-64 bg-blue-300 rounded-full filter blur-3xl opacity-20 ${
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
              Banking,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                Reimagined
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Arigo Pay offers a seamless, secure, and modern banking experience.
              Pay, save, and invest with ease—all in one app.
            </p>
            <div className="flex space-x-4 pt-4">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(29, 78, 216, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md flex items-center space-x-2 text-white transition-all shadow-lg hover:shadow-blue-500/30"
              >
                <span>Open Account</span>
                <ArrowRight size={18} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-blue-400 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all"
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
                className="absolute top-12 right-12 w-64 h-64 bg-white border-2 border-blue-400 rounded-xl shadow-lg flex items-center justify-center"
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              Arigo Pay
            </span>
            ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="h-8 w-8 text-blue-600" />,
                title: 'Mobile-First Banking',
                description:
                  'Manage your money on the go with our intuitive app. Pay, save, and invest anytime, anywhere.',
              },
              {
                icon: <CreditCard className="h-8 w-8 text-blue-600" />,
                title: 'Zero-Fee Transfers',
                description:
                  'Send money instantly to anyone, anywhere, with no hidden fees or charges.',
              },
              {
                icon: <Lock className="h-8 w-8 text-blue-600" />,
                title: 'Top-Notch Security',
                description:
                  'Your funds are protected with bank-grade encryption and biometric authentication.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-4 flex justify-center">
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
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
          className="absolute -top-40 -right-40 h-80 w-80 bg-blue-100 rounded-full filter blur-3xl opacity-20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 bg-blue-200 rounded-full filter blur-3xl opacity-20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Future of Banking
          </h2>
          <p className="text-gray-600 mb-8">
            Open your Arigo Pay account in minutes and experience banking designed
            for you.
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(29, 78, 216, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md text-lg font-medium text-white transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Get Started Now
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-6 md:mb-0"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                <img src={ArigoPayLogo} alt="Arigo Pay Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                Arigo Pay
              </span>
            </motion.div>
            <div className="flex space-x-8">
              <motion.a
                whileHover={{ y: -2 }}
                href="/privacy"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="/terms"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </motion.a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-8">
            © 2025 Arigo Pay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;