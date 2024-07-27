import { Book } from "@/model/Book";
import { api, bookPath } from "./shared";

export interface CreateBookPayload {
  title: string;
  description: string;
  tags: string[];
  file: File | null;
  year: number;
  department: string;
  course: string;
  author: string;
}

export interface UpdateBookPayload {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  file?: File;
  year?: number;
  department?: string;
  course?: string;
  author?: string;
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
    
    payload.tags.forEach((tag) => {
      formData.append("tags", tag);
    });
    if (payload.file) {
      formData.append("file", payload.file);
    }
    formData.append("year", payload.year.toString());
    formData.append("department", payload.department);
    formData.append("course", payload.course);
    formData.append("author", payload.author);

    const response = await fetch(`${api}/${bookPath}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
    console.log('Payload before stringification:', payload);

    const response = await fetch(`${api}/${bookPath}/update-book/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payload),
    });

    console.log('Payload after stringification:', JSON.stringify(payload));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update book");
    }

    return;
  } catch (e) {
    console.log("Update error:", e);
    throw new Error("Update failed");
  }
};
export const filterBook = async (
  payload: FilterBookPayload
): Promise<{ books: Book[] }> => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, item));
      } else if (value !== undefined) {
        queryParams.set(key, value.toString());
      }
    });
    const response = await fetch(
      `${api}/${bookPath}/filter-book?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Filter error:", e);
    throw new Error("Filter failed");
  }
};

export const filterUnApprovedBook = async (
  payload: FilterBookPayload
): Promise<{ books: Book[] }> => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, item));
      } else if (value !== undefined) {
        queryParams.set(key, value.toString());
      }
    });
    const response = await fetch(
      `${api}/${bookPath}/filter-unapproved-book?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Filter error:", e);
    throw new Error("Filter failed");
  }
};

export const getBookById = async (bookId: string) => {
  try {
    const response = await fetch(
      `${api}/${bookPath}/get-book-by-id/${bookId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get book");
    } else {
      return response.json();
    }
  } catch (e) {
    console.log("Get book error:", e);
    throw new Error("Failed to get book");
  }
};



export const deleteBook = async (bookId: string) => {
  try {
    const response = await fetch(`${api}/${bookPath}/delete-book/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete book");
    }
  } catch (e) {
    console.log("Delete book error:", e);
    throw new Error("Failed to delete book");
  }
};

export const GetApprovedBooks = async () => {
  try {
    const response = await fetch(`${api}/${bookPath}/get-approved-books`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get approved books");
    } else {
      return response.json();
    }
  } catch (e) {
    console.log("Get approved books error:", e);
    throw new Error("Failed to get approved books");
  }
};

export const approveBook = async (bookId: string) => {
  try {
    const response = await fetch(`${api}/${bookPath}/approve-book/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to approve book");
    }
  } catch (e) {
    console.log("Approve book error:", e);
    throw new Error("Failed to approve book");
  }
};

export const unApproveBook = async (bookId: string) => {
  try {
    const response = await fetch(`${api}/${bookPath}/unapprove-book/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to approve book");
    }
  } catch (e) {
    console.log("Approve book error:", e);
    throw new Error("Failed to approve book");
  }
};

export const getYourApprovedBooks = async () => {
  try {
    const response = await fetch(`${api}/${bookPath}/get-your-approved-books`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get your approved books");
    } else {
      return response.json();
    }
  } catch (e) {
    console.log("Get your approved books error:", e);
    throw new Error("Failed to get your approved books");
  }
};

export const GetYourUnApprovedBooks = async () => {
  try {
    const response = await fetch(
      `${api}/${bookPath}/get-your-unapproved-books`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to get your unapproved books"
      );
    } else {
      return response.json();
    }
  } catch (e) {
    console.log("Get your unapproved books error:", e);
    throw new Error("Failed to get your unapproved books");
  }
};

export const downloadBook = async (bookName: string) => {
  try {
    const response = await fetch(
      `${api}/${bookPath}/download-book/${bookName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download the file");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = bookName;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
