import { useState, useEffect } from "react";
import { Course} from "../lib/types";
import { getCourse } from "../lib/services/api"; 

export const useCourse = (courseSlug: string) => {
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            setError(null);

            try {        
                const data = await getCourse(courseSlug);
            
                setCourse(data.data);
               
            } catch (err) {
                setError("Kunne ikke hente kursdata.");             
            } finally {
                setLoading(false);
            }
        };

        if (courseSlug) {
            fetchCourse();
        }
    }, [courseSlug]);

    return { course, loading, error };
};

