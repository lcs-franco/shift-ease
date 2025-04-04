import { useApiPublic } from "@/hooks/useApiPublic";
import { useApiUser } from "@/hooks/useApiUser";
import { type JSX, useEffect, useMemo, useState } from "react";
import type { contextUser } from "./AuthContext";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [user, setUser] = useState<contextUser | null>(null);
	const apiUser = useMemo(() => useApiUser(), []);
	const apiPublic = useApiPublic();

	useEffect(() => {
		const validateToken = async () => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				const data = await apiUser.validateToken();
				if (data) {
					setUser(data);
				} else {
					localStorage.removeItem("accessToken");
				}
			}
		};
		validateToken();
	}, [apiUser]);

	const setToken = (token: string) => {
		localStorage.setItem("accessToken", token);
	};

	const signIn = async (email: string, password: string) => {
		const data = await apiPublic.signIn(email, password);
		if (data?.accessToken) {
			setToken(data.accessToken);
			const userData = await apiUser.validateToken();
			if (userData) {
				setUser(userData);
				return true;
			}
		}
		return false;
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem("accessToken");
	};

	const signUp = async (
		name: string,
		email: string,
		password: string,
		departmentCode: string,
	) => {
		const data = await apiPublic.signUp(name, email, password, departmentCode);
		if (data?.accessToken) {
			setToken(data.accessToken);
			const userData = await apiUser.validateToken();
			if (userData) {
				setUser(userData);
				return true;
			}
		}
		return false;
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
			{children}
		</AuthContext.Provider>
	);
};
