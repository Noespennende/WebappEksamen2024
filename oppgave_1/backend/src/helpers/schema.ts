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
  categoryId: z.string().uuid(),
});

// Lesson Base
const lessonBaseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1),
  preAmble: z.string(),
  courseId: z.string().uuid(),
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



// Utvidet Course-skjema med kategori og leksjoner inkludert
export const courseSchema = courseBaseSchema.extend({
  category: categoryBaseSchema,
  lessons: z.array(lessonBaseSchema).optional(),
});

// Må se på om lesson skal inneholde hele course-objektet, eller kun slug kanskje?
export const lessonSchema = lessonBaseSchema.extend({
  course: courseBaseSchema.optional(),
  text: z.array(lessonTextBaseSchema).optional(),
  comments: z.array(commentBaseSchema).optional(),
});

// Som over: se om lessontext skal inneholde hele lesson-objektet det tilhører, eller bare slug-en?
export const lessonTextSchema = lessonTextBaseSchema.extend({
  lesson: lessonBaseSchema.optional(),
});

// Som over: se på om comment skal inneholde hele lesson-objektet den tilhører, eller bare slug-en? 
export const commentSchema = commentBaseSchema.extend({
  lesson: lessonBaseSchema.optional(),
  createdBy: userBaseSchema.optional(),
});

// Hele course-objekter eller bare slug-er?
export const categorySchema = categoryBaseSchema.extend({
  courses: z.array(courseBaseSchema).optional(),
});

// Utvidet User-skjema med relasjoner til Comment, siden prisma-schema har: Comment[] i User
export const userSchema = userBaseSchema.extend({
  comments: z.array(commentBaseSchema).optional(),
});


export const createCourseSchema = courseBaseSchema.omit({
    id: true // Bruker Omit for å fjerne ID-felt - mindre linjer kode med Omit enn Pick/Partial
}).extend({
    categoryId: z.string().uuid(),
});


export type User = z.infer<typeof userSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonText = z.infer<typeof lessonTextSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type Category = z.infer<typeof categorySchema>;


export const validateCourse = (data: unknown) => {
    return courseSchema.safeParse(data)
}

export const validateCreateCourse = (data: unknown) => {
    return createCourseSchema.safeParse(data)
}