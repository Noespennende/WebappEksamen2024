import {eventRepository, EventRepository} from "../repository"

export  const createEventService = (
    eventRepository: EventRepository
) => {}

export const eventService = createEventService( eventRepository)
export type EventService = ReturnType<typeof createEventService>;
/*
#### @/features/admin/services/service/index.ts
- Laget mellom controller og repository
- Bruker services/repository
- ex: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/features/habits/service/index.ts

*/