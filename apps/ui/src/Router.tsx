import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./contexts/auth/AuthGuard";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export const Router = () => {
	return (
		<Routes>
			<Route element={<AuthGuard isPrivate={false} />}>
				<Route path="/" element={<DefaultLayout />}>
					<Route index element={<LandingPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Route>

			<Route element={<AuthGuard isPrivate />}>
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
};
