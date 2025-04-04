import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/contexts/auth/AuthContext";
import type { getUserSwapRequestsResponse } from "@/hooks/useShiftExchangeRequest";
import { useShiftExchangeRequest } from "@/hooks/useShiftExchangeRequest";
import { Role, ShiftExchangeStatus } from "@/types/enums";
import { formatDayAndDate } from "@/utils/formatDayAndDate";
import { useContext, useEffect, useState } from "react";

const getStatusBadgeClass = (status: ShiftExchangeStatus): string => {
	switch (status) {
		case ShiftExchangeStatus.PENDING:
			return "bg-yellow-400 text-yellow-950";
		case ShiftExchangeStatus.APPROVED_RECEIVER:
			return "bg-blue-400 text-blue-950";
		case ShiftExchangeStatus.APPROVED_MANAGER:
			return "bg-green-400 text-green-950";
		case ShiftExchangeStatus.REJECTED:
			return "bg-red-400 text-red-950";
		default:
			return "bg-gray-400 text-gray-950";
	}
};

const getStatusText = (status: ShiftExchangeStatus): string => {
	switch (status) {
		case ShiftExchangeStatus.PENDING:
			return "Pending";
		case ShiftExchangeStatus.APPROVED_RECEIVER:
			return "Accept by receiver";
		case ShiftExchangeStatus.APPROVED_MANAGER:
			return "Approved";
		case ShiftExchangeStatus.REJECTED:
			return "Rejected";
		default:
			return "Pending";
	}
};

export default function SwapRequestTab() {
	const { user } = useContext(AuthContext);
	const { getUserSwapRequests, acceptSwapRequest, rejectSwapRequest } =
		useShiftExchangeRequest();
	const [swapRequests, setSwapRequests] = useState<
		getUserSwapRequestsResponse[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (!user) return;

		const fetchSwapRequests = async () => {
			setLoading(true);
			try {
				const response = await getUserSwapRequests();
				if (response && Array.isArray(response)) {
					setSwapRequests(response);
				} else if (response) {
					setSwapRequests([response]);
				} else {
					setSwapRequests([]);
				}
			} catch (error) {
				setErrorMessage("Failed to fetch swap requests.");
				console.error(error);
				setSwapRequests([]);
			} finally {
				setLoading(false);
			}
		};

		fetchSwapRequests();
	}, []);

	const handleAcceptSwap = async (requestId: string) => {
		try {
			const response = await acceptSwapRequest(requestId);
			if (response) {
				setSuccessMessage(
					"Swap request accepted! Waiting for manager approval.",
				);
				setSwapRequests((prev) =>
					prev.map((req) =>
						req.id === requestId ? { ...req, status: response.status } : req,
					),
				);
			}
		} catch (error) {
			setErrorMessage("Failed to accept swap request.");
			console.error(error);
		}
	};

	const handleRejectSwap = async (requestId: string) => {
		try {
			const response = await rejectSwapRequest(requestId);
			if (response) {
				setSuccessMessage("Swap request rejected.");
				setSwapRequests((prev) =>
					prev.map((req) =>
						req.id === requestId ? { ...req, status: response.status } : req,
					),
				);
			}
		} catch (error) {
			setErrorMessage("Failed to reject swap request.");
			console.error(error);
		}
	};

	if (!user) {
		return (
			<div className="text-center text-red-500">User not authenticated.</div>
		);
	}

	return (
		<div className="flex flex-col gap-5 px-5 py-5 rounded-md bg-white w-full">
			{/* Success/Error Messages */}
			{(successMessage || errorMessage) && (
				<div
					className={`p-4 rounded-md ${
						successMessage ? "bg-green-600 text-white" : "bg-red-600 text-white"
					}`}
				>
					{successMessage || errorMessage}
				</div>
			)}
			<div>
				{loading ? (
					<div className="text-center">Loading...</div>
				) : swapRequests.length === 0 ? (
					<div className="text-gray-500 text-center">
						No swap requests found.
					</div>
				) : (
					<Table>
						<TableHeader className="text-lg bg-gray-100 text-gray-800">
							<TableRow>
								<TableHead className="w-[100px] text-lg">From</TableHead>
								<TableHead className="w-[100px] text-lg">To</TableHead>
								<TableHead className="w-[100px] text-lg">Their Shift</TableHead>
								<TableHead className="w-[100px] text-lg">Your Shift</TableHead>
								<TableHead className="w-[100px] text-lg">Status</TableHead>
								<TableHead className="w-[100px] text-lg">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="font-medium">
							{swapRequests.map((request) => {
								const isToUser = request.receptor_id === user.id;
								const isFromUser = request.applicant_id === user.id;
								const isManager = user.role === Role.MANAGER;

								return (
									<TableRow key={request.id}>
										<TableCell className="font-medium text-left">
											{isFromUser ? "You" : request.applicant.name}
										</TableCell>
										<TableCell className="font-medium">
											{isToUser ? "You" : request.receptor.name}
										</TableCell>
										<TableCell className="font-medium">
											<div className="items-center gap-1 font-bold">
												<div className="border-1 p-1 rounded-md bg-black text-white w-fit">
													{formatDayAndDate(request.destination_shift.date)}
												</div>
												<div>{request.destination_shift.date}</div>{" "}
												{/* Placeholder */}
											</div>
										</TableCell>
										<TableCell className="font-medium">
											<div className="items-center gap-1 font-bold">
												<div className="border-1 p-1 rounded-md bg-black text-white w-fit">
													{formatDayAndDate(request.origin_shift.date)}
												</div>
												<div>{request.origin_shift.date}</div>{" "}
												{/* Placeholder */}
											</div>
										</TableCell>
										<TableCell>
											<Badge
												className={`font-semibold ${getStatusBadgeClass(request.status)}`}
											>
												{getStatusText(request.status)}
											</Badge>
										</TableCell>
										<TableCell className="flex gap-3">
											{request.status === ShiftExchangeStatus.PENDING &&
												isToUser && (
													<>
														<Button
															className="bg-green-700 text-white"
															onClick={() => handleAcceptSwap(request.id)}
														>
															Accept
														</Button>
														<Button
															className="bg-red-500 text-white"
															onClick={() => handleRejectSwap(request.id)}
														>
															Refuse
														</Button>
													</>
												)}
											{request.status ===
												ShiftExchangeStatus.APPROVED_RECEIVER &&
												isManager && (
													<>
														<Button
															className="bg-green-700 text-white"
															onClick={() => handleAcceptSwap(request.id)} // Placeholder for manager approval
														>
															Approve
														</Button>
														<Button
															className="bg-red-500 text-white"
															onClick={() => handleRejectSwap(request.id)}
														>
															Reject
														</Button>
													</>
												)}
											{request.status ===
												ShiftExchangeStatus.APPROVED_RECEIVER &&
												!isManager &&
												"Waiting for Manager Approval"}
											{request.status ===
												ShiftExchangeStatus.APPROVED_MANAGER && "Approved"}
											{request.status === ShiftExchangeStatus.REJECTED &&
												"Rejected"}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
}
