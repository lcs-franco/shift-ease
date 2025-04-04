import { api } from "@/services/api";
import type { ShiftType } from "@/types/enums";
import type { Schedule } from "@/types/schedule";

export type QueryParams = {
	search?: string;
	departmentId: string;
	shiftType?: ShiftType;
	from?: string;
	to?: string;
};

export const useApiSchedules = () => ({
	findAll: async ({
		search,
		departmentId,
		shiftType,
		from,
		to,
	}: QueryParams): Promise<Schedule[] | null> => {
		try {
			const response = await api.get("/schedules", {
				params: { search, departmentId, shiftType, from, to },
			});
			const data = response.data;
			return Array.isArray(data) ? data : [data];
		} catch (error) {
			console.error(error);
			return null;
		}
	},
});
