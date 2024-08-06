import { api, userPath } from "./shared";

export const GetAllUser = async () => {
    try {
        const response = await fetch(`${api}/${userPath}/get-all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to signup");
        }
        return response.json();

    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message || "Signup failed");
    }
}

export const GetProfile = async () => {
    try {
        const response = await fetch(`${api}/users/get-profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to signup");
        }
        return response.json();

    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message || "Signup failed");
    }
}

export const DeleteUser = async (id: string) => {
    try {
        const response = await fetch(`${api}/${userPath}/delete-user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to signup");
        }
        return response.json();

    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message || "Signup failed");
    }

}

export const UpdateProfile = async (id: string, updateDto: any) => {
    try {
        const response = await fetch(`${api}/${userPath}/update-profile/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(updateDto)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to signup");
        }
        return response.json();

    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message || "Signup failed");
    }

}

export const PromoteToAdmin = async (id: string) => {
    try {
        const response = await fetch(`${api}/${userPath}/promot-to-admin/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to signup");
        }
        return response.json();

    } catch (error) {
        console.log(error)
        throw new Error((error as Error).message || "Signup failed");
    }

}