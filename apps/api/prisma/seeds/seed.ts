import {
  Prisma,
  PrismaClient,
  Role,
  ShiftExchangeStatus,
  ShiftType,
  WeekDay,
} from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

//!! Esse arquivo foi criado com o auxílio de IA, para popular o banco e
//!! assim auxiliar no desenvolvimento das telas e funcionalidades

async function main() {
  function hashPassword(password) {
    return hash(password, 12)
  }

  // 1. Criando dois departamentos
  await prisma.department.createMany({
    data: [
      { name: 'Tecnologia da Informação', code: 'TI-001' },
      { name: 'Enfermagem', code: 'ENF-001' },
    ],
    skipDuplicates: true,
  })

  const tiDepartment = await prisma.department.findUnique({
    where: { code: 'TI-001' },
  })
  const enfDepartment = await prisma.department.findUnique({
    where: { code: 'ENF-001' },
  })

  if (!tiDepartment || !enfDepartment) {
    throw new Error('Erro na geração de departamentos')
  }

  // 2. Criando usuários
  const adminTI = await prisma.user.create({
    data: {
      name: 'Admin TI',
      email: 'admin.ti@hospital.com',
      password: await hashPassword('admin.ti@hospital.com'),
      department_id: tiDepartment.id,
      role: Role.ADMIN,
    },
  })

  const gestores = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Gestor Enf Diurno',
        email: 'gestor.enf.diurno@hospital.com',
        password: await hashPassword('gestor.enf.diurno@hospital.com'),
        department_id: enfDepartment.id,
        role: Role.MANAGER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Gestor Enf Noturno',
        email: 'gestor.enf.noturno@hospital.com',
        password: await hashPassword('gestor.enf.noturno@hospital.com'),
        department_id: enfDepartment.id,
        role: Role.MANAGER,
      },
    }),
  ])

  const enfermeiros = await Promise.all(
    Array.from({ length: 18 }, async (_, i) => {
      const isDiurno = i < 9 // 9 diurnos, 9 noturnos
      return prisma.user.create({
        data: {
          name: `Enfermeiro ${i + 1} ${isDiurno ? 'Diurno' : 'Noturno'}`,
          email: `enf${i + 1}.${isDiurno ? 'diurno' : 'noturno'}@hospital.com`,
          password: await hashPassword(
            `enf${i + 1}.${isDiurno ? 'diurno' : 'noturno'}@hospital.com`,
          ),
          department_id: enfDepartment.id,
          role: Role.USER,
        },
      })
    }),
  )

  // Criando turnos
  const shifts = await Promise.all([
    prisma.shift.create({
      data: { department_id: tiDepartment.id, type: ShiftType.DIURNAL },
    }),
    prisma.shift.create({
      data: { department_id: enfDepartment.id, type: ShiftType.DIURNAL },
    }),
    prisma.shift.create({
      data: { department_id: enfDepartment.id, type: ShiftType.NOCTURNAL },
    }),
  ])

  const tiShift = shifts[0]
  const enfDiurnoShift = shifts[1]
  const enfNoturnoShift = shifts[2]

  // Função para adicionar dias a uma data
  function addDays(date, days) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
  }

  // 3. Criando escalas mensais com 12x36 para abril de 2025
  const schedules = await Promise.all(
    [adminTI, ...enfermeiros].map(async (user, index) => {
      const isTI = user.department_id === tiDepartment.id
      const isDiurno = index <= 9 // Admin + 9 diurnos
      const shift = isTI ? tiShift : isDiurno ? enfDiurnoShift : enfNoturnoShift

      const schedule = await prisma.schedule.create({
        data: {
          user_id: user.id,
          name: `Escala ${user.name} - Abril 2025`,
          start_date: new Date('2025-04-01'),
          end_date: new Date('2025-04-30'),
        },
      })

      const weekDays = [
        WeekDay.SUNDAY,
        WeekDay.MONDAY,
        WeekDay.TUESDAY,
        WeekDay.WEDNESDAY,
        WeekDay.THURSDAY,
        WeekDay.FRIDAY,
        WeekDay.SATURDAY,
      ]

      const scheduleShifts: Prisma.ScheduleShiftCreateManyInput[] = []
      let startDate = new Date('2025-04-01') // Terça-feira

      if (isTI) {
        // Escala para Admin TI (mantida como estava)
        let date = startDate
        while (date <= new Date('2025-04-30')) {
          scheduleShifts.push({
            schedule_id: schedule.id,
            shift_id: shift.id,
            day_week: weekDays[date.getDay()],
            date: new Date(date),
          })
          date = addDays(date, 3) // 12h trabalho, 36h folga
        }
      } else {
        // Escala para enfermeiros com grupos alternados
        const enfIndex = index - 1 // Subtrai 1 por causa do adminTI no índice 0
        const groupIndex = isDiurno
          ? Math.floor(enfIndex / 3) // Grupos 0, 1, 2 para diurnos
          : Math.floor((enfIndex - 9) / 3) // Grupos 0, 1, 2 para noturnos
        const startOffset = groupIndex // 0, 1 ou 2 dias de offset
        startDate = addDays(startDate, startOffset)

        let date = startDate
        while (date <= new Date('2025-04-30')) {
          scheduleShifts.push({
            schedule_id: schedule.id,
            shift_id: shift.id,
            day_week: weekDays[date.getDay()],
            date: new Date(date),
          })
          date = addDays(date, 3) // 12h trabalho, 36h folga
        }
      }

      await prisma.scheduleShift.createMany({ data: scheduleShifts })
      return schedule
    }),
  )

  // Pegando todos os ScheduleShifts para o turno diurno
  const allScheduleShiftsDiurno = await prisma.scheduleShift.findMany({
    where: { shift_id: enfDiurnoShift.id },
  })

  await prisma.shiftExchangeRequest.createMany({
    data: [
      // 1. Solicitação Pendente: Enfermeiro 1 Diurno solicita troca com Enfermeiro 2 Diurno
      {
        applicant_id: enfermeiros[0].id, // Enfermeiro 1 Diurno
        receptor_id: enfermeiros[1].id, // Enfermeiro 2 Diurno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.PENDING,
        origin_shift_id: allScheduleShiftsDiurno[0].id, // Turno do Enfermeiro 1
        destination_id: allScheduleShiftsDiurno[1].id, // Turno do Enfermeiro 2
        reason: 'Conflito de horário',
      },
      // 2. Solicitação Aprovada pelo Receptor: Enfermeiro 3 Diurno solicita troca com Enfermeiro 1 Diurno
      {
        applicant_id: enfermeiros[2].id, // Enfermeiro 3 Diurno
        receptor_id: enfermeiros[0].id, // Enfermeiro 1 Diurno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.APPROVED_RECEIVER,
        origin_shift_id: allScheduleShiftsDiurno[2].id, // Turno do Enfermeiro 3
        destination_id: allScheduleShiftsDiurno[0].id, // Turno do Enfermeiro 1
        reason: 'Preferência por outro dia',
      },
      // 3. Solicitação Aprovada pelo Gestor: Enfermeiro 1 Diurno solicita troca com Enfermeiro 4 Diurno
      {
        applicant_id: enfermeiros[0].id, // Enfermeiro 1 Diurno
        receptor_id: enfermeiros[3].id, // Enfermeiro 4 Diurno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.APPROVED_MANAGER,
        origin_shift_id: allScheduleShiftsDiurno[0].id, // Turno do Enfermeiro 1
        destination_id: allScheduleShiftsDiurno[3].id, // Turno do Enfermeiro 4
        reason: 'Ajuste de escala',
      },
      // 4. Solicitação Rejeitada pelo Receptor: Enfermeiro 1 Diurno solicita troca com Enfermeiro 5 Diurno
      {
        applicant_id: enfermeiros[0].id, // Enfermeiro 1 Diurno
        receptor_id: enfermeiros[4].id, // Enfermeiro 5 Diurno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.REJECTED,
        origin_shift_id: allScheduleShiftsDiurno[0].id, // Turno do Enfermeiro 1
        destination_id: allScheduleShiftsDiurno[4].id, // Turno do Enfermeiro 5
        reason: 'Motivo pessoal',
      },
      // 5. Solicitação Rejeitada pelo Gestor: Enfermeiro 6 Diurno solicita troca com Enfermeiro 1 Diurno
      {
        applicant_id: enfermeiros[5].id, // Enfermeiro 6 Diurno
        receptor_id: enfermeiros[0].id, // Enfermeiro 1 Diurno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.PENDING,
        origin_shift_id: allScheduleShiftsDiurno[5].id, // Turno do Enfermeiro 6
        destination_id: allScheduleShiftsDiurno[0].id, // Turno do Enfermeiro 1
        reason: 'Necessidade de cobertura',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}
