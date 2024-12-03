

/*
#### @/features/admin/services/repository/index.ts
- Innerste laget. 
- Snakker mot DB - henter, oppretter etc, SQL/Prisma kode her.
- Verifiserer data (se på ../helpers og ../mappers mappene også)
- Returnerer data
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/repository/index.ts

*/

import { CreateParticipant, Result, Weekday } from '@/types';
import { PrismaClient, TemplateBaseSchema } from '@prisma/client'
import { CreateTemplate, Template } from '../..';
import { UUID } from 'crypto';

const prisma = new PrismaClient()

export const createTemplateRepository = () => {
  return{

    async getAllTemplates() {
      try {
        const prismadata = await prisma.templateBaseSchema.findMany({
          where:{
            isPrivate: false
          },
          include: {
            fixedWeekDays: {  
                select: {
                    weekdays: true  
                }
            }
        }
    });
    

        return prismadata
        
      } catch (error) {
        throw new Error("error")
      }
    },

    async getOneTemplate(id: UUID){
      try {
        const prismadata = await prisma.templateBaseSchema.findUnique({
          where: {id: id}
        })

        return prismadata
      } catch (error) {
        throw new Error("error")
      }
    },

    async createTemplate(data: CreateTemplate){
      try {
        const prismadata = await prisma.templateBaseSchema.create({
          data:{
            id: data.id,
            name: data.name,
            isPrivate: data.isPrivate,
            fixedPrice: data.fixedPrice,
            allowSameDayEvent: data.allowSameDayEvent,
            waitList: data.waitList,
            limitedParticipants: data.limitedParticipants,
            fixedWeekDays: {
              create: data.fixedWeekdays.map(day => ({
                weekdays: day
              }))
            },
            price: data.price,
            maxParticipants: data.maxParticipants
            
          }
        })
        return prismadata
      } catch (error) {
        console.log("Åneeei ", error)
        throw new Error("error")
      }
    },

    async updateTemplate(id: string, data: Partial<Omit<TemplateBaseSchema, "id">>){

      try {
        const prismaData = await prisma.templateBaseSchema.update({
          where: {id: id},
          data,
        })
        if(!prismaData){
          throw new Error("Error updating the template")
        }
        return prismaData
      } catch (error) {
        throw new Error("error")
      }
      
    },

    async deleteTemplate(id: string){
      try {
        const prismaData = await prisma.templateBaseSchema.delete({
          where: {id: id}
        })

        if(!prismaData){
          throw new Error("Error deleteing the template")
        }
        return prismaData

      } catch (error) {
        throw new Error("error")
      }
    }

  }
}

export const templateRepository = createTemplateRepository()
export type TemplateRepository = ReturnType<typeof createTemplateRepository>