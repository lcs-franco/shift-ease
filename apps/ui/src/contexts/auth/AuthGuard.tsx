import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

type AuthGuardProps = {
	isPrivate: boolean;
};

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
	const auth = useContext(AuthContext);
	const isSignedIn = auth.user;
	const location = useLocation();

	if (!isSignedIn && isPrivate) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	if (isSignedIn && !isPrivate) {
		return <Navigate to="/dashboard" />;
	}
	return <Outlet />;
};
