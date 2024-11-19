import { getComments } from "@/lib/services/api"
import { useEffect, useState } from "react"


export const useComment = (lessonSlug: any) => {
    const [comments, setComments] = useState([])

    useEffect (() => {
        const fetchComments = async () => {
            const data = await getComments(lessonSlug)
            setComments(data)
        }
        fetchComments();
    }, [lessonSlug])

        return comments

    
}