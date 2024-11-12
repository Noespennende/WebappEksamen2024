import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "./prisma";

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

app.get("/courses", async (c) => {
  try {

    //const courses = await prisma.course.findMany();

    const courses = await prisma.course.findMany({
      include: { 
        category: true 
      },
      // Returnerer 'category'-objektet i tillegg, med alle felter
        // Kan bruke { category { select : name: true } }, for å hente spesifikke felter (her name-feltet)
      // uten include returnereres 'categoryId', som er relasjon-referansen satt i schema (dette tilfellet category sin id)
    });

  
    return c.json(
      {
        success: true,
        data: courses
      }
      , 200)
    
  } catch (error) {
    // Håndter eventuelle feil
    return c.json(
      {
        success: false,
        error: {
          code: 400,
          message: error
        }
      }
    );
  }
});


export default app;
