import express, { NextFunction, Response } from "express";
import { Req } from "@/utils/req";
import { plainToClass, plainToInstance } from "class-transformer";
import { UploadVideoDto } from "./contrat/dtos/Upload_video.dto";
import { findUserFromToken } from "@/auth/auth.service";

export const UploadVideoController = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
    const videoDto = plainToInstance(UploadVideoDto, req.body, {excludeExtraneousValues: true});
    const token = req.headers.authorization?.split(" ")[1];
    const createdById =  await findUserFromToken(token as string);
    videoDto.createdById = createdById;
    videoDto.title = videoDto.title || req.file?.originalname || "";
    if (typeof videoDto.year == "string") {
        videoDto.year =  parseInt(videoDto.year);
    }

    await AddVide(videoDto);
    res.json({message: "video uploaded successfully"})

    
};
