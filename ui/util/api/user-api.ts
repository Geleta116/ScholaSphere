import { api, userPath } from "./shared";

export const GetAllUser = async () => {
    try {
        const response = await fetch(`${api}/${userPath}/get-all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
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