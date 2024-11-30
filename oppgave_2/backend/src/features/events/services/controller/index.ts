import { Hono } from "hono";
import { errorResponse } from "@/lib/error";
import { eventService, EventService } from "../service";
import { deleteParam, eventCreate, eventDelete, eventsGet, eventsGetOne, eventsSort, eventUpdate, getOneParam, sortParam, updateParam } from "../../helpers/config";


export const createEventController = (eventService: EventService) => {
    const app = new Hono()

    //get all events
    app.get(`${eventsGet}`, async (context) => {
        try {
            const data = await eventService //GJØR RIKTIG KALL HER

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
            const sorting = context.req.param(sortParam)
            const data = await eventService //GJØR RIKTIG KALL HER
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
            const sorting = context.req.param(getOneParam)
            const data = await eventService //GJØR RIKTIG KALL HER
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

            const result = await eventService //GJØR RIKTIG KALL HER

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
            const eventToEdit = await context.req.json()

            const result = await eventService //GJØR RIKTIG KALL HER

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

            const result = await eventService //GJØR RIKTIG KALL HER

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

export const eventController = createEventController(eventService)

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