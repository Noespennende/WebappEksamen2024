

export const getLesson = async (courseSlug: any, lessonSlug:any) => {
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

export const getCourse = async (courseSlug: any) => {
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


export const getComments = async ( lessonSlug: any) => {
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