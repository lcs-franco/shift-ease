import { useShiftExchangeRequest } from "@/hooks/useShiftExchangeRequest";
import { ShiftExchangeContext } from "./ShiftExchangeRequestContext";

export const ShiftExchangeProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const shiftExchange = useShiftExchangeRequest();

	return (
		<ShiftExchangeContext.Provider value={shiftExchange}>
			{children}
		</ShiftExchangeContext.Provider>
	);
};
