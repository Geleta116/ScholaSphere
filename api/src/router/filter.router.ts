import {
  fetchCourses,
  fetchDepartments,
  fetchTags,
  fetchYears,
} from "@/filter/filter.service";
import Express from "express";

export const FilterRouter = Express.Router();

FilterRouter.get("/get-tags", fetchTags);

FilterRouter.get("/get-years", fetchYears);

FilterRouter.get("/get-departments", fetchDepartments);

FilterRouter.get("/get-courses", fetchCourses);
