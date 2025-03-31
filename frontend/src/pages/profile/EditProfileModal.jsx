import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import { X, User, Lock, Mail, Link as LinkIcon, Edit3 } from "react-feather";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#2D1A45" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-full border border-purple-400 text-purple-400 bg-black hover:text-white transition-colors duration-300 flex items-center"
      >
        <Edit3 size={16} className="mr-2" />
        Edit profile
      </motion.button>
  
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.dialog
              open
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-black rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-purple-500"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-purple-300"
                  >
                    Update Profile
                  </motion.h3>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsOpen(false)}
                    className="text-purple-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
  
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <User className="text-purple-500" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.fullName}
                      name="fullName"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <User className="text-purple-500" size={18} />
                    <input
                      type="text"
                      placeholder="Username"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.username}
                      name="username"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <Mail className="text-purple-500" size={18} />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <Edit3 className="text-purple-500 mt-1" size={18} />
                    <textarea
                      placeholder="Bio"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 min-h-[80px] resize-none"
                      value={formData.bio}
                      name="bio"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <LinkIcon className="text-purple-500" size={18} />
                    <input
                      type="text"
                      placeholder="Website Link"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.link}
                      name="link"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <Lock className="text-purple-500" size={18} />
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.currentPassword}
                      name="currentPassword"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-purple-900 group hover:border-purple-500 transition-all duration-300"
                  >
                    <Lock className="text-purple-500" size={18} />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                      value={formData.newPassword}
                      name="newPassword"
                      onChange={handleInputChange}
                    />
                  </motion.div>
  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="w-full bg-gradient-to-r from-purple-800 to-purple-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      {isUpdatingProfile ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            Update Profile
                          </motion.span>
                        </span>
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditProfileModal;