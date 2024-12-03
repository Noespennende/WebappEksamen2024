import { OccasionBaseSchema, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import {Occation} from "../../types/index"
import { Month, OccasionCategory, Result } from "@/types";
import { MonthEnum } from "../../../../helpers/schema";

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
            template: true
          }
        });

        
      
        return prismadata;
      } catch (error) {
        
        throw new Error("Error ")
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
        return prismdata
      } catch (error) {
        console.error(`retrieving occasion with slug: ${occationSlug} Failed :`, error);
        throw new Error("Error ")
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
    
          return prismdata
      
        } catch (error) {
          console.error("Error creating occasion:", error);
          throw new Error("Error ")
        }

      },
      

      async updateOccasion(occasionSlug: string, data: Partial<Omit<OccasionBaseSchema, 'id' | 'slug'>>) {
        try{
        const prismData =  await prisma.occasionBaseSchema.update({
          where: { slug: occasionSlug},
          data,
        })
        return prismData
      }catch(error){
        console.log("error updating Occasion")
        throw new Error("Error ")
      }
      },

      async deleteOccasion(occasionSlug: string) {
        try {
          const prismData =await prisma.occasionBaseSchema.delete({
            where: { slug: occasionSlug },
          });

          return prismData
        } catch (error) {
          console.log("error deleting Occasion")
          throw new Error("Error ")
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

  
  async getSortedOccasions(year: number | null, month: Month | null, category: OccasionCategory | null) {
    try {
      
        let startDate: Date, endDate: Date;
        console.log("category " + category)
        if (year !== null && month !== null) {
          const monthIndex = MonthEnum.options.indexOf(month as Month);
          if (monthIndex === -1) {
              throw new Error(`Invalid month: ${month}`);
          }

          console.log("month index:", monthIndex, month);

      
          startDate = new Date(year, monthIndex, 1); 
          endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);
      } else if (year !== null) {
          startDate = new Date(year, 0, 1);
          endDate = new Date(year, 11, 31, 23, 59, 59, 999); 
      } else {
      
          startDate = new Date(0); 
          endDate = new Date();
      }
      
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();

        const where: any = {};
        if (year !== null) {
            where.date = {
                gte: new Date(startTimestamp),
                lte: new Date(endTimestamp),
            };
        }
        if (category !== null) {
            where.category = category;
        }

        console.log("Prisma parameters:", where);

        const occasions = await prisma.occasionBaseSchema.findMany({
            where,
        });

        console.log("Occasions:", occasions);
        return occasions;
    } catch (error) {
        console.error("Error in query:", error); 
        throw new Error("Error fetching occasions");
    }
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