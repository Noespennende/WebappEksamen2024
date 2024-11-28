import { Comment, Course } from "../types"


export const getLesson = async (courseSlug: string, lessonSlug: string) => {
    try {
        const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}/lessons/${lessonSlug}`);

        if (!response.ok) {
            throw new Error("Feil ved fetch av Lesson: " + response.statusText);
        }
        const responseJson = await response.json();
        //console.log("fetchLesson data:", JSON.stringify(responseJson.data, null, 2))
        return responseJson.data;
    } catch (error) {
        throw error;
    }
}


export const getCourse = async (courseSlug: string) => {
    try {
        const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}`);
  
        if (!response.ok) {
            throw new Error("Feil ved fetch av Courses: " + response.statusText);
        }
  
        const responseJson = await response.json();
        //console.log("Response for course:", JSON.stringify(responseJson, null, 2)); 
        
        if (!responseJson || !responseJson.data) {
            throw new Error("Feil ved henting av kursdata.");
        }
  
        return responseJson; 
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};


export const getComments = async (lessonSlug: string): Promise<Comment[]> => {
    try {
        // Assuming you want to fetch comments for a lesson based on the lessonSlug
        const response = await fetch(`https://localhost:3999/comments?lesson=${lessonSlug}`);

        if (!response.ok) {
            throw new Error("Feil ved fetch av Comments: " + response.statusText);
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const createComment = async (commentData: Comment): Promise<Comment> => {
    try {
        const response = await fetch(`https://localhost:4000/lessons?course=${commentData}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(commentData)
        })

        if(!response.ok){
            throw new Error("Cannot add the comments")
        }
        return await response.json()
    } catch (error) {
        console.error("cannot create comment", error)
        throw error
    }
}

export const createCourse = async (courseData: Course): Promise<Course> => {
    try {
        const response = await fetch(`https://localhost:4000/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(courseData)
        })
        if(!response.ok){
            throw new Error("Cannot add the Course")
        }
        return await response.json()
    } catch (error) {
        console.error("Cannot create Course", error)
        throw error
    }
}