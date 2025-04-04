import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
	return (
		<div className="flex flex-col md:flex-row justify-center items-center gap-2 px-4 md:px-40 py-5 md:py-10 bg-gradient-to-r from-neutral-900 to-orange-800 text-center md:text-start">
			<div className="flex flex-col md:flex-row items-center justify-around gap-3">
				<motion.div
					className="flex flex-col gap-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}
				>
					<h1 className="font-bold text-4xl md:text-5xl text-center md:text-start">
						Simplify shift management with ShiftEase
					</h1>
					<p>Save time, reduce errors, and improve communication</p>

					<motion.div
						whileHover={{ scale: 1.15 }}
						className="bg-orange-600 rounded-md md:py-2 md:px-8 py-2 px-12 w-fit self-center font-bold md:self-start"
					>
						<Link to={"/register"} className="cursor-pointer">
							Get Started
						</Link>
					</motion.div>
				</motion.div>

				<motion.img
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					src="https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg"
					alt="people in workplace talking to each other"
					className="rounded-md border-1 border-white md:w-3xl"
				/>
			</div>
		</div>
	);
};
