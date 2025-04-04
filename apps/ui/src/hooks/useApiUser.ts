import { api } from "@/services/api";
import type { Role } from "@/types/enums";
import type { User } from "@/types/user";

type UserResponse = {
	id: string;
	email: string;
	name: string;
	role: Role;
	department_id: string;
};

export const useApiUser = () => ({
	validateToken: async (): Promise<UserResponse | null> => {
		try {
			const response = await api.get("/users/me");
			return response.data;
		} catch (error) {
			console.error("Token validation failed:", error);
			return null;
		}
	},

	findUserSchedules: async (): Promise<User | null> => {
		try {
			const response = await api.get("/users/find-schedules");
			return response.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
});
