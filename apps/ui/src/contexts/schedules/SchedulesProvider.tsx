import { useApiSchedules } from "@/hooks/useApiSchedules";
import { SchedulesContext } from "./SchedulesContext";

export const SchedulesProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const apiSchedules = useApiSchedules();

	return (
		<SchedulesContext.Provider value={apiSchedules}>
			{children}
		</SchedulesContext.Provider>
	);
};
