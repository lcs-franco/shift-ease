import { DashboardHeader } from "@/components/DashboardHeader";
import ScheduleTab from "@/components/ScheduleTab";
import SwapRequestTab from "@/components/SwapRequestTab";
import { TabSelector } from "@/components/TabSelector";
import { useState } from "react";

export const Dashboard = () => {
	const [activeTab, setActiveTab] = useState<"Schedule" | "Swap Requests">(
		"Schedule",
	);

	return (
		<div className="flex flex-col bg-gray-100 min-h-screen">
			<DashboardHeader />
			<TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
			<main className="flex px-8 py-5">
				{activeTab === "Schedule" ? <ScheduleTab /> : <SwapRequestTab />}
			</main>
		</div>
	);
};
