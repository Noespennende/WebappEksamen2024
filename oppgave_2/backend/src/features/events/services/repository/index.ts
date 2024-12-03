import { OccasionBaseSchema, PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import {CreateOccation, Occation} from "../../types/index"
import { Month, OccasionCategory, Result } from "@/types";
import { MonthEnum, OccasionCategoryEnum } from "../../../../helpers/schema";

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
            template: true,
            body: {
              select: {
                content: true
              }
            },
          },
        });
        return prismdata
      } catch (error) {
        console.error(`retrieving occasion with slug: ${occationSlug} Failed :`, error);
        throw new Error("Error ")
      }},


      async createOccasion(data: CreateOccation) {
        try {
          console.log("repositorydata; ", data)
          //console.log("\nData received for creation:", JSON.stringify(data));
      // Log the type of body
    //console.log("\nIs body an array?", Array.isArray(data.body));
          console.log("HEYOOOOOO")
          console.log("Body entries ")
         
          const bodyArray = data.body as Array<string>
          console.log("bodyArray: ", bodyArray)
          const bodyEntries = bodyArray.map(content => ({
            content,  
            
          }));
          
          const prismdata = await prisma.occasionBaseSchema.create({
            data: {
              name: data.name,
              slug: data.slug,
              price: data.price,
              address: data.address,
              createdAt: data.createdAt,
              body: {
                create: bodyEntries,   
            },
              waitingList: data.waitinglist,
              template: data.template ? { connect: { id: data.template } } : undefined,
              maxParticipants: data.maxParticipants,
              category: data.category, 
                date: data.date,
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
          const prismData = await prisma.occasionBaseSchema.delete({
            where: { slug: occasionSlug },
          });

          return prismData
        } catch (error) {
          console.log("error deleting Occasion", error.message)
          throw new Error("Error ")
        }
      },
      
      async addParticipantToOccasion(occasionSlug: string, data: { name: string; email: string; approvalStatus: string }) {
        return await prisma.participant.create({
          data: {
            name: data.name,
            email: data.email,
            approvalStatus: data.approvalStatus,
            OccasionBaseSchema: {
              connect: { slug: occasionSlug },
            },
            registerDate: new Date(), 
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

  
  async getSortedOccasions(year: string | null, month: string | null, category: string | null) {
    try {
        let parsedYear: number | null = null;
        if (year) {
            parsedYear = parseInt(year);
            if (isNaN(parsedYear)) {
                throw new Error(`Invalid year: ${year}`);
            }
        }
        let startDate: Date, endDate: Date;

        let categoryEnum: OccasionCategory | null = null;
        if (category) {
            if (OccasionCategoryEnum.options.includes(category as OccasionCategory)) {
                categoryEnum = category as OccasionCategory;
            } else {
                throw new Error(`Invalid category: ${category}`);
            }
        }

        if (parsedYear !== null && month !== null) {
            const monthIndex = MonthEnum.options.indexOf(month as Month);
            if (monthIndex === -1) {
                throw new Error(`Invalid month: ${month}`);
            }

            startDate = new Date(parsedYear, monthIndex, 1);
            endDate = new Date(parsedYear, monthIndex + 1, 0, 23, 59, 59, 999);
        } else if (month !== null) {

            const currentYear = new Date().getFullYear();
            const monthIndex = MonthEnum.options.indexOf(month as Month);
            if (monthIndex === -1) {
                throw new Error(`Invalid month: ${month}`);
            }
            startDate = new Date(currentYear+1, monthIndex, 1);
            endDate = new Date(currentYear+1, monthIndex + 1, 0, 23, 59, 59, 999);
        } else if (parsedYear !== null) {
            startDate = new Date(parsedYear, 0, 1);
            endDate = new Date(parsedYear, 11, 31, 23, 59, 59, 999);
        } else {
            startDate = new Date(0);
            endDate = new Date();
        }

        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();

        const where: any = {};
        if (parsedYear !== null || month !== null) {
            where.date = {
                gte: new Date(startTimestamp),
                lte: new Date(endTimestamp),
            };
        }
        if (categoryEnum !== null) {
            where.category = categoryEnum;
        }
       
        console.log("Prisma parameters:", where);

        const occasions = await prisma.occasionBaseSchema.findMany({
            where,
            include: {
                participants: true,
                waitingListParticipants: true, 
                rejectedParticipants: true,
                body: true, 
            },
        });

        console.log("Occasions:", occasions);
        return occasions;
    } catch (error) {
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