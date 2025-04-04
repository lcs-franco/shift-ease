import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const DefaultLayout = () => {
	return (
		<div className="bg-zinc-950 min-h-screen text-white">
			<Header />
			<Outlet />
		</div>
	);
};
