import { z } from "zod";

// User
const userBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

// Category Base 
const categoryBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
});

// Course Base
const courseBaseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
});

// Lesson Base
const lessonBaseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  preAmble: z.string(),
});

// LessonText 
const lessonTextBaseSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
  lessonId: z.string().uuid(),
  orderPosition: z.number(),
});

// Comment
const commentBaseSchema = z.object({
  id: z.string().uuid(),
  comment: z.string().min(1),
  lessonSlug: z.string(),
  createdById: z.string().uuid(),
});


export const lessonSchema = lessonBaseSchema.extend({
  course: courseBaseSchema.optional(),
  text: z.array(lessonTextBaseSchema).optional(),
  comments: z.array(commentBaseSchema).optional(),
});

export const courseSchema = courseBaseSchema.extend({
  category: categoryBaseSchema,
  lessons: z.array(lessonSchema).optional(),
});

export const lessonTextSchema = lessonTextBaseSchema.extend({
  lesson: lessonBaseSchema.optional(),
});

export const commentSchema = commentBaseSchema.extend({
  lesson: lessonBaseSchema,
  createdBy: userBaseSchema,
});

export const categorySchema = categoryBaseSchema.extend({
  courses: z.array(courseBaseSchema).optional(),
});

export const userSchema = userBaseSchema.extend({
  comments: z.array(commentBaseSchema).optional(),
});

export const createLessonSchema = lessonBaseSchema.omit({
  id: true,
}).extend({
  text: z.array(
    lessonTextBaseSchema.omit({
      id: true,
      lessonId: true,
    })
  ).optional(),
  comments: z.array(
    commentBaseSchema.omit({
      id: true,
    })
  ).default([]),
});


export const createCourseSchema = courseBaseSchema.omit({
  id: true,
}).extend({
  categoryId: z.string().uuid(),
  lessons: z.array(z.intersection(createLessonSchema, lessonSchema)).optional(),
});

export const createCommentSchema = commentBaseSchema.omit({
    id: true
}).extend({
    createdById: z.string().uuid(),
    lessonSlug: z.string().min(1),
})


export type User = z.infer<typeof userSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonText = z.infer<typeof lessonTextSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CreateCourse = z.infer<typeof createCourseSchema>;


export const validateCourse = (data: unknown) => {
    return courseSchema.safeParse(data)
}

export const validateCreateCourse = (data: unknown) => {
    return createCourseSchema.safeParse(data)
}

export const validateLesson = (data: unknown) => {
  return lessonSchema.safeParse(data)
}

export const validateCreateLesson = (data: unknown) => {
  return createLessonSchema.safeParse(data)
}