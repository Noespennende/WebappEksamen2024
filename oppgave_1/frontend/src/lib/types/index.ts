/*
export type Comments = {
    id: string;
    text: string;
  };

export type Category = {
  id: string;
  name: string;
};
  
  export type ALesson = {
    id: string;
    title: string;
    slug: string;
    preAmble: string;
    text: Comment[]; 
  };
  
  export type Course = {
    id: string;
    title: string;
    slug: string;
    description: string;
    lessons?: ALesson[]; 
    category: Category;
  };

  export type Comment = {
    id: string;
    createdBy: {
        id: string;  
        name: string;
    };
    comment: string;
    lesson: {
        slug: string;
    };
  };

  export type CommentNoLesson = {
    id: string;
    createdBy: {
        id: string;  
        name: string;
    };
    comment: string;
  }; 
  */

import { z } from "zod";
import { userSchema, courseSchema, lessonSchema, lessonTextSchema, commentSchema, categorySchema, createCourseSchema, createLessonSchema, CreateLessonTextSchema } from "./schema";


export type User = z.infer<typeof userSchema>;
export type Course = z.infer<typeof courseSchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type CreateLesson = z.infer<typeof createLessonSchema>;
export type LessonText = z.infer<typeof lessonTextSchema>;
export type CreateLessonText = z.infer<typeof CreateLessonTextSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Category = z.infer<typeof categorySchema>;



export interface CourseFieldsProps {
  courseFields: CreateCourse
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[]; // Assuming categories is also an array of Category objects
}
  