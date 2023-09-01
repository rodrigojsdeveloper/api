import { Express } from "express";

import { propertiesRoutes } from "./property.routes";
import { schedulesRoutes } from "./schedule.routes";
import { loginRoutes } from "./login.routes";
import { termsRoutes } from "./terms.routes";
import { usersRoutes } from "./user.routes";

import SwaggerDocs from "../../docs/swagger.json";
import SwaggerUi from "swagger-ui-express";

const appRoutes = (app: Express, endPoint: string): void => {
  app.use(`/${endPoint}/users`, usersRoutes());
  app.use(`/${endPoint}/signin`, loginRoutes());
  app.use(`/${endPoint}/schedules`, schedulesRoutes());
  app.use(`/${endPoint}/properties`, propertiesRoutes());
  app.use(`/${endPoint}/docs`, SwaggerUi.serve, SwaggerUi.setup(SwaggerDocs));
  app.use(`/${endPoint}/terms`, termsRoutes());
};

export { appRoutes };
