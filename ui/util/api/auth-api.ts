import { api } from "./shared";

export const SignUp = async (
  email: string,
  name: string,
  password: string,
  username: string,
  phonenumber: string | undefined
): Promise<void> => {
  try {
    const body = {
      email: email,
      password: password,
      phonenumber: phonenumber,
      username: username,
      name: name,
    };
    const res = await fetch(`${api}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("Failed to signup");
    }
    
    return res.json();
  } catch (e) {}
};
