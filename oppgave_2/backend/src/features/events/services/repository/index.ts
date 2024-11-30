import { OccasionBaseSchema, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient()

export const createOccationRepository = () => {
  return {
    async getAllOccations() {
      return await prisma.occasionBaseSchema.findMany({
        include: {
            participants: true,
            waitingListParticipants: true,
            rejectedParticipants: true,
            templates: true
        }
      });
    },

    async getOccasionById(id: string) {
        return await prisma.occasionBaseSchema.findUnique({
          where: { id },
          include: {
            participants: true,
            waitingListParticipants: true,
            rejectedParticipants: true,
            templates: true,
          },
        });
      },

      async createOccasion(data: {
        name: string;
        slug: string;
        price: number;
        address: string;
        waitingList: boolean;
        template: string;
        maxParticipants: number;
        category: string;
        date: Date;
        participants?: { name: string; email: string; status: string }[];
        waitingListParticipants?: { name: string; email: string; status: string }[];
        rejectedParticipants?: { name: string; email: string; status: string }[];
        templates?: string[]; 
      }) {
        return await prisma.occasionBaseSchema.create({
          data: {
            name: data.name,
            slug: data.slug,
            price: data.price,
            adress: data.address,
            waitingList: data.waitingList,
            template: data.template,
            maxParticipants: data.maxParticipants,
            category: data.category,
            date: data.date,
            participants: {
              create: data.participants?.map(p => ({
                name: p.name,
                email: p.email,
                approvalStatus: p.status
              })),
            },
            waitingListParticipants: {
              create: data.waitingListParticipants?.map(p => ({
                name: p.name,
                email: p.email,
                approvalStatus: p.status,
              })),
            },
            rejectedParticipants: {
              create: data.rejectedParticipants?.map(p => ({
                name: p.name,
                email: p.email,
                approvalStatus: p.status,
              })),
            },
            templates: {
              connect: data.templates?.map(templateId => ({
                id: templateId,
              })),
            },
          },
        });
      },

      async updateOccasion(id: UUID, data: Partial<Omit<OccasionBaseSchema, 'id' | 'slug'>>) {
        return await prisma.occasionBaseSchema.update({
          where: { id },
          data,
        });
      },

      async deleteOccasion(id: UUID) {
        return await prisma.occasionBaseSchema.delete({
          where: { id },
        });
      },
      
    async addParticipantToOccasion(occasionId: UUID, participantData: { name: string; email: string; status: string }) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: occasionId  }, participantData);
      if (!occasion) throw new Error('Occasion not found');
      return await prisma.participant.create({
        data: {
          name: participantData.name,
          email: participantData.email,
          status: participantData.status,
          occasionId: occasion.id,
        },
      });
    },

    // Add a participant to the waiting list
    async addParticipantToWaitingList(occasionSlug: string, participantData: { name: string; email: string; status: string }) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: { slug: occasionSlug } });
      if (!occasion) throw new Error('Occasion not found');
      return await prisma.participant.create({
        data: {
          name: participantData.name,
          email: participantData.email,
          status: participantData.status,
          occasionId: occasion.id,
          waitingListOccasionId: occasion.id,
        },
      });
    },

    // Reject a participant from an occasion
    async rejectParticipantFromOccasion(occasionSlug: string, participantEmail: string) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: { slug: occasionSlug } });
      if (!occasion) throw new Error('Occasion not found');
      const participant = await prisma.participant.findUnique({
        where: { email: participantEmail },
      });
      if (!participant) throw new Error('Participant not found');
      
      return await prisma.participant.update({
        where: { id: participant.id },
        data: {
          status: 'rejected',
          rejectedOccasionId: occasion.id,
        },
      });
    },
  };
};
  };
};

export type OccasionRepository = ReturnType<typeof createOccationRepository>;

/*
 // Add participant to an occasion
    async addParticipantToOccasion(occasionSlug: string, participantData: { name: string; email: string; status: string }) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: { slug: occasionSlug } });
      if (!occasion) throw new Error('Occasion not found');
      return await prisma.participant.create({
        data: {
          name: participantData.name,
          email: participantData.email,
          status: participantData.status,
          occasionId: occasion.id,
        },
      });
    },

    // Add a participant to the waiting list
    async addParticipantToWaitingList(occasionSlug: string, participantData: { name: string; email: string; status: string }) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: { slug: occasionSlug } });
      if (!occasion) throw new Error('Occasion not found');
      return await prisma.participant.create({
        data: {
          name: participantData.name,
          email: participantData.email,
          status: participantData.status,
          occasionId: occasion.id,
          waitingListOccasionId: occasion.id,
        },
      });
    },

    // Reject a participant from an occasion
    async rejectParticipantFromOccasion(occasionSlug: string, participantEmail: string) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: { slug: occasionSlug } });
      if (!occasion) throw new Error('Occasion not found');
      const participant = await prisma.participant.findUnique({
        where: { email: participantEmail },
      });
      if (!participant) throw new Error('Participant not found');
      
      return await prisma.participant.update({
        where: { id: participant.id },
        data: {
          status: 'rejected',
          rejectedOccasionId: occasion.id,
        },
      });
    },
  };
};
*/

/*
#### @/features/admin/services/repository/index.ts
- Innerste laget. 
- Snakker mot DB - henter, oppretter etc, SQL/Prisma kode her.
- Verifiserer data (se på ../helpers og ../mappers mappene også)
- Returnerer data
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/repository/index.ts

*/