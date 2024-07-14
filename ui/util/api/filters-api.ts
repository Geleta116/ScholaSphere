import {api, filterPath} from "./shared";

export const fetchTags = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${api}/${filterPath}/get-tags`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch tags:", error);
        throw new Error((error as Error).message || "Failed to fetch tags");
    }
}

export const fetchYears = async ():Promise<number[]> => {
    try {
        const response = await fetch(`${api}/${filterPath}/get-years`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch years:", error);
        throw new Error((error as Error).message || "Failed to fetch years");
    }
}

export const fetchDepartments = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${api}/${filterPath}/get-departments`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw new Error((error as Error).message || "Failed to fetch departments");
    }
}

export const fetchCourses = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${api}/${filterPath}/courses`);
        return response.json();
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        throw new Error((error as Error).message || "Failed to fetch courses");
    }
}   