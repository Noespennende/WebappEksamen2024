

/*
#### @/features/admin/services/repository/index.ts
- Innerste laget. 
- Snakker mot DB - henter, oppretter etc, SQL/Prisma kode her.
- Verifiserer data (se på ../helpers og ../mappers mappene også)
- Returnerer data
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/repository/index.ts

*/

import { CreateParticipant, Result, Weekday } from '@/types';
import { PrismaClient } from '@prisma/client'
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
            fixedWeekDays:{
              select: {
                weekdays:true
              }
            }
          }
          
        })

        const result: Result<Template> = {success:true, data: prismadata}
      } catch (error) {
        const result: Result<null> = { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch Templates" } };
        return result;
      }
    },

    async getOneTemplate(id: UUID){
      try {
        const prismadata = await prisma.templateBaseSchema.findUnique({
          where: {id: id}
        })

        const result: Result<Template> = {success: true, data: prismadata}
        return result
      } catch (error) {
        const result: Result<null> = {success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch Templates"}}
        return result
      }
    },

    async createTemplate(data: {
      id: string,
      name: string,
      isPrivate: boolean,
      fixedPrice: boolean,
      allowSameDayEvent: boolean,
      waitList: boolean,
      limitedParticipants: boolean,
      fixedWeekDays: Weekday[],
      price: number,
      maxParticipants: number
     }){
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
              create: data.fixedWeekDays.map(day => ({
                weekdays: day
              }))
            },
            price: data.price,
            maxParticipants: data.maxParticipants
            
          }
        })
        const result: Result<Template> = {success: true, data: prismadata}
        return result
      } catch (error) {
        const result: Result<null> = {success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "Failed to create template"}}
        return result
      }
    }


  }
}