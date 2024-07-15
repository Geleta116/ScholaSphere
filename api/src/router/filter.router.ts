import {
  fetchCoursesController,
  fetchDepartmentsController,
  fetchTagsController,
  fetchYearsController,
} from "../filter/filter.controller";
import Express from "express";

export const FilterRouter = Express.Router();

FilterRouter.get("/get-tags", fetchTagsController);

FilterRouter.get("/get-years", fetchYearsController);

FilterRouter.get("/get-departments", fetchDepartmentsController);

FilterRouter.get("/get-courses", fetchCoursesController);
