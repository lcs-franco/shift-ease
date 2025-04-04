import { api } from "@/services/api";

export const useApiDepartment = () => ({
	getAllDepartments: async () => {
		try {
			const response = await api.get("/departments");
			const departments = response.data;
			return departments;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
});
