import { motion } from "framer-motion";

const PostSkeleton = () => {
	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col gap-4 w-full p-4 bg-gradient-to-b from-purple-950/30 to-purple-900/10 rounded-lg border border-purple-200/10'
		>
			<div className='flex gap-4 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0 bg-purple-900/30'></div>
				<div className='flex flex-col gap-2'>
					<div className='skeleton h-2 w-12 rounded-full bg-purple-900/30'></div>
					<div className='skeleton h-2 w-24 rounded-full bg-purple-900/30'></div>
				</div>
			</div>
			<div className='skeleton h-40 w-full bg-purple-900/30 rounded-lg'></div>
			<div className='flex gap-4 mt-2'>
				<div className='skeleton h-4 w-16 rounded-full bg-purple-900/30'></div>
				<div className='skeleton h-4 w-16 rounded-full bg-purple-900/30'></div>
				<div className='skeleton h-4 w-16 rounded-full bg-purple-900/30'></div>
			</div>
		</motion.div>
	);
};
export default PostSkeleton;