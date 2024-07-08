import { Expose } from "class-transformer";

export class UploadVideoDto {
    @Expose()
    title!: string

    @Expose()
    createdById!: string;

    @Expose()
    description?: string;
  
    @Expose()
    year!: number;
  
    @Expose()
    course!: string;
  
    @Expose()
    department!: string;
}
