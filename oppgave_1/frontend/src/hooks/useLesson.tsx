import { getLesson } from "@/lib/services/api"
import { ALesson } from "@/lib/types";
import { useEffect, useState } from "react"


export const useLesson = (courseSlug: string, lessonSlug: string) => {
    const [lesson, setLesson] =  useState<ALesson | undefined>(undefined);

    useEffect(() => {
        const fetchLesson = async () =>{
            const data = await getLesson(courseSlug, lessonSlug)

            setLesson(data)
        }
        fetchLesson()
    },[courseSlug, lessonSlug])

    return lesson
}