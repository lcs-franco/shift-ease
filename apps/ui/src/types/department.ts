import type { Shift } from "./shift";
import type { ShiftExchangeRequest } from "./shift";
import type { User } from "./user";

export interface Department {
	id: string;
	name: string;
	code: string;

	users: User[];
	shifts: Shift[];
	shift_exchange_requests: ShiftExchangeRequest[];
}
