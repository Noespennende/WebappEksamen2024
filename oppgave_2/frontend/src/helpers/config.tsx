import { backendUrl, eventUrl } from "@/config"
import { Fetch } from "@/hooks/types"

export const sortParam = "sorting"
export const getOneParam = "event-slug"
export const deleteParam = getOneParam
export const updateParam = getOneParam


export const occasionGet = `/`
export const occasionSort = `/sort/`
export const occasionGetOne = `/`
export const occasionCreate = `/create`
export const occasionUpdate = `/create/`
export const occasionDelete = `/delete`


export const formatOccasionFetchUrl = (fetchType: Fetch, id?: string) => {
    if (fetchType === "get"){
        return (`${backendUrl}${eventUrl}${occasionGet}`)
    } else if (fetchType === "post"){
        return `${backendUrl}${eventUrl}${occasionCreate}`
    } else if (fetchType==="getOne" && id != null){
        return `${backendUrl}${eventUrl}${occasionGetOne}${id}`
    } else if (fetchType==="delete" && id != null){
        console.log("hit")
        return `${backendUrl}${eventUrl}/${id}${occasionDelete}`
    } else if (fetchType === "update"){
        return `${backendUrl}${eventUrl}${occasionCreate}/${id}$`
    }

}