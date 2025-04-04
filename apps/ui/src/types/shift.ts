import type { Department } from "./department";
import type { ShiftExchangeStatus, ShiftType } from "./enums";
import type { ScheduleShift } from "./schedule";
import type { User } from "./user";

export interface Shift {
	id: string;
	department_id: string;
	type: ShiftType;

	department: Department;
	schedule_shifts: ScheduleShift[];
	origin_shifts: ShiftExchangeRequest[];
	destination_shifts: ShiftExchangeRequest[];
}

export interface ShiftExchangeRequest {
	id: string;
	applicant_id: string;
	receptor_id: string;
	status: ShiftExchangeStatus;
	origin_shift_id: string;
	destination_id: string;
	start_date: Date;
	end_date: Date | null;
	reason: string | null;

	applicant: User;
	receptor: User;
	department: Department;
	origin_shift: Shift;
	destination: Shift;
}
