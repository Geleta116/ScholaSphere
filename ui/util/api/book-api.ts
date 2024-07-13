import { api, bookPath } from "./shared";

export interface CreateBookPayload {
  title: string;
  description: string;
  tags: string[];
  file: File;
  year: number;
  department: string;
}
