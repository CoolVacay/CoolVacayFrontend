"use server";

import { AuthError } from "next-auth";
import { getFetch } from "~/app/utils/api-helpers";
import { signIn, signOut } from "~/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function logOut() {
  try {
    await Promise.all([
      getFetch("/Auth/logout", true),
      signOut({ redirectTo: "/" }),
    ]);
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("AuthError: ", error);
    }
    throw error;
  }
}
