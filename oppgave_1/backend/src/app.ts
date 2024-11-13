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

app.post("/v1/courses", async (c) => {
  try {
    
    const newCourse = await c.req.json();

    const validationResult = validateCreateCourse(newCourse);

    if (!validationResult.success) {
      // Validering mislyktes - 400 feil
      return c.json(
        {
          success: false,
          error: validationResult.error.errors,
        },
        400
      );
    }

    // Sjekk om slug allerede eksisterer i databasen
    const existingCourse = await prisma.course.findUnique({
      where: {
        slug: validationResult.data.slug,
      },
    });

    if (existingCourse) {
      return c.json(
        {
          success: false,
          error: "Slug already exists",  // Feil om slug er duplikat
        },
        400
      );
    }

    
    // Kanskje unødvendig? sjekker at kategorien eksisterer
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

    // Opprett kurset i databasen når validering og sjekk er vellykket
    const createCourse = await prisma.course.create({
      data: {
        title: validationResult.data.title,
        slug: validationResult.data.slug,
        description: validationResult.data.description,
        category: {
          connect: { id: validationResult.data.categoryId },
        },
      },
    });

    return c.json(
      {
        success: true,
        data: createCourse,
      },
      201
    );

  } catch (error) {

    return c.json(
      {
        success: false,
        error: error,
      },
      500
    );
  }
});

export default app;