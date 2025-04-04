import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleShift } from "@/types/schedule";

type Props = {
  shifts: ScheduleShift[];
  onShiftSelect: (shiftId: string) => void;
};

export default function SelectExchangeShift({ shifts, onShiftSelect }: Props) {
  const formatDisplayDate = (date: string) => {
    const shiftDate = new Date(date);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${dayNames[shiftDate.getUTCDay()]} ${shiftDate.getUTCDate()}`;
  };

  return (
    <Select onValueChange={onShiftSelect}>
      <SelectTrigger className="w-full text-lg">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="w-full text-lg">
        {shifts.map((shift) => (
          <SelectItem key={shift.id} value={shift.id} className="text-lg">
            {formatDisplayDate(shift.date)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
