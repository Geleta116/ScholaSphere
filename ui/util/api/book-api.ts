import { api, bookPath } from "./shared";

export interface CreateBookPayload {
  title: string;
  description: string;
  tags: string[];
  file: File;
  year: number;
  department: string;
  course: string;
}

export interface UpdateBookPayload {
  bookId: string;
  title?: string;
  description?: string;
  tags?: string[];
  file?: File;
  year?: number;
  department?: string;
  course?: string;
}

export interface FilterBookPayload {
  tags?: string[];
  department?: string;
  year?: number;
  course?: string;
}
export const uploadBook = async (payload: CreateBookPayload) => {
  try {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("tags", JSON.stringify(payload.tags));
    formData.append("file", payload.file);
    formData.append("year", payload.year.toString());
    formData.append("department", payload.department);

    const response = await fetch(`${api}/${bookPath}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload book");
    }

    return response.json();
  } catch (e) {
    console.log("Upload error:", e);
    throw new Error("Upload failed");
  }
};

export const updateBook = async (payload: UpdateBookPayload) => {
  try {
    const formData = new FormData();
    if (payload.title) {
      formData.append("title", payload.title);
    }
    if (payload.description) {
      formData.append("description", payload.description);
    }
    if (payload.tags) {
      formData.append("tags", JSON.stringify(payload.tags));
    }
    if (payload.file) {
      formData.append("file", payload.file);
    }
    if (payload.year) {
      formData.append("year", payload.year.toString());
    }
    if (payload.department) {
      formData.append("department", payload.department);
    }

    const response = await fetch(
      `${api}/${bookPath}/update-book:${payload.bookId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );
  } catch (e) {
    console.log("Update error:", e);
    throw new Error("Update failed");
  }
};

export const filterBook = async();
