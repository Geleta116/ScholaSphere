import { Req } from "@/utils/req";
import { fetchCourses, fetchDepartments, fetchTags, fetchYears } from "./filter.service";
import express, { NextFunction, Response } from "express";

export const fetchTagsController = async (req:Req, res: Response) => {
    try {
        const response = await fetchTags();
        return res.status(200).send(response);
    } catch (error) {
        console.error("Failed to fetch tags:", error);
        throw new Error((error as Error).message || "Failed to fetch tags");
    }
}

export const fetchYearsController = async (req:Req, res: Response) => {
    try {
        const response = await fetchYears();
       return res.status(200).send(response);
    } catch (error) {
        console.error("Failed to fetch years:", error);
        throw new Error((error as Error).message || "Failed to fetch years");
    }
}

export const fetchDepartmentsController = async (req:Req, res: Response) => {
    try {
        const response = await fetchDepartments();
       return res.status(200).send(response);
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw new Error((error as Error).message || "Failed to fetch departments");
    }
}

export const fetchCoursesController = async (req:Req, res: Response) => {
    try {
        const response = await fetchCourses();
       return res.status(200).send(response);
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        throw new Error((error as Error).message || "Failed to fetch courses");
    }
}