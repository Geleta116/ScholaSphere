import { fetchCourses, fetchDepartments, fetchTags, fetchYears } from "./filter.service";

export const fetchTagsController = async () => {
    try {
        const response = await fetchTags();
        return response;
    } catch (error) {
        console.error("Failed to fetch tags:", error);
        throw new Error((error as Error).message || "Failed to fetch tags");
    }
}

export const fetchYearsController = async () => {
    try {
        const response = await fetchYears();
        return response;
    } catch (error) {
        console.error("Failed to fetch years:", error);
        throw new Error((error as Error).message || "Failed to fetch years");
    }
}

export const fetchDepartmentsController = async () => {
    try {
        const response = await fetchDepartments();
        return response;
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw new Error((error as Error).message || "Failed to fetch departments");
    }
}

export const fetchCoursesController = async () => {
    try {
        const response = await fetchCourses();
        return response;
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        throw new Error((error as Error).message || "Failed to fetch courses");
    }
}