import { Hono } from "hono";
import { errorResponse } from "../../../../lib/error";
import { occasionService, OccasionService } from "../service";
import { deleteParam, eventCreate, eventDelete, eventsGet, eventsGetOne, eventsSort, eventUpdate, getOneParam, sortParam, updateParam } from "../../helpers/config";
import { validateCreateOccation } from "../../helpers/schema";


export const createEventController = (occasionService: OccasionService) => {
    const app = new Hono()

    //get all events
    app.get(`${eventsGet}`, async (context) => {   
        try {
            const data = await occasionService.getAllOccasions() 
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
            const slug = context.req.param(sortParam)
            const parameters = slug.split("-")
            const month = parameters[0] === "null" ? null : parameters[0]
            const year = parameters[1] === "null" ? null : parameters[1]
            const category = parameters[2] === "null" ? null : parameters[2]
            
            const data = await occasionService.sortedOccasions(year, month, category)
            
            if(!data.success){
                return errorResponse(context, data.error.code, data.error.message)
            }
            return context.json(data)
        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to retrieve the data")
        }
    
    })

    //get one event
    app.get(`${eventsGetOne}`, async (context) => {
        try {
            const slug = context.req.param(getOneParam)
            const data = await occasionService.getOccasionById(slug) 
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
            console.log("newEventData: ", newEvent)
            console.log("\nType of body:", typeof newEvent.body);

            console.log(validateCreateOccation(newEvent[0]).error?.message)
            const result = await occasionService.createAnOccasion(newEvent[0])

            if (!result.success){
                return errorResponse(context, "BAD_REQUEST", result.error.message)
            }

            return context.json(result)

        } catch (error) {
            return errorResponse(context, "INTERNAL_SERVER_ERROR", "Server failed to update the data")
        }
    })

    //update event
    app.patch(`${eventUpdate}`, async (context) => {
        try {
            const eventSlug = context.req.param(updateParam)
            const eventData = await context.req.json()
            console.log(eventData)
            const result = await occasionService.updateOccation(eventSlug, eventData) 

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

            const result = await occasionService.deleteOccasion(eventSlug) 

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