import { getLesson } from "@/lib/services/api"
import { useEffect, useState } from "react"


export const useLesson = (courseSlug: any, lessonSlug: any) => {
    const [lesson, setLesson] = useState(null)

    useEffect(() => {
        const fetchLesson = async () =>{
            const data = await getLesson(courseSlug, lessonSlug)

            setLesson(data)
        }
        fetchLesson()
    },[courseSlug, lessonSlug])

    return lesson
}