import { Category, Comment, Course } from "../types"


export const getLesson = async (courseSlug: string, lessonSlug: string) => {
    try {
        const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}/lessons/${lessonSlug}`);

        if (!response.ok) {
            throw new Error("Feil ved fetch av Lesson: " + response.statusText);
        }
        const responseJson = await response.json();

        return responseJson.data;
    } catch (error) {
        throw error;
    }
}


export const getCourses = async () => {
    try {
        const response = await fetch("http://localhost:3999/v1/courses");
  
        if (!response.ok) {
            throw new Error("Feil ved fetch av Courses: " + response.statusText);
        }
  
        const responseJson = await response.json();
  
        if (!responseJson || !responseJson.data) {
            throw new Error("Feil ved henting av kursdata.");
        }
  
        return responseJson.data; 
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const getCourse = async (courseSlug: string) => {
    try {
        const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}`);
  
        if (!response.ok) {
            throw new Error("Feil ved fetch av Courses: " + response.statusText);
        }
  
        const responseJson = await response.json();
     
        
        if (!responseJson || !responseJson.data) {
            throw new Error("Feil ved henting av kursdata.");
        }
  
        return responseJson; 
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
};


export const getComments = async (courseSlug: string, lessonSlug: string): Promise<Comment[]> => {
    try {
        const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}/lessons/${lessonSlug}`);

        if (!response.ok) {
            throw new Error("Feil ved fetch av Comments: " + response.statusText);
        }

        const responseJson = await response.json();

     

        const comments = responseJson.data.comments || [];

        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};

export const createComment = async (commentData: Comment, courseSlug: string, lessonSlug: string): Promise<Comment> => {
    try {
        const response = await fetch(`http://localhost:4000/v1/courses/${courseSlug}/lessons/${lessonSlug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),  
        });

        if (!response.ok) {
            throw new Error('Cannot add the comment');
        }

        return await response.json();
    } catch (error) {
        console.error('Cannot create comment:', error);
        throw error;
    }
};

export const createCourse = async (courseData: Course): Promise<Course> => {
    try {
        const response = await fetch(`https://localhost:3999/courses/`,{
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

    

    };
    export const getCategories = async (): Promise<Category[]> => {
        try {
            const response = await fetch("http://localhost:3999/v1/categories");
      
            if (!response.ok) {
                throw new Error("Feil ved fetch av Courses: " + response.statusText);
            }
      
            const responseJson = await response.json();
      
            if (!responseJson || !responseJson.data) {
                throw new Error("Feil ved henting av kursdata.");
            }
      
            return responseJson.data;
        } catch (error) {
            console.error("Error fetching courses:", error);
            throw error;
        }
    
}