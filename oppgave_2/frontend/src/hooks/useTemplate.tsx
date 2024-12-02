import { Template } from "@/features/template/types"
import { Status, templateHookReturn } from "./types"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { formatTemplateFetchUrl } from "@/helpers/config"


    
export function useTemplate () {

    //Data variables
    const [data, setData] = useState<Template[]>([])

    //Status variables
    const [status, setStatus] = useState<Status>("idle")
    const [error, setError] = useState<string | null>(null)

    //Status helper variables
    const isFetching = status === "fetching"
    const isPosting = status === "posting"
    const isDeleting = status === "deleting"
    const isLoading = status === "loading" || isFetching || isPosting || isDeleting
    const isError = status === "error" || !!error;
    const isIdle = status === "idle";
    const isSuccess = status === "success";

    //Status helper functions
    const resetToIdle = useCallback(
        (timeout = 2000) =>
          setTimeout(() => {
            setStatus("idle");
          }, timeout),
        []
      )

      //Redirect functions
      const redirect = (redirectLocation: string) => {
        const router = useRouter();
        router.push(`${redirectLocation}`)
    };

    //FETCHES
    //get all occasions
    const getTemplates = useCallback(async () => {
        setStatus("fetching")
        await fetch(`${formatTemplateFetchUrl("get")}`)
        .then((response) => response.json())
        .then((responseData) => {setData(responseData.data)})
        .then(() => setStatus("success"))
        .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
        .finally(() => {resetToIdle()})
        }, [])

        //get one
    const getOneTemplate = async (slug: string | undefined) => {
        setStatus("fetching")
        await fetch(`${formatTemplateFetchUrl("getOne", slug)}`)
        .then((response) => response.json())
        .then((responseData) => setData(responseData.data))
        .then(() => setStatus("success"))
        .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
        .finally(() => resetToIdle())
    }

    //create temlate
    const addTemplate = async (data: Template) => {
        setStatus("posting")
        await fetch(`${formatTemplateFetchUrl("post")}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {!response.ok ? (setError(`Post request failed: ${response.status}`), setStatus("error")) : (setStatus("success"))})
        .then((responsedata) => {setData(responsedata.data),  redirect(`/arrangementer/mal/${data.id}`)})
        .catch((error => {setError(`Error while posting data: ${error}`), setStatus("error")}))
        .finally(() => resetToIdle()
        )}


        //delete template
    const removeTemplate = async (id: string) => {
        setStatus("deleting")
        await fetch(`${formatTemplateFetchUrl("delete", id)}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'},
            body: ""
        })
        .then((response) => {!response.ok ? (setError(`Delete request failed: ${response.status}`), setStatus("error")) : (setStatus("success"), redirect("/"))})
        .catch((error => {setError(`Error while deleteing data: ${error}`), setStatus("error")}))
        .finally(() => resetToIdle())   
        }
    
        //update Template
        const updateTemplate = async (data: Template) => {
            setStatus("posting")
            await fetch(`${formatTemplateFetchUrl("update", data.id)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((response) => {!response.ok ? (setError(`Post request failed: ${response.status}`), setStatus("error")) : (setStatus("success"), redirect(`/arrangementer/mal/${data.id}`))})
            .catch((error => {setError(`Error while posting data: ${error}`), setStatus("error")}))
            .finally(() => resetToIdle()
        )}


    useEffect(() => {
        //Fetch templates from server
        const controller = new AbortController()
        getTemplates()
        return() => controller.abort()
    },[getTemplates])
    


    //Return object
    const returnResponse: templateHookReturn = {
        get: getTemplates,
        getOne: getOneTemplate,
        create: addTemplate,
        remove: removeTemplate,
        update: updateTemplate,
        data: data,
        error: error,
        status: {
            idle: isIdle,
            loading: isLoading,
            success: isSuccess,
            error: isError,
            fetching: isFetching,
            posting: isPosting,
            deleting: isDeleting
        },
    }

    return returnResponse
}