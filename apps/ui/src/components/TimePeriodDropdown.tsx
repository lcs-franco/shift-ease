import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
	dropdownPeriod: string;
	setDropdownPeriod: React.Dispatch<React.SetStateAction<string>>;
};
export default function TimePeriodDropdown({
	dropdownPeriod,
	setDropdownPeriod,
}: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{dropdownPeriod}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuRadioGroup
					value={dropdownPeriod}
					onValueChange={setDropdownPeriod}
				>
					<DropdownMenuRadioItem value="Week">Week</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Month">Month</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Year">Year</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="None">None</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
