import { Expose } from 'class-transformer';

export class BookDTO {
    @Expose
    title: string;

    @Expose
    author: string;

    @Expose
    description: string;

    @Expose
    image: string;

    @Expose
    createdById: string;

    @Expose
    year: number;

    @Expose
    course: string;

    @Expose
    department: string;
}