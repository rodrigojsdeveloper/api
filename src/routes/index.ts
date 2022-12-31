import { Express } from "express";

import { usersRoutes } from "./user.routes";

const appRoutes = (app: Express): void => {
  app.use("/users", usersRoutes());
};

export { appRoutes };
