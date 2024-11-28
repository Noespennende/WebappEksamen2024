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
                console.log("usecourse  for:", courseSlug);
                const data = await getCourse(courseSlug);
                console.log("usecourse Course data received:", data.data);
                setCourse(data.data);
               
            } catch (err) {
                console.error("Error fetching course:", err);
                setError("Kunne ikke hente kursdata.");
                console.log("usecourse Course etter " + course)
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

