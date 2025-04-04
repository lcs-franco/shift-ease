import type { WeekDay } from "./enums";
import type { Shift } from "./shift";
import type { User } from "./user";

export interface Schedule {
	id: string;
	user_id: string;
	name: string;
	start_date: string;
	end_date: string;

	user: User;
	schedule_shifts: ScheduleShift[];
}

export interface ScheduleShift {
	id: string;
	schedule_id: string;
	shift_id: string;
	weekDay: WeekDay;
	date: string;

	schedule: Schedule;
	shift: Shift;
}
