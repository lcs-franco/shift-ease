import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const MenuButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="md:hidden relative">
			<label className="cursor-pointer">
				<input
					className="hidden peer"
					type="checkbox"
					checked={isOpen}
					onChange={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
				/>
				<motion.div
					className="w-9 h-10 flex flex-col items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					whileHover={{ scale: 1.15 }}
					whileTap={{ scale: 0.9 }}
				>
					<div
						className={
							"w-5 h-[2px] bg-[#FF5630] rounded-sm transition-all duration-300 origin-left translate-y-2 peer-checked:-rotate-45"
						}
					/>
					<div
						className={
							"w-5 h-[2px] bg-[#FF5630] rounded-md transition-all duration-300 origin-center peer-checked:hidden"
						}
					/>
					<div
						className={
							"w-5 h-[2px] bg-[#FF5630] rounded-md transition-all duration-300 origin-left -translate-y-2 peer-checked:rotate-45"
						}
					/>
				</motion.div>
			</label>
			{isOpen && (
				<div className="absolute top-12 right-0 w-40 bg-zinc-950 dark:bg-neutral-800 shadow-lg rounded-md p-4 flex flex-col gap-2 z-10">
					<Link
						to="/login"
						className="text-orange-600 dark:text-white hover:text-primary-500"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="text-orange-600 dark:text-white hover:text-primary-500"
					>
						Get Started
					</Link>
				</div>
			)}
		</div>
	);
};
