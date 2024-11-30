import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { createEventController, eventController } from "./features/events/services/controller";
import { templateController } from "./features/template/services/controller";


const makeApp = (

) => {
  const app = new Hono();

  app.use("/*", cors());

  app.use(prettyJSON());

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

  app.route("/event", eventController);
  app.route("/templates", templateController);


  return app;
}



const app = makeApp();

export default app;
