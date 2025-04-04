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
import { useApiSchedules } from "@/hooks/useApiSchedules";
import { useApiUser } from "@/hooks/useApiUser";
import { ScheduleShift } from "@/types/schedule";
import { useContext, useEffect, useState } from "react";
import ShiftCard from "./ShiftCard";

// Interfaces
export interface WorkerShift {
  date: string;
  dayOfWeek: string;
  displayDate: string;
  shiftType: string;
  shiftTime: string;
  id: string;
}

interface WorkerSchedule {
  userId: string;
  name: string;
  shifts: Record<string, WorkerShift | "Day Off">;
}

export default function ScheduleTab() {
  const [workers, setWorkers] = useState<WorkerSchedule[]>([]);
  const [loggedUserShifts, setLoggedUserShifts] = useState<ScheduleShift[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());

  const { findAll } = useApiSchedules();
  const { findUserSchedules } = useApiUser();
  const { user } = useContext(AuthContext);

  const formatDisplayDate = (date: Date) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${dayNames[date.getUTCDay()]} ${date.getUTCDate()}`;
  };

  const getShiftTime = (shiftType: string) => {
    switch (shiftType) {
      case "DIURNAL":
        return "08:00 - 16:00";
      case "NOCTURNAL":
        return "20:00 - 04:00";
      default:
        return "09:00 - 17:00";
    }
  };

  const generateWeekDates = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return formatDisplayDate(date);
    });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const from = startDate.toISOString().split("T")[0];
        const to = new Date(startDate);
        to.setDate(to.getDate() + 6);
        const toDate = to.toISOString().split("T")[0];

        const weekDates = generateWeekDates(startDate);
        setDays(weekDates);

        const response = await findAll({
          departmentId: user!.department_id,
          from,
          to: toDate,
        });

        if (!response) {
          setError("Não foi possível carregar as escalas.");
          return;
        }

        const workersMap = new Map<string, WorkerSchedule>();

        response.forEach((schedule) => {
          const userId = schedule.user_id;
          const workerName = schedule.name
            .split(" - ")[0]
            .replace("Escala ", "");

          if (!workersMap.has(userId)) {
            workersMap.set(userId, { userId, name: workerName, shifts: {} });
          }

          schedule.schedule_shifts.forEach((shift) => {
            const displayDate = formatDisplayDate(new Date(shift.date));
            const shiftType = shift.shift.type;
            const shiftTime = getShiftTime(shiftType);

            const worker = workersMap.get(userId);
            if (worker) {
              worker.shifts[displayDate] = {
                id: shift.id,
                date: shift.date,
                dayOfWeek: shift.weekDay,
                displayDate,
                shiftType,
                shiftTime,
              };
            }
          });
        });

        const workersArray = Array.from(workersMap.values());

        workersArray.forEach((worker) => {
          weekDates.forEach((date) => {
            if (!worker.shifts[date]) {
              worker.shifts[date] = "Day Off";
            }
          });
        });

        setWorkers(workersArray);
      } catch (err) {
        setError("Erro ao carregar as escalas.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [startDate, user]);

  useEffect(() => {
    const fetchUserSchedulesShifts = async () => {
      const response = await findUserSchedules();

      if (response) {
        response?.schedules.forEach((schedule) => {
          setLoggedUserShifts(schedule.schedule_shifts);
        });
      }
    };

    fetchUserSchedulesShifts();
  }, [user]);

  const handlePreviousWeek = () => {
    setStartDate((prev) => new Date(prev.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setStartDate((prev) => new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-5 rounded-md bg-white w-full">
      <div className="flex justify-between">
        <Button onClick={handlePreviousWeek}>← Semana Anterior</Button>
        <Button onClick={handleNextWeek}>Próxima Semana →</Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center p-10 bg-white rounded-md">
          Carregando escalas...
        </div>
      ) : error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-lg">Nome</TableHead>
              {days.map((day) => (
                <TableHead key={day} className="text-lg">
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker.userId}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                {days.map((day) => {
                  const shift = worker.shifts[day];
                  const isDayOff =
                    typeof shift === "string" && shift === "Day Off";
                  return (
                    <TableCell key={`${worker.userId}-${day}`} className="p-2">
                      {isDayOff ? (
                        <span className="text-gray-400">Day Off</span>
                      ) : (
                        <ShiftCard
                          name={worker.name}
                          schedule={(shift as WorkerShift)?.shiftTime}
                          isSwapable={days[0] !== day}
                          day={day}
                          shiftId={(shift as WorkerShift)?.id}
                          userId={worker.userId}
                          loggedUserShifts={loggedUserShifts}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
