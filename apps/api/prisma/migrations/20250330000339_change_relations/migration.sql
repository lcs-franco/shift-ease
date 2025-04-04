-- DropForeignKey
ALTER TABLE "shift_exchange_requests" DROP CONSTRAINT "shift_exchange_requests_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "shift_exchange_requests" DROP CONSTRAINT "shift_exchange_requests_origin_shift_id_fkey";

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_origin_shift_id_fkey" FOREIGN KEY ("origin_shift_id") REFERENCES "schedule_shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "schedule_shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
