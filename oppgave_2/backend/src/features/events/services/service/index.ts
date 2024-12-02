import { occasionRepository, OccasionRepository } from "../repository";

import { PrismaClient, OccasionBaseSchema } from "@prisma/client";
import { CreateOccation, Month, OccasionCategory, Occation } from "../../types";
import { MonthEnum, OccasionCategoryEnum } from "@/helpers/schema";
import { Result } from "@/types";


export const createOccasionService = (occasionRepository: OccasionRepository) => {
    return {
      async getAllOccasions() {
        try {
          const occasions = await occasionRepository.getAllOccations();

          if(!occasions){
            const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: "Failed to get occations" } };
              return result
          }
          const result: Result<Occation[]> = {success: true, data: occasions}
              return result

        } catch (error) {
          const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: "Failed to get occations" } };
              return result
        }
      },

      
      async getOccasionById(slug: string) {
        try {
          const occasion = await occasionRepository.getOccasionById(slug);
          if (!occasion) {
            const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: `occations with slug ${slug} not found` } };
              return result
          }

          const result: Result<Occation[]> = {success: true, data: occasion}
              return result

        } catch (error) {
          const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: `occations with slug ${slug} not found` } };
              return result
        }
      },
      async createAnOccasion(data: CreateOccation) { // denne typen kan kanskje endres?
        try {
          const newOccasion = await occasionRepository.createOccasion(data);

          if(!newOccasion){
            const result: Result<null> = { success: false, error: { code: "BAD_REQUEST", message: "Failed to create occation" } };
              return result
          }

          const result: Result<Occation[]> = {success: true, data: newOccasion}
              return result

        } catch (error) {
          const result: Result<null> = { success: false, error: { code: "BAD_REQUEST", message: "Failed to create occation" } };
              return result
        }
      },

      async deleteOccasion(occasionSlug: string){
       try {
        const occasionAfterDelete = await occasionRepository.deleteOccasion(occasionSlug)
        
        if(!occasionAfterDelete){
          const result: Result<null> = { success: false, error: { code: "BAD_REQUEST", message: "Failed to delete occation" } };
              return result
        }

        const result: Result<Occation[]> = {success: true, data: occasionAfterDelete}
            return result
       } catch (error) {
        const result: Result<null> = { success: false, error: { code: "BAD_REQUEST", message: "Failed to delete occation" } };
              return result
       } 
      },

      async updateOccation(occasionSlug: string, data: Partial<OccasionBaseSchema>){
        try{
        const occasionToUpdate = await occasionRepository.updateOccasion(occasionSlug, data)
        
        if(!occasionToUpdate){
          const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: "Failed to update occation" } };
              return result
        }
        const result: Result<Occation[]> = {success: true, data: occasionToUpdate}
        return result

      }catch{
        const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: "Failed to update occation" } };
        return result
      }
    },

  
    async sortedOccasions(year: number, month: Month, category: OccasionCategory) {

      const occasions = await occasionRepository.getSortedOccasions(year, month, category);
      if (!occasions.success) {
        throw new Error("Error fetching sorted occasions");
      }
      return occasions
    }
  };
}

  

  export const occasionService = createOccasionService(occasionRepository)
  export type OccasionService = ReturnType<typeof createOccasionService>;
    
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/