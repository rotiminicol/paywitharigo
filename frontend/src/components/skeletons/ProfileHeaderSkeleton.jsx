import { motion } from "framer-motion";

const ProfileHeaderSkeleton = () => {
	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col gap-2 w-full my-2 p-4 bg-gradient-to-b from-purple-950/30 to-purple-900/10 rounded-lg border border-purple-200/10'
		>
			<div className='flex gap-2 items-center'>
				<div className='flex flex-1 gap-1'>
					<div className='flex flex-col gap-1 w-full'>
						<div className='skeleton h-4 w-12 rounded-full bg-purple-900/30'></div>
						<div className='skeleton h-4 w-16 rounded-full bg-purple-900/30'></div>
						<div className='skeleton h-40 w-full relative bg-purple-900/30 rounded-t-lg'>
							<div className='skeleton h-20 w-20 rounded-full border-2 border-purple-900/50 absolute -bottom-10 left-3 bg-purple-900/30'></div>
						</div>
						<div className='skeleton h-6 mt-4 w-24 ml-auto rounded-full bg-purple-900/30'></div>
						<div className='skeleton h-4 w-14 rounded-full mt-4 bg-purple-900/30'></div>
						<div className='skeleton h-4 w-20 rounded-full bg-purple-900/30'></div>
						<div className='skeleton h-4 w-2/3 rounded-full bg-purple-900/30'></div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default ProfileHeaderSkeleton;