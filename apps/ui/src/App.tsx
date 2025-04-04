import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ShiftExchangeProvider } from "./contexts/ShiftExchangeRequests/ShiftExchangeRequestsProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { SchedulesProvider } from "./contexts/schedules/SchedulesProvider";

export const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<SchedulesProvider>
					<ShiftExchangeProvider>
						<Router />
					</ShiftExchangeProvider>
				</SchedulesProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
