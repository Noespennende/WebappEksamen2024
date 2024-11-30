import { occasionRepository, OccasionRepository } from "../repository";

import { PrismaClient, OccasionBaseSchema } from "@prisma/client";
import { CreateOccation } from "../../types";


export const createOccasionService = (occasionRepository: OccasionRepository) => {
    return {
      async getAllOccasions() {
        try {
          const occasions = await occasionRepository.getAllOccations();
          return occasions;
        } catch (error) {
          throw new Error("Error: Can't find any Occasions");
        }
      },

      async getOccasionById(slug: string) {
        try {
          const occasion = await occasionRepository.getOccasionById(slug);
          if (!occasion) {
            throw new Error(`No occasion found with the ID: ${slug}`);
          }
          return occasion;
        } catch (error) {
          throw new Error("Error: Unable to fetch the occasion by ID");
        }
      },
      async createAnOccasion(data: CreateOccation) { // denne typen kan kanskje endres?
        try {
          const newOccasion = await occasionRepository.createOccasion(data);
          return newOccasion;
        } catch (error) {
          throw new Error(`Can't create the new occasion. Details: ${error}`);
        }
      },

      async deleteOccasion(occasionSlug: string){
       try {
        const occasionAfterDelete = await occasionRepository.deleteOccasion(occasionSlug)
        return occasionAfterDelete
       } catch (error) {
        throw new Error("DeleteError")
       } 
      },

      async updateOccation(occasionSlug: string, data: Partial<OccasionBaseSchema>){
        try{
        const occasionToUpdate = await occasionRepository.updateOccasion(occasionSlug, data)
        return occasionToUpdate
      }catch{
        throw new Error("error updating")
      }
    }

    
    };
  };


  export const occasionService = createOccasionService(occasionRepository)
  export type OccasionService = ReturnType<typeof createOccasionService>;
    
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/