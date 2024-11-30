import { OccasionBaseSchema, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient()

export const createOccationRepository = () => {
  return {
    async getAllOccations() {
      const variable =  await prisma.occasionBaseSchema.findMany({
        include: {
            participants: true,
            body:{
              select: {
                content: true
              }
            },
            waitingListParticipants: true,
            rejectedParticipants: true,
            templates: true
        }
      });

      const bodyList = []

      for(object in prisma.body) {
      bodylist.push(object.content)
      }

const data = {id = prisma.id, .... body = bodyList}
      console.log("getall sjekk " + JSON.stringify(variable))
      return{success: true, data: variable}
    },

    async getOccasionById(occationSlug: string) {
        return await prisma.occasionBaseSchema.findUnique({
          where: { slug: occationSlug },
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
        body: string[];
        waitingList: boolean;
        template?: string | null;
        maxParticipants?: number;
       
        
      }) {
        return await prisma.occasionBaseSchema.create({
          data: {
            name: data.name,
            slug: data.slug,
            price: data.price,
            adress: data.address,
            body: data.body,
            waitingList: data.waitingList,
            template: data.template ?? null,
            maxParticipants: data.maxParticipants,
          },
        });
      },
      

      async updateOccasion(occasionSlug: string, data: Partial<Omit<OccasionBaseSchema, 'id' | 'slug'>>) {
        return await prisma.occasionBaseSchema.update({
          where: { slug: occasionSlug},
          data,
        });
      },

      async deleteOccasion(occasionSlug: string) {
        return await prisma.occasionBaseSchema.delete({
          where: { slug: occasionSlug },
        });
      },
      
    async addParticipantToOccasion(occasionSlug: string, participantData: { name: string; email: string; approvalStatus: string }) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where:{ slug: occasionSlug  }});
      if (!occasion) throw new Error('Occasion not found');
      return await prisma.participant.create({
        data: {
          name: participantData.name,
          email: participantData.email,
          approvalStatus: participantData.approvalStatus,
          OccasionBaseSchema: {
            connect: { slug: occasionSlug },
          },
        },
      });
    },

  
    async addParticipantToWaitingList(occasionSlug: string, participantData: { name: string; email: string; status: string }) {
      const occasion = await prisma.occasionBaseSchema.findUnique({ where: { slug: occasionSlug } });
      if (!occasion) throw new Error('Occasion not found');
      return await prisma.participant.create({
        data: {
          name: participantData.name,
          email: participantData.email,
          approvalStatus: participantData.status,
          WaitingOccasionBaseSchema: {
          connect: { slug: occasionSlug },
        },
      },
    });
  },
}
//getSortedOccasions(month: Month, year: number, category: OccasionCategory)
    
  
}

export const occasionRepository = createOccationRepository()
export type OccasionRepository = ReturnType<typeof createOccationRepository>;


/*
#### @/features/admin/services/repository/index.ts
- Innerste laget. 
- Snakker mot DB - henter, oppretter etc, SQL/Prisma kode her.
- Verifiserer data (se på ../helpers og ../mappers mappene også)
- Returnerer data
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/repository/index.ts

*/