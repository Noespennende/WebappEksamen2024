import { getComments } from "@/lib/services/api"
import { useEffect, useState } from "react"
import {Comment} from "../lib/types/index"

  export const useComment = (courseSlug: string, lessonSlug: string) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            const data: Comment[] = await getComments(courseSlug, lessonSlug);
            setComments(data || []);
        };

        fetchComments();
    }, [courseSlug, lessonSlug]);

    return comments;
};