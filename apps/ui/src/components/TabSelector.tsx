type Props = {
	activeTab: "Schedule" | "Swap Requests";
	setActiveTab: React.Dispatch<
		React.SetStateAction<"Schedule" | "Swap Requests">
	>;
};

const activeStyle = "text-green-500 border-b-2 border-b-green-500";

export const TabSelector = ({ activeTab, setActiveTab }: Props) => {
	return (
		<div className="w-full px-8 flex gap-5 py-5 font-semibold text-xl border-b-[0.5px]">
			<span
				className={`${activeTab === "Schedule" ? activeStyle : ""} cursor-pointer`}
				onClick={() => setActiveTab("Schedule")}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setActiveTab("Schedule");
					}
				}}
			>
				Schedule
			</span>

			<span
				className={`${activeTab === "Swap Requests" ? activeStyle : ""} cursor-pointer`}
				onClick={() => setActiveTab("Swap Requests")}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setActiveTab("Swap Requests");
					}
				}}
			>
				Swap Requests
			</span>
		</div>
	);
};
