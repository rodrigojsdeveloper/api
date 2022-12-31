import { Router } from "express";

import { createScheduleController } from "../controllers/schedules/createSchedule.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { scheduleSchema } from "../schemas/schedule.schema";

const routes = Router();

const schedulesRoutes = (): Router => {
  routes.post(
    "",
    schemaValidationMiddleware(scheduleSchema),
    createScheduleController
  );

  return routes;
};

export { schedulesRoutes };
