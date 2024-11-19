import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./prisma";
import { Failure, Result, Success } from "./types";
import { Course, validateCourse, validateCreateCourse } from "./helpers/schema";

const app = new Hono();


app.use("/*", cors());

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});


app.get("/v1/courses", async (c) => {
  try {
    const courses = await prisma.course.findMany({
      include: { 
        category: true 
      },
      // Returnerer 'category'-objektet i tillegg, med alle felter
        // Kan bruke { category { select : name: true } }, for å hente spesifikke felter (her name-feltet)
      // uten include returnereres 'categoryId', som er relasjon-referansen satt i schema (dette tilfellet category sin id)
    });

    // Strukturerer data-returen som Success<Course[]>
    const response: Success<Course[]> = {
      success: true,
      data: courses,
    };

    return c.json(response, 200);
  } catch (error) {
    const response: Failure = {
      success: false,
      error: {
        code: "400",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };

    return c.json(response, 400);
  }
});


// TODO: Refaktorering?
app.post("/v1/courses", async (c) => {
  try {
    const newCourse = await c.req.json();

    // Sjekker at det er riktig struktur
    const validationResult = validateCreateCourse(newCourse);

    if (!validationResult.success) {
      return c.json(
        {
          success: false,
          error: validationResult.error.errors,
        },
        400
      );
    }

    // Sjekker om kategorien finnes - refaktorere ut i metodekall?
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: validationResult.data.categoryId,
      },
    });

    if (!categoryExists) {
      return c.json(
        {
          success: false,
          error: "Category not found",
        },
        404
      );
    }

    // Sjekker om kurs-slug finnes fra før
    const existingCourse = await prisma.course.findUnique({
      where: {
        slug: validationResult.data.slug,
      },
    });

    if (existingCourse) {
      return c.json(
        {
          success: false,
          error: `Slug already exists: ${existingCourse.slug} for course ${existingCourse.title}`,
        },
        400
      );
    }

    // Setter opp Lesson-data for å kunne validere
    const lessonsData = validationResult.data.lessons?.map((lesson) => ({
      title: lesson.title,
      slug: lesson.slug,
      preAmble: lesson.preAmble,
      text: lesson.text
        ? {
            create: lesson.text.map((lessonText) => ({
              text: lessonText.text,
              orderPosition: lessonText.orderPosition,
            })),
          }
        : undefined,
      comments: { create: [] }, 
    })) ?? [];

    // Sjekker om Lesson-slug er unik innad kurset () (siden /kurs/:kursid:/lesson/:lessonid:)
    const courseSlug = validationResult.data.slug;
    for (const lesson of lessonsData) {
      const existingLesson = await prisma.lesson.findFirst({
        where: {
          course: { 
            slug: courseSlug, 
          }, 
          slug: lesson.slug, 
            // Sjekker om Lesson-slug finnes i samme Course-slug
        },
      });

      if (existingLesson) {
        return c.json(
          {
            success: false,
            error: `Lesson slug "${lesson.slug}" already exists for course "${courseSlug}".`,
          },
          400
        );
      }
    }

    // Opprettelse data er valider -> opprett Course og Lesson 
    const createCourseData = {
      title: validationResult.data.title,
      slug: validationResult.data.slug,
      description: validationResult.data.description,
      category: {
        connect: { id: validationResult.data.categoryId },
      },
      lessons: lessonsData.length > 0 ? {
        create: lessonsData,
      } : undefined,
    };

    const createdCourse = await prisma.course.create({
      data: createCourseData,
      include: {
        lessons: true, // Include the related lessons data
      },
    });

    // Returnerer hele kurs-objektet, da med også lessons-data
    return c.json(
      {
        success: true,
        data: createdCourse,
      },
      201
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: (error as Error).message || 'An unknown error occurred',
      },
      500
    );
  }
});


app.get('/v1/courses/:slug', async (c) => {
  const { slug } = c.req.param(); // Hent kurs-slug fra URL-en

  try {
    const course = await prisma.course.findUnique({
      where: { slug: slug },
      include: {
        category: true,  // Tar med hele kategori (id og name)
        lessons: {       // Tar med leksjoner, men ikke innholdet i leksjonene (text[])
          select: {
            id: true,
            title: true,
            slug: true,
            preAmble: true,
          },
        },
      },
    });

    if (!course) {
      const response: Failure = {
        success: false,
        error: {
          code: "404",
          message: "Course not found",
        },
      };
      return c.json(response, 404);
    }

    // Validerer kursdata - sjekker at det vi hentet passer med det vi ønsker å returnere
    const result = validateCourse(course)

    if (!result.success) {
      console.error("Validation failed", result.error);
      const response: Failure = {
        success: false,
        error: {
          code: "400",
          message: "Invalid course data",
        },
      };
      return c.json(response, 400);
    }

    const response: Success<typeof result.data> = {
      success: true,
      data: result.data,
    };

    return c.json(response, 200);

  } catch (error) {
    const response: Failure = {
      success: false,
      error: {
        code: "400",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };

    return c.json(response, 400);
  }
});


app.delete('/v1/courses/:slug', async (c) => {
  const { slug } = c.req.param(); // Hent slug fra URL-en

  try {
    // Finner kurset basert på slug
    const course = await prisma.course.findUnique({
      where: { slug },
    });

    if (!course) {
      return c.json({
        success: false,
        error: {
          code: "404",
          message: "Course not found",
        },
      }, 404);
    }

    // Sletter kurset (og tilhørende elementer via ref)
    // (Har onDelete: cascade i Prisma, så tilhørende Lesson[], Lesson sine LessonText[] og Comment[] slettes automatisk)
    await prisma.course.delete({
      where: { slug },
    });

    return c.json({
      success: true,
      message: `Course with slug ${slug} and its related data were deleted successfully.`,
    }, 200);

  } catch (error) {

    return c.json({
      success: false,
      error: {
        code: "500",
        message: "Failed to delete course",
      },
    }, 500);
  }
});



export default app;