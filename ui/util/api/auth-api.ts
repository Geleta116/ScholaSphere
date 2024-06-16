import { api, authPath } from "./shared";

export interface SignUpPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  phoneNumber?: string;
}

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

export const SignUp = async (
  payload: SignUpPayload
): Promise<SignUpResponse> => {
  try {
    const response = await fetch(`${api}/${authPath}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to signup");
    }

    return response.json() as Promise<SignUpResponse>;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error((error as Error).message || "Signup failed");
  }
};

export const Login = async (
  payload: LoginPayload
): Promise<SignUpResponse> => {
  try {
    const response = await fetch(`${api}/${authPath}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to signup");
    }

    return response.json() as Promise<SignUpResponse>;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error((error as Error).message || "Signup failed");
  }
};
