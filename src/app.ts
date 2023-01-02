import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { appRoutes } from "./routes";
import express from "express";
import "express-async-errors";

import SwaggerDocs from "../docs/swagger.json";
import SwaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(SwaggerDocs));

export { app };
