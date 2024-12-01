

/*
#### @/features/admin/services/repository/index.ts
- Innerste laget. 
- Snakker mot DB - henter, oppretter etc, SQL/Prisma kode her.
- Verifiserer data (se på ../helpers og ../mappers mappene også)
- Returnerer data
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/repository/index.ts

*/

import { CreateParticipant } from '@/types';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createParticipant = async (data: CreateParticipant) => {
  return prisma.participant.create({ data });
};

export const findParticipantById = async (id: string) => {
  return prisma.participant.findUnique({ where: { id } });
};