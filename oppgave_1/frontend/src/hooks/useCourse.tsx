import { getCourse } from '@/lib/services/api'
import { Course } from '@/lib/types'
import { useState, useEffect } from 'react'



export const useCourse = (slug: string) => {
    const [course, setCourse] = useState<Course | undefined>(undefined);


    useEffect(() => {
        const fetchCourse = async () => {
            const data = await getCourse(slug)
            setCourse(data)
        }
        fetchCourse()
    },[slug])

    return course
}

