import { Category, Comment, Course, CreateComment, CreateCourse, CreateLesson, Result } from "../types"

import { ofetch } from 'ofetch';

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

export const createComment = async (comment: CreateComment, courseSlug: string, lessonSlug: string) => {
    try {
      const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}/lessons/${lessonSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sørger for at vi sender JSON-data
        },
        body: JSON.stringify(comment),
      });
  
      // Logg den rå responsen fra serveren
      const rawResponse = await response.text();
      console.log("Raw response: ", rawResponse);
  
      // Prøv å parse responsen som JSON
      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        console.error("Raw response body:", rawResponse);
        return null;
      }
  
      if (response.ok) {
        console.log('Comment added successfully:', data);
        return data; // Returnerer den oppdaterte leksjonen med kommentarene
      } else {
        console.error('Error adding comment:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Network or server error:', error);
      return null;
    }
  };
  
  

// Funksjon som sender POST-forespørsel for å opprette et kurs
export const createCourse = async (courseData: CreateCourse): Promise<Result<Course>> => {
    try {
        const response = await fetch('http://localhost:3999/v1/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        });

        const responseData = await response.json();
        console.log("Response from backend:", responseData);
      
        if (responseData.success) {
          return responseData.data;
        } else {
            throw {
                success: false,
                error: {
                  code: responseData.error.code,
                  message: responseData.error.message,
                },
              };
        }
      
      } catch (error) {

        throw error; 
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


export const updateCourse = async (slug: string, courseData: CreateCourse): Promise<Result<Course>> => {
    try {
      const response = await fetch(`http://localhost:3999/v1/courses/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: courseData,
        }),
      });
  
      const responseData = await response.json();
      console.log("Response from backend:", responseData);
  
      if (responseData.success) {
        return {
          success: true,
          data: responseData.data,
        };
      } else {
        throw {
          success: false,
          error: {
            code: responseData.error.code,
            message: responseData.error.message,
          },
        };
      }
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  };
  