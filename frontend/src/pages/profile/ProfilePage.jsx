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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className='flex-[4_4_0] border-r border-gray-800 min-h-screen bg-gradient-to-b from-black to-gray-900 overflow-x-hidden'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
      {!isLoading && !isRefetching && !user && (
        <motion.p 
          variants={itemVariants}
          className='text-center text-lg mt-4 text-purple-400'
        >
          User not found
        </motion.p>
      )}
      
      {!isLoading && !isRefetching && user && (
        <>
          {/* TOP NAVIGATION */}
          <motion.div 
            variants={itemVariants}
            className='flex items-center gap-4 px-4 py-3 bg-black/50 backdrop-blur-md sticky top-0 z-10'
          >
            <Link to='/'>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-purple-900/20"
              >
                <FaArrowLeft className='w-5 h-5 text-purple-400' />
              </motion.div>
            </Link>
            <div className='flex flex-col'>
              <motion.span 
                className='font-bold text-lg sm:text-xl text-white truncate max-w-[150px] sm:max-w-none'
                whileHover={{ color: "#a855f7" }}
              >
                {user?.fullName}
              </motion.span>
              <span className='text-xs sm:text-sm text-purple-300/70'>
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
              className='h-40 sm:h-56 w-full object-cover shadow-2xl'
              alt='cover image'
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            {isMyProfile && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 bg-purple-600/80 rounded-full cursor-pointer border border-purple-400"
                onClick={() => coverImgRef.current.click()}
              >
                <MdEdit className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            )}
          </motion.div>

          {/* PROFILE CONTENT */}
          <motion.div 
            variants={itemVariants}
            className='px-4 pt-3 relative'
          >
            {/* PROFILE AVATAR */}
            <motion.div 
              className='absolute -top-16 sm:-top-20 left-2 sm:left-4'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className='relative w-24 h-24 sm:w-36 sm:h-36'>
                <motion.div 
                  className='w-full h-full rounded-full border-2 sm:border-4 border-purple-600 bg-gray-900 overflow-hidden shadow-xl'
                  whileHover={{ borderColor: "#a855f7" }}
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
                    whileHover={{ scale: 1.2 }}
                    className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1 sm:p-2 bg-purple-600 rounded-full cursor-pointer'
                    onClick={() => profileImgRef.current.click()}
                  >
                    <MdEdit className='w-3 h-3 sm:w-5 sm:h-5 text-white' />
                  </motion.div>
                )}

                <AnimatePresence>
                  {showProfileHint && isMyProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-8 sm:-top-12 left-0 bg-purple-900/90 text-white text-xs rounded-lg px-2 py-1 sm:px-3 sm:py-2 shadow-lg"
                    >
                      Change Profile Picture
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div 
              className='flex justify-end pt-2 sm:pt-4 gap-2'
              variants={itemVariants}
            >
              {isMyProfile && <EditProfileModal authUser={authUser} />}
              {!isMyProfile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1 sm:px-6 sm:py-2 rounded-full font-semibold text-sm sm:text-base text-white ${
                    amIFollowing 
                      ? 'bg-purple-600/20 border border-purple-600' 
                      : 'bg-purple-600'
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-4 py-1 sm:px-6 sm:py-2 bg-purple-700 rounded-full text-sm sm:text-base text-white font-semibold'
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
              className='mt-16 sm:mt-24 flex flex-col gap-2 sm:gap-4'
              variants={itemVariants}
            >
              <div className='flex flex-col'>
                <motion.span 
                  className='font-bold text-xl sm:text-2xl text-white'
                  whileHover={{ color: "#a855f7" }}
                >
                  {user?.fullName}
                </motion.span>
                <span className='text-gray-400 text-sm sm:text-base'>@{user?.username}</span>
                {user?.bio && (
                  <motion.p 
                    className='text-white mt-1 sm:mt-2 text-sm sm:text-base'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {user?.bio}
                  </motion.p>
                )}
              </div>

              <motion.div 
                className='flex gap-2 sm:gap-4 flex-wrap text-sm sm:text-base'
                variants={itemVariants}
              >
                {user?.link && (
                  <motion.a
                    href={user?.link}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-1 sm:gap-2 text-purple-400 hover:text-purple-300 truncate max-w-[180px] sm:max-w-none'
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaLink className='w-3 h-3 sm:w-4 sm:h-4' />
                    <span className="truncate">{user?.link.replace(/^https?:\/\//, '')}</span>
                  </motion.a>
                )}
                <motion.div 
                  className='flex items-center gap-1 sm:gap-2 text-purple-300'
                  whileHover={{ scale: 1.05 }}
                >
                  <IoCalendarOutline className='w-4 h-4 sm:w-5 sm:h-5' />
                  <span>{memberSinceDate}</span>
                </motion.div>
              </motion.div>

              <motion.div 
                className='flex gap-4 sm:gap-6 text-sm sm:text-base'
                variants={itemVariants}
              >
                <motion.div 
                  className='flex items-center gap-1 sm:gap-2'
                  whileHover={{ scale: 1.05 }}
                >
                  <span className='font-bold text-white'>{user?.following?.length || 0}</span>
                  <span className='text-gray-400'>Following</span>
                </motion.div>
                <motion.div 
                  className='flex items-center gap-1 sm:gap-2'
                  whileHover={{ scale: 1.05 }}
                >
                  <span className='font-bold text-white'>{user?.followers?.length || 0}</span>
                  <span className='text-gray-400'>Followers</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* FEED TABS */}
            <motion.div 
              className='flex w-full border-b border-gray-800 mt-4 sm:mt-6'
              variants={itemVariants}
            >
              {["posts", "likes"].map((type) => (
                <motion.div
                  key={type}
                  className={`flex-1 text-center p-2 sm:p-4 cursor-pointer relative ${
                    feedType === type ? 'text-white' : 'text-gray-400'
                  }`}
                  onClick={() => setFeedType(type)}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                >
                  <span className='capitalize font-semibold text-sm sm:text-base'>{type}</span>
                  {feedType === type && (
                    <motion.div
                      className='absolute bottom-0 left-1/2 w-12 sm:w-16 h-0.5 sm:h-1 bg-purple-600 rounded-full'
                      layoutId="underline"
                      initial={{ x: "-50%" }}
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