import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./prisma";
import { Failure, Result, Success } from "./types";
import { Category, Course, Lesson, validateCourse, validateCreateCourse, validateCreateLesson } from "./helpers/schema";

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


// TODO: Refaktorere - ut i funksjoner
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


app.put('/v1/courses/:slug', async (c) => {
  const { slug } = c.req.param(); // Hent slug fra URL-en
  const { data, newLessons }: { data: Partial<Course>, newLessons: Lesson[] } = await c.req.json();

  try {
    // Finner kurset
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
      include: { lessons: true }, // Inkluder eksisterende leksjoner i kurset
    });

    if (!existingCourse) {
      return c.json({
        success: false,
        error: {
          code: "404",
          message: "Course not found",
        },
      }, 404);
    }


    if (data.slug) {
      const courseSlugExists = await prisma.course.findUnique({
        where: {
          slug: data.slug,
        },
      });

      if (courseSlugExists) {
        return c.json(
          {
            success: false,
            error: `Slug already exists: ${courseSlugExists.slug} for course ${courseSlugExists.title}`,
          },
          400
        );
      }
   }

    /* Refaktorere - Kan bli egen metode utenfor, for bedre oversikt! */

    // Samle slugs for eksisterende leksjoner
    const existingLessonSlugs = existingCourse.lessons.map(lesson => lesson.slug);

    // Samle slugs for oppdaterte leksjoner (de som har fått en ny slug)
    const updatedLessonSlugs = data?.lessons
      ? data.lessons.filter(lesson => lesson.slug).map(lesson => lesson.slug)
      : [];

    // Sjekk om newLessons er definert og et array, hvis ikke sett det til en tom liste
    const newLessonSlugs = Array.isArray(newLessons) ? newLessons.map(lesson => lesson.slug) : [];

    // Lag en liste med alle slugs som skal sjekkes
    const allLessonSlugs = [
      ...existingLessonSlugs, // Eksisterende leksjoners slugs
      ...newLessonSlugs, // Nye leksjoners slugs
      ...updatedLessonSlugs, // Oppdaterte leksjoners slugs
    ];

    // Sjekk om noen newLesson.slugs er de samme som updatedLessonSlugs
    const duplicateNewAndUpdatedSlugs = newLessonSlugs.filter(slug => updatedLessonSlugs.includes(slug));

    if (duplicateNewAndUpdatedSlugs.length > 0) {
      return c.json({
        success: false,
        error: `The following new lesson slugs are the same as updated lesson slugs: ${duplicateNewAndUpdatedSlugs.join(', ')}`,
      }, 400);
    }

    // Finn dupliserte slugs
    const duplicateSlugs = allLessonSlugs.filter((slug, index, self) => self.indexOf(slug) !== index);

    if (duplicateSlugs.length > 0) {
      return c.json({
        success: false,
        error: `Already existing slugs in course found: ${duplicateSlugs.join(', ')}`,
      }, 400);
    }

    /* *** */

    // Legg til nye leksjoner
    if (newLessons && newLessons.length > 0) {
      for (const lesson of newLessons) {
        
        // Validerer leksjonen
        const validationResult = validateCreateLesson(lesson);

        if (!validationResult.success) {
          return c.json(
            {
              success: false,
              error: `Validation failed for lesson: ${validationResult.error.errors}`,
            },
            400
          );
        }

        const lessonsData = {
          ...lesson,
          course: {
            connect: { slug: existingCourse.slug }, // Kobler leksjonen til eksisterende kurs
          },
          text: lesson.text
            ? {
                create: lesson.text.map((lessonText) => ({
                  ...lessonText
                })),
              }
            : undefined,
          comments: { create: [] },
        };

        // Opprett leksjonen dersom slug er unik
        await prisma.lesson.create({
          data: lessonsData,
        });
      }
    }

    // Oppdater kurs og relasjoner til kategori og eksisterende leksjoner
    const updatedCourse = await prisma.course.update({
      where: { slug },
      data: {
        ...data, // Spre innholdet fra data (som kan inneholde oppdaterte felter)
        category: data?.category ? { connect: { id: data.category.id } } : undefined,
        lessons: data?.lessons ? {
          updateMany: data.lessons.map((lesson) => ({
            where: { id: lesson.id },
            data: {
              ...lesson,
            },
          }))
        } : undefined,
      },
      include: {
        lessons: true, // Inkluder alle leksjoner i oppdaterte kursdata
      }
    });

    // Hvis alt går bra, returner suksess
    return c.json({
      success: true,
      message: `Course with slug ${slug} was updated successfully.`,
      data: updatedCourse,
    }, 200);

  } catch (error) {
    console.error("Error updating course:", error);
    return c.json({
      success: false,
      error: {
        code: "500",
        message: "Failed to update course",
      },
    }, 500);
  }
});


app.get('/v1/courses/:courseslug/lessons/:lessonslug', async (c) => {
  const { courseslug, lessonslug } = c.req.param(); // Hent slug-parametrene fra URL-en

  // Finn leksjonen basert på både courseSlug og lessonSlug
  const lesson = await prisma.lesson.findFirst({
    where: {
      course: {
        slug: courseslug, // Kursets slug
      },
      slug: lessonslug, // Leksjonens slug
    },
    include: {
      //course: true, // -> Trenger vi all course data eller kanskje bare categoryid?
      course: {
        select: {
          title: true,
          category: true // Henter hele category som er knyttet til kurset
        },
      },
      text: true,  // Inkluder text-relasjonen for leksjonen
      comments: {
        select: {
          comment: true,
          createdBy:{
            select: {
              id: true,
              name: true
            }
          }
        }
      }, // Inkluder comments-relasjonen for leksjonen
    },
  });

  if (!lesson) {
    return c.json({ success: false, error: 'Lesson or course not found' }, 404);
  }

  // Returner leksjonsdata sammen med kursinformasjon
  return c.json({
    success: true,
    data: lesson,
  });
});


app.post('/v1/courses/:courseslug/lessons/:lessonslug', async (c) => {
  const { courseslug, lessonslug } = c.req.param(); // Hent slug-parametrene fra URL-en
  const { comment, createdById } = await c.req.json(); // Hent kommentarens tekst og createdById fra body

  // Finn leksjonen basert på både courseSlug og lessonSlug
  const lesson = await prisma.lesson.findFirst({
    where: {
      course: {
        slug: courseslug, // Kursets slug
      },
      slug: lessonslug, // Leksjonens slug
    },
  });

  if (!lesson) {
    return c.json({ success: false, error: 'Lesson or course not found' }, 404);
  }

  // Sjekker om brukeren eksisterer i databasen
  const user = await prisma.user.findUnique({
    where: { id: createdById },
  });

  if (!user) {
    return c.json({ success: false, error: 'User not found' }, 404); // Brukeren eksisterer ikke
  }

  // Opprett en ny kommentar og knytt den til leksjonen og brukeren
  const newComment = await prisma.comment.create({
    data: {
      comment: comment,
      createdById: createdById,
      lessonId: lesson.id, // Knytt kommentaren til leksjonen
    },
  });

  const updatedLesson = await prisma.lesson.findUnique({
    where: { id: lesson.id },
    include: {
      //course: true, // -> Trenger vi all course data eller kanskje bare categoryid?
      course: {
        select: {
          title: true,
          category: true // Henter hele category som er knyttet til kurset
        },
      },
      text: true,  // Inkluder text-relasjonen for leksjonen
      comments: {
        select: {
          comment: true,
          createdBy:{
            select: {
              id: true,
              name: true
            }
          }
        }
      }, // Inkluder comments-relasjonen for leksjonen
    },
  });

  return c.json({
    success: true,
    data: updatedLesson, // Returnerer hele leksjonen
  });
});

app.get("/v1/categories", async (c) => {
  try {
    const categories = await prisma.category.findMany();

    const response: Success<Category[]> = {
      success: true,
      data: categories,
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




export default app;