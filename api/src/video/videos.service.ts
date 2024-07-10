import { UploadVideoDto } from "./contrat/dtos/Upload_video.dto";
import { db } from "../utils/db.server";

export async function AddVideo( videoDto: UploadVideoDto){
    try {

        await db.video.create({
            data : { ...videoDto}
        })

    }catch(e){
        throw e;
    }
}