import { Router } from "express";

import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import { deleteScheduleController } from "../controllers/schedules/deleteSchedule.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";

import { scheduleSchema } from "../schemas/schedule.schema";

const routes = Router();

const schedulesRoutes = (): Router => {
  routes.post(
    "",
    schemaValidationMiddleware(scheduleSchema),
    createScheduleController
  );

  routes.delete("/:id", tokenMiddleware, deleteScheduleController);
  return routes;
};

export { schedulesRoutes };
