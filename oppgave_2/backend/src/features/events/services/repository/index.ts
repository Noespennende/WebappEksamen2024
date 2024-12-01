import { OccasionBaseSchema, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import {Occation} from "../../types/index"
import { Month, OccasionCategory, Result } from "@/types";

const prisma = new PrismaClient()


export const createOccationRepository = () => {
  return {
    async getAllOccations() {
      try {
        
        const prismadata = await prisma.occasionBaseSchema.findMany({
          include: {
            participants: true,
            body: {
              select: {
                content: true
              }
            },
            waitingListParticipants: true,
            rejectedParticipants: true,
            templates: true
          }
        });

        const result: Result<Occation[]> = { success: true, data: prismadata };
      
        return result;
      } catch (error) {
        
        console.error("retrieving occasions Failed :", error);
        const result: Result<null> = { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch occasions" } };
        return result;
      }
    },
  


    async getOccasionById(occationSlug: string) {

      try {
        const prismdata = await prisma.occasionBaseSchema.findUnique({
          where: { slug: occationSlug },
          include: {
            participants: true,
            waitingListParticipants: true,
            rejectedParticipants: true,
            templates: true,
          },
        });
        const result: Result<Occation[]> = {success: true, data: prismdata}
        return result
      } catch (error) {
        console.error(`retrieving occasion with slug: ${occationSlug} Failed :`, error);
        const result: Result<null> = { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: `failed to fetch occasionwith slug: ${occationSlug}` } };
        return result;
      }},

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
        try {
       
          const prismdata = await prisma.occasionBaseSchema.create({
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
    
          const result: Result<Occation[]> = { success: true, data: prismdata };
          return result;
      
        } catch (error) {
          console.error("Error creating occasion:", error);

      
          const result: Result<null> = { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to create Occasion" } };
        return result;
        }

      },
      

      async updateOccasion(occasionSlug: string, data: Partial<Omit<OccasionBaseSchema, 'id' | 'slug'>>) {
        try{
        const prismData =  await prisma.occasionBaseSchema.update({
          where: { slug: occasionSlug},
          data,
        })
        const result: Result<Occation[]> = { success: true, data: prismData };
        return result;
      }catch(error){
        console.log("error updating Occasion")
        const result: Result<null> = {success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "Failed to update Occasion"}}
        
        return result
      }
      },

      async deleteOccasion(occasionSlug: string) {
        try {
          const prismData =await prisma.occasionBaseSchema.delete({
            where: { slug: occasionSlug },
          });

          const result: Result<Occation[]> = { success: true, data: prismData };
        return result;
        } catch (error) {
          console.log("error deleting Occasion")
          const result: Result<null> = {success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "Failed to delete Occasion"}}
          
          return result
        }
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

  
  async getSortedOccasions(year: number, month: Month,  category: OccasionCategory){
    const monthIndex = Object.keys(month).indexOf(month);
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 1);
    const occasions = await prisma.occasionBaseSchema.findMany({
      where: {
          category,
          date: {
              gte: startDate,
              lt: endDate,
          },
      },
  });

  const result: Result<null> = {success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "Failed to delete Occasion"}}
          
  return result
  
}
}

    
  
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