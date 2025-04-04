import type { Department } from "./department";
import type { Role } from "./enums";
import type { Schedule } from "./schedule";
import type { ShiftExchangeRequest } from "./shift";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	department_id: string;
	role: Role;

	department: Department;
	schedules: Schedule[];
	requests_sent: ShiftExchangeRequest[];
	requests_received: ShiftExchangeRequest[];
}
