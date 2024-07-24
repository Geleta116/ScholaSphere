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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const SignUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
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

    return response.json() as Promise<AuthResponse>;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error((error as Error).message || "Signup failed");
  }
};

export const Login = async (payload: LoginPayload): Promise<AuthResponse> => {
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

    const tokens: AuthResponse = await response.json();
    return tokens;
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error((error as Error).message || "Signup failed");
  }
};

export const fetchUserRole = async () => {
  try {
    const response = await fetch(`${api}/${authPath}/fetchRole`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to signup");
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message || "Signup failed");
  }
};
