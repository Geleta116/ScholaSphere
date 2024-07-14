import {api} from "./shared";

export const fetchTags = async () => {
    try {
        const response = await fetch(`${api}/tags`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch tags:", error);
        throw new Error((error as Error).message || "Failed to fetch tags");
    }
}

export const fetchYears = async () => {
    try {
        const response = await fetch(`${api}/years`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch years:", error);
        throw new Error((error as Error).message || "Failed to fetch years");
    }
}

export const fetchDepartments = async () => {
    try {
        const response = await fetch(`${api}/departments`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw new Error((error as Error).message || "Failed to fetch departments");
    }
}

export const fetchCourses = async () => {
    try {
        const response = await fetch(`${api}/courses`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        throw new Error((error as Error).message || "Failed to fetch courses");
    }
}   