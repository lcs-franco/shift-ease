import { api } from "@/services/api";
import type { ScheduleShift } from "@/types/schedule";

export const useScheduleShifts = () => ({
	getScheduleShifts: async (
		startDate: string,
		endDate: string,
	): Promise<ScheduleShift[] | null> => {
		try {
			const response = await api.get(
				`/schedule-shifts?start_date=${startDate}&end_date=${endDate}`,
			);
			return response.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	},
});
