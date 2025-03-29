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

	return (
		<>
			<div className='flex-[4_4_0] border-r border-gray-700 min-h-screen bg-gradient-to-b from-purple-900/5 to-transparent'>
				{/* HEADER */}
				{(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
				{!isLoading && !isRefetching && !user && (
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-center text-lg mt-4 text-purple-300'
					>
						User not found
					</motion.p>
				)}
				<div className='flex flex-col'>
					{!isLoading && !isRefetching && user && (
						<>
							<motion.div 
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								className='flex gap-10 px-4 py-2 items-center'
							>
								<Link to='/'>
									<motion.div 
										whileHover={{ scale: 1.1, color: "#a855f7" }} 
										transition={{ type: "spring", stiffness: 400, damping: 10 }}
									>
										<FaArrowLeft className='w-4 h-4' />
									</motion.div>
								</Link>
								<div className='flex flex-col'>
									<motion.p 
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.1 }}
										className='font-bold text-lg'
									>
										{user?.fullName}
									</motion.p>
									<motion.span 
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.2 }}
										className='text-sm text-slate-500'
									>
										{POSTS?.length} posts
									</motion.span>
								</div>
							</motion.div>
							{/* COVER IMG */}
							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
								className='relative group/cover'
							>
								<img
									src={coverImg || user?.coverImg || "/cover.png"}
									className='h-52 w-full object-cover shadow-md rounded-b-lg'
									alt='cover image'
								/>
								<div className="absolute inset-0 bg-purple-900/20 rounded-b-lg"></div>
								{isMyProfile && (
									<motion.div
										initial={{ opacity: 1 }}
										animate={{ 
											scale: [1, 1.1, 1],
											boxShadow: ["0px 0px 0px rgba(168, 85, 247, 0)", "0px 0px 8px rgba(168, 85, 247, 0.5)", "0px 0px 0px rgba(168, 85, 247, 0)"]
										}}
										transition={{ 
											duration: 2, 
											repeat: Infinity, 
											repeatType: "reverse" 
										}}
										whileHover={{ 
											scale: 1.2, 
											backgroundColor: "rgba(168, 85, 247, 0.8)",
											boxShadow: "0px 0px 12px rgba(168, 85, 247, 0.8)"
										}}
										className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer transition duration-200 border border-purple-500'
										onClick={() => coverImgRef.current.click()}
									>
										<MdEdit className='w-5 h-5 text-white' />
									</motion.div>
								)}

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
								{/* USER AVATAR */}
								<motion.div 
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
									className='avatar absolute -bottom-16 left-4'
									onMouseEnter={() => isMyProfile && setShowProfileHint(true)}
									onMouseLeave={() => setShowProfileHint(false)}
								>
									<div className='w-32 rounded-full relative group/avatar shadow-xl border-4 border-purple-600'>
										<img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
										<AnimatePresence>
											{showProfileHint && isMyProfile && (
												<motion.div
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.8 }}
													className="absolute -top-10 left-0 bg-purple-800 text-white text-xs rounded px-2 py-1 shadow-lg"
												>
													Click to change profile picture
												</motion.div>
											)}
										</AnimatePresence>
										{isMyProfile && (
											<motion.div 
												initial={{ opacity: 1 }}
												animate={{ 
													scale: [1, 1.1, 1],
													boxShadow: ["0px 0px 0px rgba(168, 85, 247, 0)", "0px 0px 8px rgba(168, 85, 247, 0.5)", "0px 0px 0px rgba(168, 85, 247, 0)"]
												}}
												transition={{ 
													duration: 2, 
													repeat: Infinity, 
													repeatType: "reverse",
													delay: 1 
												}}
												whileHover={{ 
													scale: 1.2, 
													backgroundColor: "rgba(168, 85, 247, 0.8)",
													boxShadow: "0px 0px 12px rgba(168, 85, 247, 0.8)"
												}}
												className='absolute top-5 right-3 p-1 bg-purple-600 rounded-full cursor-pointer border border-white'
												onClick={() => profileImgRef.current.click()}
											>
												<MdEdit className='w-4 h-4 text-white' />
											</motion.div>
										)}
									</div>
								</motion.div>
							</motion.div>
							<motion.div 
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.4 }}
								className='flex justify-end px-4 mt-5'
							>
								{isMyProfile && <EditProfileModal authUser={authUser} />}
								{!isMyProfile && (
									<motion.button
										whileHover={{ scale: 1.05, backgroundColor: "#a855f7", color: "white", borderColor: "#a855f7" }}
										whileTap={{ scale: 0.95 }}
										className='btn btn-outline rounded-full btn-sm border-purple-500 text-purple-500 hover:bg-purple-500 hover:border-purple-500'
										onClick={() => follow(user?._id)}
									>
										{isPending && "Loading..."}
										{!isPending && amIFollowing && "Unfollow"}
										{!isPending && !amIFollowing && "Follow"}
									</motion.button>
								)}
								{(coverImg || profileImg) && (
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										animate={{ 
											boxShadow: ["0px 0px 0px rgba(147, 51, 234, 0)", "0px 0px 10px rgba(147, 51, 234, 0.5)", "0px 0px 0px rgba(147, 51, 234, 0)"] 
										}}
										transition={{ 
											duration: 2, 
											repeat: Infinity 
										}}
										className='btn bg-purple-600 hover:bg-purple-700 rounded-full btn-sm text-white px-4 ml-2 border-none'
										onClick={async () => {
											await updateProfile({ coverImg, profileImg });
											setProfileImg(null);
											setCoverImg(null);
										}}
									>
										{isUpdatingProfile ? "Updating..." : "Update"}
									</motion.button>
								)}
							</motion.div>

							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className='flex flex-col gap-4 mt-14 px-4'
							>
								<motion.div 
									className='flex flex-col'
									whileInView={{ 
										transition: { staggerChildren: 0.1 } 
									}}
								>
									<motion.span 
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.6 }}
										className='font-bold text-lg bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'
									>
										{user?.fullName}
									</motion.span>
									<motion.span 
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.7 }}
										className='text-sm text-slate-500'
									>
										@{user?.username}
									</motion.span>
									<motion.span 
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.8 }}
										className='text-sm my-1'
									>
										{user?.bio}
									</motion.span>
								</motion.div>

								<div className='flex gap-2 flex-wrap'>
									{user?.link && (
										<motion.div 
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.9 }}
											whileHover={{ scale: 1.05, y: -2 }}
											className='flex gap-1 items-center'
										>
											<>
												<FaLink className='w-3 h-3 text-purple-400' />
												<a
													href={user?.link}
													target='_blank'
													rel='noreferrer'
													className='text-sm text-purple-500 hover:text-purple-300 hover:underline transition-colors'
												>
													{user?.link}
												</a>
											</>
										</motion.div>
									)}
									<motion.div 
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 1 }}
										className='flex gap-2 items-center'
									>
										<IoCalendarOutline className='w-4 h-4 text-purple-400' />
										<span className='text-sm text-slate-500'>{memberSinceDate}</span>
									</motion.div>
								</div>
								<div className='flex gap-4'>
									<motion.div 
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 1.1 }}
										whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
										className='flex gap-1 items-center bg-purple-900/10 px-3 py-1 rounded-full'
									>
										<span className='font-bold text-xs'>{user?.following?.length || 0}</span>
										<span className='text-slate-500 text-xs'>Following</span>
									</motion.div>
									<motion.div 
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 1.2 }}
										whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
										className='flex gap-1 items-center bg-purple-900/10 px-3 py-1 rounded-full'
									>
										<span className='font-bold text-xs'>{user?.followers?.length || 0}</span>
										<span className='text-slate-500 text-xs'>Followers</span>
									</motion.div>
								</div>
							</motion.div>
							<div className='flex w-full border-b border-purple-900/20 mt-4'>
								<motion.div
									whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}
									className={`flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer ${
										feedType === "posts" ? "text-purple-500" : ""
									}`}
									onClick={() => setFeedType("posts")}
								>
									Posts
									<AnimatePresence>
										{feedType === "posts" && (
											<motion.div 
												initial={{ width: 0 }}
												animate={{ width: "40px" }}
												exit={{ width: 0 }}
												className='absolute bottom-0 h-1 rounded-full bg-purple-500' 
											/>
										)}
									</AnimatePresence>
								</motion.div>
								<motion.div
									whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}
									className={`flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer ${
										feedType === "likes" ? "text-purple-500" : "text-slate-500"
									}`}
									onClick={() => setFeedType("likes")}
								>
									Likes
									<AnimatePresence>
										{feedType === "likes" && (
											<motion.div 
												initial={{ width: 0 }}
												animate={{ width: "40px" }}
												exit={{ width: 0 }}
												className='absolute bottom-0 h-1 rounded-full bg-purple-500' 
											/>
										)}
									</AnimatePresence>
								</motion.div>
							</div>
						</>
					)}

					<Posts feedType={feedType} username={username} userId={user?._id} />
				</div>
			</div>
		</>
	);
};
export default ProfilePage;