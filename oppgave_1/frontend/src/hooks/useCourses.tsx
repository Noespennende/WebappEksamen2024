import { useState, useEffect } from "react";
import { Course } from "../lib/types";
import { getCourses } from "../lib/services/api"; // Import the function for fetching all courses

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                setError("Kunne ikke hente kursdata.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses(); 
    }, []);

    return { courses};
};