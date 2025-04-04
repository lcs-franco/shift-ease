import { api } from "@/services/api";
import type { ShiftExchangeStatus, WeekDay } from "@/types/enums";
import type { User } from "@/types/user";

export type ScheduleShift = {
  id: string;
  schedule_id: string;
  shift_id: string;
  day_week: WeekDay;
  date: string;
};

export type getUserSwapRequestsResponse = {
  id: string;
  applicant_id: string;
  receptor_id: string;
  department_id: string;
  status: ShiftExchangeStatus;
  origin_shift_id: string;
  destination_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  origin_shift: ScheduleShift;
  destination_shift: ScheduleShift;
  applicant: User;
  receptor: User;
};

export interface CreateShiftExchangeRequestDto {
  receptorId: string;
  departmentId: string;
  originShiftId: string;
  destinationId: string;
  reason?: string;
}

export type SwapRequestResultResponse = {
  id: string;
  applicant_id: string;
  receptor_id: string;
  department_id: string;
  status: ShiftExchangeStatus;
  origin_shift_id: string;
  destination_id: string;
  start_date: string;
  end_date: string;
  reason: string;
};

export const useShiftExchangeRequest = () => ({
  getUserSwapRequests:
    async (): Promise<getUserSwapRequestsResponse | null> => {
      try {
        const response = await api.get("/shift-exchange-request");
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },

  countUserSwapRequests: async (): Promise<number | null> => {
    try {
      const response = await api.get("/shift-exchange-request/count");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  createSwapRequest: async ({
    receptorId,
    departmentId,
    originShiftId,
    destinationId,
    reason,
  }: CreateShiftExchangeRequestDto): Promise<void> => {
    try {
      await api.post("/shift-exchange-request", {
        receptorId,
        departmentId,
        originShiftId,
        destinationId,
        reason,
      });
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  },

  acceptSwapRequest: async (
    requestId: string,
  ): Promise<SwapRequestResultResponse | null> => {
    try {
      const response = await api.patch(
        `/shift-exchange-request/${requestId}/accept`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  rejectSwapRequest: async (
    requestId: string,
  ): Promise<SwapRequestResultResponse | null> => {
    try {
      const response = await api.patch(
        `/shift-exchange-request/${requestId}/reject`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});
