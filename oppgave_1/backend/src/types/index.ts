import { Course } from "@prisma/client";

export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type Result<T> = Success<T> | Failure;



export enum ErrorCode {
  COURSE_SLUG_NOT_UNIQUE = "COURSE_SLUG_NOT_UNIQUE",
  LESSON_SLUG_NOT_UNIQUE = "LESSON_SLUG_NOT_UNIQUE",
}


export type CourseUpdateData = Course & { categoryId?: string };