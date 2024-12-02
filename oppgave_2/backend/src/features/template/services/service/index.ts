import { Result } from "@/types";
import { CreateTemplate, Template } from "../..";
import { templateRepository, TemplateRepository } from "../repository";
import { randomUUID, UUID, } from "crypto";
import { TemplateBaseSchema } from "@prisma/client";


 
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/

/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/

export const createTemplateService = (templateRepository: TemplateRepository) => {
    return {
        async getAllTemplates(){
            try {
                const templates = await templateRepository.getAllTemplates()

                if(!templates){
                    const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: "Failed to get templates" } };
                    return result
                }
                const result: Result<Template[]> = {success: true, data: templates}
                return result

            } catch (error) {
                const result: Result<null> = { success: false, error: { code: "NOT_FOUND", message: "Failed to get templates" } };
                    return result
            }
        },

        async getATemplate(id: UUID){
            try {
                /*const validUUID = isUuid(id)
                if (!validUUID) {
                    const result: Result<null> = {success: false, error:{code: "INVALID_UUID", message:`The provided ID: ${id} ist not valid uuid`}
                    };*/

                const singleTemplate = await templateRepository.getOneTemplate(id)

                if(!singleTemplate){
                    const result: Result<null> = {success: false, error:{code: "NOT_FOUND", message: `Template with id: ${id} not found`}}
                    return result
                }
                const result: Result<Template[]> = {success: true, data: singleTemplate}
                return result

            } catch (error) {
                const result: Result<null> = {success: false, error:{code: "NOT_FOUND", message: `Template with id: ${id} not found`}}
                    return result
            }
        },

        async createTemplate(data: CreateTemplate){
            try {
                const newTemplate = await templateRepository.createTemplate(data)
                
                if(!newTemplate){
                    const result: Result<null> = {success: false, error:{code: "BAD_REQUEST", message: "Failed to create template due to a server error"}}
                    return result
                }
                const result: Result<Template[]> = {success: true, data: newTemplate}
                return result

            } catch (error) {
                const result: Result<null> = {success: false, error:{code: "BAD_REQUEST", message: "Failed to create template due to a server error"}}
                return result
            }
        },

        async updateTemplate(id: string, data: Partial<TemplateBaseSchema>){
            try {
                const templateUpdate = await templateRepository.updateTemplate(id, data)

                if(!templateUpdate){
                    const result: Result<null> = {success: false, error: {code: "BAD_REQUEST", message:"Unable to update template"}}
                    return result
                }

                const result: Result<Template[]> = {success: true, data: templateUpdate}
                return result
            } catch (error) {
                const result: Result<null> = {success: false, error: {code: "BAD_REQUEST", message:"Unable to update template"}}
                    return result
            }
        },

        async deleteTemplate(id: string){
            try {
                const templateAfterDelete = await templateRepository.deleteTemplate(id)

                if(!templateAfterDelete){
                    const result: Result<null> = {success: false, error: {code: "BAD_REQUEST", message:"Unable to update template"}}
                    return result
                }
                const result: Result<Template[]> = {success: true, data: templateAfterDelete}
                return result

            } catch (error) {
                const result: Result<null> = {success: false, error: {code: "BAD_REQUEST", message:"Unable to update template"}}
                    return result
            }
        }
    }
}

export const templateService = createTemplateService(templateRepository)
export type TemplateService = ReturnType<typeof createTemplateService>;

function isUuid(id: string) {
    throw new Error("Function not implemented.");
}
