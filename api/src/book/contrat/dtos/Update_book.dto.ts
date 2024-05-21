import { Expose } from "class-transformer";

export class UpdateBookDto {
    @Expose()
    title?: string;
  
    @Expose()
    author?: string;
  
    @Expose()
    description?: string;
  
    @Expose()
    year?: number;
  
    @Expose()
    course?: string;
  
    @Expose()
    department?: string;
}