import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
	dateFrom: Date | undefined;
	setDateFrom: React.Dispatch<React.SetStateAction<Date | undefined>>;
	dateTo: Date | undefined;
	setDateTo: React.Dispatch<React.SetStateAction<Date | undefined>>;
};
export default function SelectTimePeriod({
	dateFrom,
	setDateFrom,
	dateTo,
	setDateTo,
}: Props) {
	return (
		<div className="flex flex-col md:flex-row gap-3 md:items-end">
			<div className="flex flex-col">
				<span className=" text-md text-gray-700">From:</span>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[280px] justify-start text-left font-normal",
								!dateFrom && "text-muted-foreground",
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={dateFrom}
							onSelect={setDateFrom}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col">
				<span className=" text-md text-gray-700">To:</span>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[280px] justify-start text-left font-normal",
								!dateTo && "text-muted-foreground",
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={dateTo}
							onSelect={setDateTo}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
			{/* <button
				type="button"
				className="bg-black text-white rounded-md py-2 px-4 w-fit h-fit font-semibold hover:bg-orange-500 cursor-pointer"
			>
				Filter
			</button> */}
		</div>
	);
}
