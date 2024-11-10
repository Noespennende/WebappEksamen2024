import { getCourse } from '@/lib/services/api'
import { useState, useEffect } from 'react'



export const useCourse = (slug: any) => {
    const [course, setCourse] = useState(null)


    useEffect(() => {
        const fetchCourse = async () => {
            const data = await getCourse(slug)
            setCourse(data)
        }
        fetchCourse()
    },[slug])

    return course
}

