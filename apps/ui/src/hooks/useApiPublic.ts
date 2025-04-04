import { api } from "@/services/api";

type AuthResponse = {
	accessToken: string;
};

export const useApiPublic = () => ({
	signIn: async (
		email: string,
		password: string,
	): Promise<AuthResponse | null> => {
		try {
			const response = await api.post("/auth/signin", { email, password });
			const token = response.data;
			return token;
		} catch (error) {
			console.error("Sign in failed:", error);
			return null;
		}
	},
	signUp: async (
		name: string,
		email: string,
		password: string,
		departmentCode: string,
	): Promise<AuthResponse | null> => {
		try {
			const response = await api.post("/auth/signup", {
				name,
				email,
				password,
				departmentCode,
			});
			const token = response.data;
			return token;
		} catch (error) {
			console.error("Sign Up Failed:", error);
			return null;
		}
	},
});
