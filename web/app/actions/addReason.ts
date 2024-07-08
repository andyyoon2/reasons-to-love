"use server";

import { getAccessToken } from "@auth0/nextjs-auth0";
import { fetchServerSide } from "../utils";
import { revalidatePath } from "next/cache";

const API_HOST = process.env.REASONS_API_HOST || "";

export async function addReason(username: string, partnership: any, formData: FormData) {
  console.log(partnership, formData);

  // TODO: Reuse fetchServerSide later
  const {accessToken} = await getAccessToken();
  if (!accessToken) {
    // TODO: Make better
    throw new Error("Unauthenticated. Please log in.");
  }

  const payload = {
    username: username,
    partnership: partnership.id,
    message: formData.get("message"),
  }

  try {
    const res = await fetch(`${API_HOST}/reasons/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`
      }
    });
  
    const resData = await res.json();
    console.log(resData);
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error("Error creating the message.");
  }
}
