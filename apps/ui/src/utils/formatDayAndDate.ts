export const formatDayAndDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	const dayOfWeek = dayNames[date.getUTCDay()];
	const dayOfMonth = date.getUTCDate();
	return `${dayOfWeek} ${dayOfMonth}`;
};
