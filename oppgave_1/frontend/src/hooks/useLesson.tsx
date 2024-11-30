import { getLesson } from "@/lib/services/api"
import { Lesson } from "@/lib/types";
import { useEffect, useState } from "react"


export const useLesson = (courseSlug: string, lessonSlug: string) => {
    const [lesson, setLesson] =  useState<Lesson | undefined>(undefined);

    useEffect(() => {
        const fetchLesson = async () =>{
            //console.log("Fetching lesson for:", courseSlug, lessonSlug);
            const data = await getLesson(courseSlug, lessonSlug)
            console.log("Lesson data received:", data);
            setLesson(data)
        }
        fetchLesson()
    },[courseSlug, lessonSlug])

    return lesson
}