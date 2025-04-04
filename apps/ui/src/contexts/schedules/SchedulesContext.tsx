import type { QueryParams } from "@/hooks/useApiSchedules";
import type { Schedule } from "@/types/schedule";
import { createContext } from "react";

export type SchedulesContextType = {
	findAll: ({
		search,
		departmentId,
		shiftType,
		from,
		to,
	}: QueryParams) => Promise<Schedule[] | null>;
};

const defaultSchedulesContext: SchedulesContextType = {
	findAll: async () => null,
};

export const SchedulesContext = createContext<SchedulesContextType>(
	defaultSchedulesContext,
);
