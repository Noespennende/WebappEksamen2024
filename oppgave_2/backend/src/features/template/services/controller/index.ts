//MAL
import { errorResponse } from "../../../../lib/error";
import { Hono } from "hono";
import { deleteParam, getOneParam, patchParam, templateCreate, templateDelete, templateGetOne, templatePatch, templatesGet } from "../helpers/config";
import { templateService, TemplateService } from "../service";


export const createTemplateController = (templateService: TemplateService) => {
    const app = new Hono()

    //get all templates
    app.get(`${templatesGet}`, async (context) => {
        try {
            const data = await templateService.getAllTemplates() 

            if (!data.success){
                return errorResponse(context, data.error.code, data.error.message)
            }

            return context.json(data)
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to retrieve the data")
        }
    })

    //get single template
    app.get(`${templateGetOne}`, async (context) => {
        try {
            const templateID = context.req.param(getOneParam)
            const data = await templateService.getATemplate(templateID)
            return context.json(data)
            if(!data.success){
                return errorResponse(context, data.error.code, data.error.message)
            }
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to retrieve the data")
        }
    
    })

    //create template
    app.post(`${templateCreate}`, async (context) => {
        try {
            const newTemplate = await context.req.json()

            console.log("template make: ", newTemplate)
            const response = await templateService.createTemplate(newTemplate) //GJØR RIKTIG KALL HER

            console.log("response make: ", response)
            if (!response.success){
                return errorResponse(context, data.error.code, data.error.message)
            }

            return context.json(response)
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to update the data")
        }
    })


    //update template
    app.patch(`${templatePatch}`, async (context) => {
        try {
            const eventID= context.req.param(patchParam)
            const eventData = await context.req.json()

            const result = await templateService.updateTemplate(eventID, eventData) 

            if (!result.success){
                return errorResponse(context, result.error.code, result.error.message)
            }

            return context.json(result)

        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to update the data")
        }
    })


    //delete template
    app.delete(`${templateDelete}`, async (context) => {
        try {
            const eventSlug= context.req.param(deleteParam)

            const result = await templateService.deleteTemplate(eventSlug) 

            if (!result.success){
                return errorResponse(context, result.error.code, result.error.message)
            }

            return context.json(result)

        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to delete the data")
        }
    })

    
    return app;
}

export const templateController = createTemplateController(templateService)

/*
#### @/features/admin/services/controller/index.ts
- CRUD operasjoner (app.post, app.get, etc.).
- Ytterste laget mot frontend
- Bruker service/index.ts
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/controller/index.ts

*/

