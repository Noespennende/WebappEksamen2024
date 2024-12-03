import { Occasion } from "@/features/events/types"
import { Status } from "./types"
import { useCallback, useEffect, useState } from "react"
import { formatOccasionFetchUrl} from "@/helpers/config"
import {OccasionHookReturn} from "../hooks/types"
import { useRouter } from "next/router"


export function useOccasion () {
    //Data variables
    const [data, setData] = useState<Occasion[]>([])

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
    const getOccasions = useCallback(async () => {
    setStatus("fetching")
    await fetch(`${formatOccasionFetchUrl("get")}`)
    .then((response) => response.json())
    .then((responseData) => {setData(responseData.data)})
    .then(() => setStatus("success"))
    .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
    .finally(() => {resetToIdle()})
    }, [])
    

    //get sorted
    const getSortedOccasions = async (month: string | null, year: string | null, category: string | null) => {
        setStatus("fetching")
        const slug = `${month ?? "null"}-${year ?? "null"}-${category ?? "null"}`;
        await fetch(`${formatOccasionFetchUrl("getSorted", slug)}`)
        .then((response) => response.json())
        .then((responseData) => (setData(responseData.data), console.log(responseData)))
        .then(() => setStatus("success"))
        .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
        .finally(() => resetToIdle())
        }


    //get one
    const getOneOccasion = async (slug: string | undefined) => {
    setStatus("fetching")
    await fetch(`${formatOccasionFetchUrl("getOne", slug)}`)
    .then((response) => (response.json()))
    .then((responseData) => (setData(responseData.data)))
    .then(() => (error ? "" : setStatus("success")))
    .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
    .finally(() => resetToIdle())
    }


    //create occasion
    const addOccasion = async (data: Occasion) => {
    setStatus("posting")
    await fetch(`${formatOccasionFetchUrl("post")}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then((response) => {!response.ok ? (setError(`Post request failed: ${response.status}`), setStatus("error")) : (setStatus("success"), redirect(`/arrangementer/${data.slug}`))})
    .catch((error => {setError(`Error while posting data: ${error}`), setStatus("error")}))
    .finally(() => resetToIdle()
    )}


    //delete occasion
    const removeOccasion = async (slug: string) => {
    setStatus("deleting")
    await fetch(`${formatOccasionFetchUrl("delete", slug)}`,
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

    //update occasion
    const updateOccasion = async (data: Occasion) => {
        setStatus("posting")
        await fetch(`${formatOccasionFetchUrl("update", data.slug)}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {!response.ok ? (setError(`Post request failed: ${response.status}`), setStatus("error")) : (setStatus("success"))})
        .catch((error => {setError(`Error while posting data: ${error}`), setStatus("error")}))
        .finally(() => resetToIdle()
    )}


    /*
    useEffect(() => {
        //Fetch occasions from server
        const controller = new AbortController()
        getOccasions()
        return() => controller.abort()
    },[getOccasions])*/


    //Return object
    const returnResponse: OccasionHookReturn = {
        get: getOccasions,
        getOne: getOneOccasion,
        getSorted: getSortedOccasions,
        create: addOccasion,
        update: updateOccasion,
        remove: removeOccasion,
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