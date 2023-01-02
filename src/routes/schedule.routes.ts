import { Router } from "express";

import { SchedulesControllers } from "../controllers/schedules.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";

import { scheduleSchema } from "../schemas/schedule.schema";

const routes = Router();

const schedulesRoutes = (): Router => {
  routes.post(
    "/:id",
    schemaValidationMiddleware(scheduleSchema),
    tokenMiddleware,
    new SchedulesControllers().create
  );

  routes.delete("/:id", tokenMiddleware, new SchedulesControllers().delete);

  routes.get("/:id", tokenMiddleware, new SchedulesControllers().specific);

  return routes;
};

export { schedulesRoutes };
