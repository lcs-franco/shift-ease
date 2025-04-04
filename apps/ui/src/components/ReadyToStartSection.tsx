import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const ReadyToStartSection = () => {
	return (
		<motion.div
			className="flex flex-col py-14 justify-center items-center bg-amber-950 text-center gap-3"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<h2 className="font-bold text-xl md:text-3xl">
				Ready to simplify your shift management?
			</h2>
			<p className="text-gray-400 text-lg max-w-xl">
				Join thousands of businesses that use ShiftEase to streamline their
				scheduling process.
			</p>
			<motion.div
				whileHover={{ scale: 1.15 }}
				className="bg-orange-600 rounded-md md:py-4 md:px-12 py-2 px-12 w-fit self-center font-bold "
			>
				<Link to={"/register"} className="cursor-pointer">
					Start Now
				</Link>
			</motion.div>
		</motion.div>
	);
};
