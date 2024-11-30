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

     
  };
    
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/