import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {  User, CreditCard,  Edit, ArrowLeft } from "lucide-react";
import EditProfileModal from "./EditProfileModal"; // Assume this exists or create it
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [tab, setTab] = useState("overview");

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  const { username } = useParams();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return { ...data, accountNumber: "1234567890", balance: 150000 }; // Mock banking data
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

  const isMyProfile = authUser?._id === user?._id;

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  // Mock transaction data (replace with API call in production)
  const transactions = [
    { id: 1, description: "Transfer to John Doe", amount: -50000, date: "2025-04-08" },
    { id: 2, description: "School Fees Payment", amount: -30000, date: "2025-04-07" },
    { id: 3, description: "Salary Credit", amount: 200000, date: "2025-04-01" },
  ];

  return (
    <motion.div
      className="flex-[4_4_0] min-h-screen bg-white text-gray-900 overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      {(isLoading || isRefetching) && (
        <div className="p-4">
          <div className="h-6 bg-blue-200 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="h-48 bg-blue-100 rounded mb-4 animate-pulse"></div>
        </div>
      )}
      {!isLoading && !isRefetching && !user && (
        <motion.p
          variants={itemVariants}
          className="text-center text-lg mt-4 text-blue-600"
        >
          User not found
        </motion.p>
      )}

      {!isLoading && !isRefetching && user && (
        <>
          {/* TOP NAVIGATION */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 px-4 py-3 bg-white border-b border-blue-200 sticky top-0 z-10 shadow-sm"
          >
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-blue-100"
              >
                <ArrowLeft className="w-5 h-5 text-blue-600" />
              </motion.div>
            </Link>
            <div className="flex items-center gap-2">
              <motion.span
                className="font-bold text-lg text-gray-900"
                whileHover={{ color: "#003087" }}
              >
                {user?.fullName}
              </motion.span>
              <span className="text-blue-400 text-sm">@{user?.username}</span>
            </div>
          </motion.div>

          {/* COVER IMAGE */}
          <motion.div variants={itemVariants} className="relative group/cover">
            <img
              src={coverImg || user?.coverImg || "/cover-bank.png"} // Use a banking-themed default
              className="h-32 w-full object-cover"
              alt="cover image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            {isMyProfile && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-2 right-2 p-2 bg-blue-600 rounded-full cursor-pointer"
                onClick={() => coverImgRef.current.click()}
              >
                <Edit className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.div>

          {/* PROFILE CONTENT */}
          <motion.div variants={itemVariants} className="px-4 pt-4 relative">
            {/* PROFILE AVATAR */}
            <motion.div
              className="absolute -top-12 left-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="relative w-20 h-20">
                <motion.div
                  className="w-full h-full rounded-full border-4 border-blue-600 overflow-hidden bg-white"
                  whileHover={{ borderColor: "#4FC3F7", scale: 1.05 }}
                >
                  <img
                    src={profileImg || user?.profileImg || "/avatar-placeholder.png"}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                </motion.div>
                {isMyProfile && (
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer"
                    onClick={() => profileImgRef.current.click()}
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div className="flex justify-end pt-12 gap-2" variants={itemVariants}>
              {isMyProfile && <EditProfileModal authUser={authUser} />}
              {(coverImg || profileImg) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold"
                  onClick={async () => {
                    await updateProfile({ coverImg, profileImg });
                    setProfileImg(null);
                    setCoverImg(null);
                  }}
                >
                  {isUpdatingProfile ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating
                    </span>
                  ) : (
                    "Update Profile"
                  )}
                </motion.button>
              )}
            </motion.div>

            {/* USER INFO */}
            <motion.div className="mt-8 flex flex-col gap-4" variants={itemVariants}>
              <div className="flex flex-col">
                <motion.span
                  className="font-bold text-xl text-gray-900"
                  whileHover={{ color: "#003087" }}
                >
                  {user?.fullName}
                </motion.span>
                <span className="text-blue-400 text-sm">@{user?.username}</span>
                <p className="text-gray-600 text-sm mt-1">
                  Email: {user?.email || "Not provided"}
                </p>
              </div>

              {/* ACCOUNT SUMMARY */}
              <motion.div
                className="bg-blue-50 p-4 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Account Summary
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Account Number</p>
                    <p className="text-gray-900 font-medium">{user?.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Balance</p>
                    <p className="text-gray-900 font-medium">₦{user?.balance.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* TABS */}
            <motion.div
              className="flex w-full border-b border-blue-200 mt-6"
              variants={itemVariants}
            >
              {["overview", "transactions"].map((type) => (
                <motion.div
                  key={type}
                  className={`flex-1 text-center p-3 cursor-pointer relative ${
                    tab === type ? "text-blue-600" : "text-gray-600"
                  }`}
                  onClick={() => setTab(type)}
                  whileHover={{ backgroundColor: "#F0F9FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="capitalize font-semibold text-sm">{type}</span>
                  {tab === type && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-12 h-1 bg-blue-400 rounded-full"
                      layoutId="underline"
                      initial={{ x: "-50%" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* TAB CONTENT */}
            <motion.div className="mt-4" variants={itemVariants}>
              {tab === "overview" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-5 h-5 text-blue-600" />
                    <p>
                      Member since:{" "}
                      {new Date(user?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <p>Linked Cards: 2 (Visa, Mastercard)</p> {/* Mock data */}
                  </div>
                </div>
              )}
              {tab === "transactions" && (
                <div className="space-y-4">
                  {transactions.map((txn) => (
                    <motion.div
                      key={txn.id}
                      className="flex justify-between p-3 bg-blue-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div>
                        <p className="text-gray-900 font-medium">{txn.description}</p>
                        <p className="text-gray-600 text-sm">{txn.date}</p>
                      </div>
                      <p
                        className={`font-medium ${
                          txn.amount < 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        ₦{Math.abs(txn.amount).toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* HIDDEN INPUTS */}
            <input
              type="file"
              hidden
              accept="image/*"
              ref={coverImgRef}
              onChange={(e) => handleImgChange(e, "coverImg")}
            />
            <input
              type="file"
              hidden
              accept="image/*"
              ref={profileImgRef}
              onChange={(e) => handleImgChange(e, "profileImg")}
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ProfilePage;