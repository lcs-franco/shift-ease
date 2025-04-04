import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useShiftExchangeRequest } from "@/hooks/useShiftExchangeRequest";
import { ScheduleShift } from "@/types/schedule";
import { useContext, useRef, useState } from "react";
import SelectExchangeShift from "./SelectExchangeShift";

type Props = {
  name: string;
  schedule: string;
  day: string;
  receptorId: string;
  destinationId?: string;
  loggedUserShifts: ScheduleShift[];
};

export default function RequestSwapDialog({
  name,
  schedule,
  day,
  receptorId,
  destinationId,
  loggedUserShifts,
}: Props) {
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { createSwapRequest } = useShiftExchangeRequest();
  const { user } = useContext(AuthContext);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleSendRequest = async () => {
    if (!selectedShiftId) {
      setError("Por favor, selecione um turno para oferecer.");
      return;
    }
    if (!destinationId) {
      setError("Turno desejado inválido.");
      return;
    }

    const swapRequestData = {
      receptorId,
      departmentId: user!.department_id,
      originShiftId: selectedShiftId,
      destinationId,
      reason: "Solicitação de troca de turno",
    };

    try {
      await createSwapRequest(swapRequestData);
      setError(null);
      setSuccessMessage(`Request sent to ${name}!`);
      setTimeout(() => {
        if (dialogCloseRef.current) {
          dialogCloseRef.current.click();
        }
      }, 2000);
    } catch (err) {
      setError("Erro ao enviar a solicitação de troca.");
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Request Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Request Shift Swap
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <div>
              <div className="text-lg">{name}'s Shift</div>
              <div className="flex border-1 px-2 py-5 justify-between rounded-md font-bold items-center text-lg">
                <div className="text-black">{day}</div>
                <div className="text-green-900">{schedule}</div>
              </div>
            </div>
            <div>
              <div className="text-lg">Selecione seu turno para oferecer:</div>
              <SelectExchangeShift
                shifts={loggedUserShifts}
                onShiftSelect={(shiftId) => setSelectedShiftId(shiftId)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {successMessage && (
              <div className="text-green-600 bg-green-100 p-2 rounded-md flex items-center gap-2">
                <span>✔</span> {successMessage}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose>
            <Button ref={dialogCloseRef}>Cancel</Button>
          </DialogClose>
          <Button
            className="bg-orange-500 text-white font-bold shadow-md"
            onClick={handleSendRequest}
            disabled={!!successMessage}
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
