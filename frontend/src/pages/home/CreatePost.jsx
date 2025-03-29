import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const CreatePost = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);
	const imgRef = useRef(null);

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const {
		mutate: createPost,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ text, img }) => {
			try {
				const res = await fetch("/api/posts/create", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text, img }),
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},

		onSuccess: () => {
			setText("");
			setImg(null);
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createPost({ text, img });
	};

	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div 
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='flex p-4 items-start gap-4 border-b border-purple-200/20 bg-gradient-to-b from-purple-950/30 to-purple-900/10'
		>
			<div className='avatar'>
				<motion.div 
					whileHover={{ scale: 1.05 }}
					className='w-8 rounded-full ring-2 ring-purple-500'
				>
					<img src={authUser.profileImg || "/avatar-placeholder.png"} />
				</motion.div>
			</div>
			<form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<motion.textarea
					whileFocus={{ scale: 1.01 }}
					className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none bg-transparent text-purple-100 placeholder-purple-400/50'
					placeholder='What is happening?!'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				{img && (
					<motion.div 
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className='relative w-72 mx-auto'
					>
						<motion.div
							whileHover={{ scale: 1.1 }}
							className='absolute top-0 right-0 text-white bg-purple-800 rounded-full w-5 h-5 cursor-pointer flex items-center justify-center'
							onClick={() => {
								setImg(null);
								imgRef.current.value = null;
							}}
						>
							<IoCloseSharp className='w-4 h-4' />
						</motion.div>
						<img src={img} className='w-full mx-auto h-72 object-contain rounded-lg border border-purple-500/30' />
					</motion.div>
				)}

				<div className='flex justify-between border-t py-2 border-t-purple-200/20'>
					<div className='flex gap-3 items-center'>
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<CiImageOn
								className='text-purple-400 w-6 h-6 cursor-pointer hover:text-purple-300 transition-colors'
								onClick={() => imgRef.current.click()}
							/>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<BsEmojiSmileFill className='text-purple-400 w-5 h-5 cursor-pointer hover:text-purple-300 transition-colors' />
						</motion.div>
					</div>
					<input type='file' accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
					<motion.button 
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='btn bg-gradient-to-r from-purple-600 to-purple-800 border-none text-white px-4 rounded-full hover:from-purple-700 hover:to-purple-900 transition-all'
						disabled={isPending}
					>
						{isPending ? (
							<span className="loading loading-spinner loading-sm"></span>
						) : "Post"}
					</motion.button>
				</div>
				{isError && (
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-purple-300 bg-purple-900/50 p-2 rounded-lg text-sm'
					>
						{error.message}
					</motion.div>
				)}
			</form>
		</motion.div>
	);
};
export default CreatePost;