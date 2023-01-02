import { Express } from "express";

import { propertiesRoutes } from "./property.routes";
import { schedulesRoutes } from "./schedule.routes";
import { loginRoutes } from "./login.routes";
import { termsRoutes } from "./terms.routes";
import { usersRoutes } from "./user.routes";

import SwaggerDocs from "../../docs/swagger.json";
import SwaggerUi from "swagger-ui-express";

const appRoutes = (app: Express): void => {
  app.use("/users", usersRoutes());
  app.use("/signin", loginRoutes());
  app.use("/schedules", schedulesRoutes());
  app.use("/properties", propertiesRoutes());
  app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(SwaggerDocs));
  app.use("/terms", termsRoutes());
};

export { appRoutes };
