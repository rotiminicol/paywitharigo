import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";

import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const [showProfileHint, setShowProfileHint] = useState(false);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { username } = useParams();

  const { follow, isPending } = useFollow();
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
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

  const isMyProfile = authUser?._id === user?._id;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const amIFollowing = authUser?.following?.includes(user?._id);

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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div 
      className='flex-[4_4_0] min-h-screen bg-black text-white overflow-x-hidden'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
      {!isLoading && !isRefetching && !user && (
        <motion.p 
          variants={itemVariants}
          className='text-center text-lg mt-4 text-green-400'
        >
          User not found
        </motion.p>
      )}
      
      {!isLoading && !isRefetching && user && (
        <>
          {/* TOP NAVIGATION */}
          <motion.div 
            variants={itemVariants}
            className='flex items-center gap-3 px-3 py-2 bg-black/80 backdrop-blur-lg sticky top-0 z-10 border-b border-purple-900/50'
          >
            <Link to='/'>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-green-900/20"
              >
                <FaArrowLeft className='w-5 h-5 text-green-400' />
              </motion.div>
            </Link>
            <div className='flex flex-col'>
              <motion.span 
                className='font-bold text-lg sm:text-xl truncate max-w-[200px] sm:max-w-none'
                whileHover={{ color: "#22c55e" }}
              >
                {user?.fullName}
              </motion.span>
              <span className='text-xs text-purple-400'>
                {POSTS?.length} posts
              </span>
            </div>
          </motion.div>

          {/* COVER IMAGE */}
          <motion.div 
            variants={itemVariants}
            className='relative group/cover'
          >
            <img
              src={coverImg || user?.coverImg || "/cover.png"}
              className='h-36 sm:h-48 w-full object-cover shadow-lg'
              alt='cover image'
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 0.9 }}
            />
            {isMyProfile && (
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-2 right-2 p-2 bg-purple-600 rounded-full cursor-pointer"
                onClick={() => coverImgRef.current.click()}
              >
                <MdEdit className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.div>

          {/* PROFILE CONTENT */}
          <motion.div 
            variants={itemVariants}
            className='px-3 pt-2 sm:pt-4 relative'
          >
            {/* PROFILE AVATAR */}
            <motion.div 
              className='absolute -top-14 sm:-top-16 left-3'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className='relative w-20 h-20 sm:w-28 sm:h-28'>
                <motion.div 
                  className='w-full h-full rounded-full border-4 border-green-600 overflow-hidden shadow-xl bg-black'
                  whileHover={{ borderColor: "#22c55e", scale: 1.05 }}
                  onMouseEnter={() => isMyProfile && setShowProfileHint(true)}
                  onMouseLeave={() => setShowProfileHint(false)}
                >
                  <img 
                    src={profileImg || user?.profileImg || "/avatar-placeholder.png"}
                    className='w-full h-full object-cover'
                    alt='profile'
                  />
                </motion.div>
                
                {isMyProfile && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className='absolute bottom-0 right-0 p-1 sm:p-2 bg-green-600 rounded-full cursor-pointer'
                    onClick={() => profileImgRef.current.click()}
                  >
                    <MdEdit className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                  </motion.div>
                )}

                <AnimatePresence>
                  {showProfileHint && isMyProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-10 sm:-top-12 left-0 bg-green-900/90 text-white text-xs rounded-lg px-2 py-1 shadow-lg"
                    >
                      Change Profile
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div 
              className='flex justify-end pt-12 sm:pt-16 gap-2'
              variants={itemVariants}
            >
              {isMyProfile && <EditProfileModal authUser={authUser} />}
              {!isMyProfile && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1 sm:px-6 sm:py-2 rounded-full font-semibold text-sm sm:text-base text-white ${
                    amIFollowing 
                      ? 'bg-green-600/20 border border-green-600' 
                      : 'bg-green-600'
                  }`}
                  onClick={() => follow(user?._id)}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                  ) : amIFollowing ? "Unfollow" : "Follow"}
                </motion.button>
              )}
              {(coverImg || profileImg) && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className='px-4 py-1 sm:px-6 sm:py-2 bg-purple-600 rounded-full text-sm sm:text-base text-white font-semibold'
                  onClick={async () => {
                    await updateProfile({ coverImg, profileImg });
                    setProfileImg(null);
                    setCoverImg(null);
                  }}
                >
                  {isUpdatingProfile ? (
                    <span className="flex items-center gap-1 sm:gap-2">
                      <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                      <span className="hidden sm:inline">Updating</span>
                    </span>
                  ) : "Update"}
                </motion.button>
              )}
            </motion.div>

            {/* USER INFO */}
            <motion.div 
              className='mt-8 sm:mt-12 flex flex-col gap-3'
              variants={itemVariants}
            >
              <div className='flex flex-col'>
                <motion.span 
                  className='font-bold text-lg sm:text-xl'
                  whileHover={{ color: "#22c55e" }}
                >
                  {user?.fullName}
                </motion.span>
                <span className='text-purple-400 text-sm'>@{user?.username}</span>
                {user?.bio && (
                  <motion.p 
                    className='mt-2 text-sm sm:text-base text-gray-300'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user?.bio}
                  </motion.p>
                )}
              </div>

              <motion.div 
                className='flex gap-3 flex-wrap text-sm'
                variants={itemVariants}
              >
                {user?.link && (
                  <motion.a
                    href={user?.link}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-1 text-green-400 hover:text-green-300 truncate max-w-[150px] sm:max-w-none'
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaLink className='w-4 h-4' />
                    <span className="truncate">{user?.link.replace(/^https?:\/\//, '')}</span>
                  </motion.a>
                )}
                <motion.div 
                  className='flex items-center gap-1 text-purple-400'
                  whileHover={{ scale: 1.05 }}
                >
                  <IoCalendarOutline className='w-4 h-4' />
                  <span>{memberSinceDate}</span>
                </motion.div>
              </motion.div>

              <motion.div 
                className='flex gap-4 text-sm'
                variants={itemVariants}
              >
                <motion.div 
                  className='flex items-center gap-1'
                  whileHover={{ scale: 1.05, color: "#22c55e" }}
                >
                  <span className='font-bold'>{user?.following?.length || 0}</span>
                  <span className='text-gray-400'>Following</span>
                </motion.div>
                <motion.div 
                  className='flex items-center gap-1'
                  whileHover={{ scale: 1.05, color: "#22c55e" }}
                >
                  <span className='font-bold'>{user?.followers?.length || 0}</span>
                  <span className='text-gray-400'>Followers</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* FEED TABS */}
            <motion.div 
              className='flex w-full border-b border-purple-900/50 mt-4'
              variants={itemVariants}
            >
              {["posts", "likes"].map((type) => (
                <motion.div
                  key={type}
                  className={`flex-1 text-center p-3 cursor-pointer relative ${
                    feedType === type ? 'text-white' : 'text-gray-400'
                  }`}
                  onClick={() => setFeedType(type)}
                  whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='capitalize font-semibold text-sm'>{type}</span>
                  {feedType === type && (
                    <motion.div
                      className='absolute bottom-0 left-1/2 w-12 h-1 bg-green-600 rounded-full'
                      layoutId="underline"
                      initial={{ x: "-50%" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* HIDDEN INPUTS */}
          <input
            type='file'
            hidden
            accept='image/*'
            ref={coverImgRef}
            onChange={(e) => handleImgChange(e, "coverImg")}
          />
          <input
            type='file'
            hidden
            accept='image/*'
            ref={profileImgRef}
            onChange={(e) => handleImgChange(e, "profileImg")}
          />
        </>
      )}

      <Posts feedType={feedType} username={username} userId={user?._id} />
    </motion.div>
  );
};

export default ProfilePage;