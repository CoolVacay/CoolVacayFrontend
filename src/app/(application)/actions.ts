"use server";

import { postFetch } from "../utils/api-helpers";

export async function enquire(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await postFetch(`/listings`, {
      name: formData.get("name") as string,
      message: formData.get("message") as string,
      phone: formData.get("number") as string,
      email: formData.get("email") as string,
      id: formData.get("id") as string,
    });
  } catch (error) {
    console.error("Error:", error);
    return "Failed to send message";
  }
}
