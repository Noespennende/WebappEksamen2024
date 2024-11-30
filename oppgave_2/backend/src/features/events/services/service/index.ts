import { OccasionInput } from "@/types";
import { OccasionRepository } from "../repository"; // Correct import now
import { PrismaClient, OccasionBaseSchema } from "@prisma/client";
import { UUID } from "crypto";



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

      async getOccasionById(id: UUID) {
        try {
          const occasion = await occasionRepository.getOccasionById(id);
          if (!occasion) {
            throw new Error(`No occasion found with the ID: ${id}`);
          }
          return occasion;
        } catch (error) {
          throw new Error("Error: Unable to fetch the occasion by ID");
        }
      },
      async createAnOccasion(data: OccasionInput) { // denne typen kan kanskje endres?
        try {
          const newOccasion = await occasionRepository.createOccasion(data);
          return newOccasion;
        } catch (error) {
          throw new Error(`Can't create the new occasion. Details: ${error}`);
        }
      },

      async deleteOccasion(id: UUID){
       try {
        const occasionAfterDelete = await occasionRepository.deleteOccasion(id)
        return occasionAfterDelete
       } catch (error) {
        throw new Error("DeleteError")
       } 
      },

      async updateOccation(id: UUID, data: Partial<OccasionBaseSchema>){
        try{
        const occasionToUpdate = await occasionRepository.updateOccasion(id, data)
        return occasionToUpdate
      }catch{
        throw new Error("error updating")
      }
    }
    };
  };
    
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/