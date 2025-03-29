import { useState } from "react";
import { motion } from "framer-motion";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
				{/* Header with purple gradient border */}
				<div className="flex w-full border-b border-purple-700/30 shadow-sm shadow-purple-500/10">
					<motion.div
						className={
							"flex justify-center flex-1 p-3 hover:bg-purple-900/20 transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className={feedType === "forYou" ? "text-purple-300" : "text-gray-300"}>
							For you
						</span>
						{feedType === "forYou" && (
							<motion.div 
								className="absolute bottom-0 w-10 h-1 rounded-full bg-purple-500"
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: "2.5rem", opacity: 1 }}
								transition={{ duration: 0.3 }}
							></motion.div>
						)}
					</motion.div>
					<motion.div
						className="flex justify-center flex-1 p-3 hover:bg-purple-900/20 transition duration-300 cursor-pointer relative"
						onClick={() => setFeedType("following")}
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className={feedType === "following" ? "text-purple-300" : "text-gray-300"}>
							Following
						</span>
						{feedType === "following" && (
							<motion.div 
								className="absolute bottom-0 w-10 h-1 rounded-full bg-purple-500"
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: "2.5rem", opacity: 1 }}
								transition={{ duration: 0.3 }}
							></motion.div>
						)}
					</motion.div>
				</div>

				{/*  CREATE POST INPUT with purple accents */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				>
					<CreatePost />
				</motion.div>

				{/* POSTS with staggered animation */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Posts feedType={feedType} />
				</motion.div>
			</div>
		</>
	);
};
export default HomePage;