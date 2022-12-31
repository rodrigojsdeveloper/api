import { ISchedule } from "../interfaces/schedule.interface";
import { SchemaOf } from "yup";
import * as yup from "yup";

const scheduleSchema: SchemaOf<ISchedule> = yup.object().shape({
  date: yup.string().required("date required"),
  hour: yup.string().required("hour required"),
});

export { scheduleSchema };
