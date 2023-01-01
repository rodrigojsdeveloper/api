import { Express } from "express";

import { schedulesRoutes } from "./schedule.routes";
import { loginRoutes } from "./login.routes";
import { usersRoutes } from "./user.routes";
import { propertiesRoutes } from "./property.routes";

const appRoutes = (app: Express): void => {
  app.use("/users", usersRoutes());
  app.use("/schedules", schedulesRoutes());
  app.use("/signin", loginRoutes());
  app.use("/properties", propertiesRoutes());
};

export { appRoutes };
