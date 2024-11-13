import { getComments } from "@/lib/services/api"
import { useEffect, useState } from "react"


export const useComment = (lessonSlug: string) => {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect (() => {
        const fetchComments = async () => {
            const data = await getComments(lessonSlug)
            setComments(data)
        }
        fetchComments();
    }, [lessonSlug])

        return comments

    
}