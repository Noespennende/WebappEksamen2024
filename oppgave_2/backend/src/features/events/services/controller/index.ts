import { Hono } from "hono";
import { errorResponse } from "../../../../lib/error";
import { occasionService, OccasionService } from "../service";
import { deleteParam, eventCreate, eventDelete, eventsGet, eventsGetOne, eventsSort, eventUpdate, getOneParam, sortParam, updateParam } from "../../helpers/config";


export const createEventController = (occasionService: OccasionService) => {
    const app = new Hono()

    //get all events
    app.get(`${eventsGet}`, async (context) => {   
        try {
            const data = await occasionService.getAllOccasions() 

            console.log(data)

            if (!data.success){
                return errorResponse(context, data.error.code, data.error.message)
            }

            return context.json(data)
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to retrieve the data")
        }
0
    })

    //get sorted events
    app.get(`${eventsSort}`, async (context) => {
        try {
            const month = context.req.query("month")
            const year = context.req.query("year")
            const category = context.req.query("category")
            const data = await occasionService.getAllOccasions(month, year, category)
            console.log(month,  year, category) //GJØR RIKTIG KALL HER
            return context.json(data)

            if(!data.success){
                return errorResponse(context, data.error.code, data.error.message)
            }
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to retrieve the data")
        }
    
    })

    //get one event
    app.get(`${eventsGetOne}`, async (context) => {
        try {
            const slug = context.req.param(getOneParam)
            const data = await occasionService.getOccasionById(slug) //GJØR RIKTIG KALL HER
            return context.json(data)

            if(!data.success){
                return errorResponse(context, data.error.code, data.error.message)
            }
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to retrieve the data")
        }
    
    })

    //create event
    app.post(`${eventCreate}`, async (context) => {
        try {
            const newEvent = await context.req.json()

            const result = await occasionService.createAnOccasion(newEvent)

            if (!result.success){
                return errorResponse(context, result.error.code, result.error.message)
            }

            return context.json(result)

        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to update the data")
        }
    })

    //update event
    app.patch(`${eventUpdate}`, async (context) => {
        try {
            const eventSlug= context.req.param(updateParam)
            const eventData = await context.req.json()

            const result = await occasionService.updateOccation(slug, eventData) //GJØR RIKTIG KALL HER

            if (!result.success){
                return errorResponse(context, result.error.code, result.error.message)
            }

            return context.json(result)

        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to update the data")
        }
    })


    app.delete(`${eventDelete}`, async (context) => {
        try {
            const eventSlug= context.req.param(deleteParam)

            const result = await occasionService.deleteOccasion(eventSlug) //GJØR RIKTIG KALL HER

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

export const eventController = createEventController(occasionService)

/*

const port = backendPort
serve({
    fetch: app.fetch,
    port
})*/


/*
#### @/features/events/services/controller/index.ts
- CRUD operasjoner (app.post, app.get, etc.).
- Ytterste laget mot frontend
- Bruker service/index.ts
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/controller/index.ts

*/