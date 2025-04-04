import { Injectable } from '@nestjs/common'
import { ShiftsRepository } from '@shared/database/repositories/shifts.repositories'

@Injectable()
export class FindShiftService {
  constructor(private readonly shiftsRepo: ShiftsRepository) {}

  async find(id: string) {
    return this.shiftsRepo.findUnique({
      where: { id },
    })
  }
}
