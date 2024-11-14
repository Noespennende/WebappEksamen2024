import { Comment, Course } from "../types"


export const getLesson = async (courseSlug: string, lessonSlug:string) => {
    try {
        const response = await fetch(`https://localhost:4000/lessons?course=${courseSlug}&lesson=${lessonSlug}`)

        if(!response.ok){
            throw new Error("Feil ved fetch av Lesson" + response.statusText)
        }
        const responseJson = await response.json()
        
        return responseJson
    } catch (error) {
        throw error
    }
}

export const getCourse = async (courseSlug: string) => {
    try {
        const response = await fetch(`https://localhost:4000/lessons?course=${courseSlug}`)

        if(!response.ok){
            throw new Error("Feil ved fetch av Courses" + response.statusText)
        }

        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        throw error        
    }
}


export const getComments = async (lessonSlug: string): Promise<Comment[]>  => {
    try {
        //endre denne til å fetche comments på course
        const response = await fetch(`https://localhost:4000/lessons?course=${lessonSlug}`)

        if(!response.ok){
            throw new Error("Feil ved fetch av Courses" + response.statusText)
        }
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        throw error        
    }
}

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
        const response = await fetch(`https://localhost:4000/lessons?course=${courseData}`,{
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