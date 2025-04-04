import type {
	CreateShiftExchangeRequestDto,
	SwapRequestResultResponse,
	getUserSwapRequestsResponse,
} from "@/hooks/useShiftExchangeRequest";
import { createContext } from "react";

export type ShiftExchangeContextType = {
	getUserSwapRequests: () => Promise<getUserSwapRequestsResponse | null>;
	countUserSwapRequests: () => Promise<number | null>;
	createSwapRequest: (
		createShiftExchangeRequestDto: CreateShiftExchangeRequestDto,
	) => Promise<void>;
	acceptSwapRequest: (
		requestId: string,
	) => Promise<SwapRequestResultResponse | null>;
	rejectSwapRequest: (
		requestId: string,
	) => Promise<SwapRequestResultResponse | null>;
};

const defaultShiftExchangeContext: ShiftExchangeContextType = {
	getUserSwapRequests: async () => null,
	countUserSwapRequests: async () => null,
	createSwapRequest: async () => {},
	acceptSwapRequest: async () => null,
	rejectSwapRequest: async () => null,
};

export const ShiftExchangeContext = createContext<ShiftExchangeContextType>(
	defaultShiftExchangeContext,
);
