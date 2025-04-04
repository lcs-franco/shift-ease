import { AuthContext } from "@/contexts/auth/AuthContext";
import type { ScheduleShift } from "@/types/schedule";
import { useContext } from "react";
import RequestSwapDialog from "./RequestSwapDialog";

type Props = {
	name: string;
	schedule: string;
	isSwapable: boolean;
	day: string;
	shiftId?: string;
	userId: string;
	loggedUserShifts: ScheduleShift[];
};

export default function ShiftCard({
	name,
	schedule,
	isSwapable,
	day,
	shiftId,
	userId,
	loggedUserShifts,
}: Props) {
	const auth = useContext(AuthContext);

	return (
		<div className="flex flex-col justify-center bg-green-300 text-green-950 p-4 rounded-md font-bold items-center gap-2">
			<div className="text-lg">{schedule}</div>
			{auth.user?.name !== name && isSwapable && (
				<RequestSwapDialog
					name={name}
					schedule={schedule}
					day={day}
					receptorId={userId}
					destinationId={shiftId}
					loggedUserShifts={loggedUserShifts}
				/>
			)}
		</div>
	);
}
