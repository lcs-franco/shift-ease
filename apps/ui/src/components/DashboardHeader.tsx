import { AuthContext } from "@/contexts/auth/AuthContext";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const DashboardHeader = () => {
	const { signOut } = useContext(AuthContext);

	return (
		<div className="flex justify-between px-8 py-3 items-center border-b-orange-600 border-b-1 bg-zinc-950">
			<Link to={"/"}>
				<motion.div
					className="text-orange-600 font-bold text-2xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					whileHover={{ scale: 1.15 }}
				>
					Dashboard
				</motion.div>
			</Link>
			<Button
				onClick={signOut}
				className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
			>
				Sign Out
			</Button>
		</div>
	);
};
