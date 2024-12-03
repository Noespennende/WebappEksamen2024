

export const sortParam = "sorting"
export const getOneParam = "event-slug"
export const deleteParam = getOneParam
export const updateParam = getOneParam


export const eventsGet = `/`
export const eventsSort = `/sort/:${sortParam}`
export const eventsGetOne = `/:${getOneParam}`
export const eventCreate = `/create`
export const eventUpdate = `/create/:${updateParam}`
export const eventDelete = `/:${deleteParam}/delete`