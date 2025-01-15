"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function addReason(partnership: any, formData: FormData) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthenticated. Please log in.");
  }

  console.log(partnership, formData);
  // try {
  //   const message = await prisma.message.create({
  //     data: {
  //       message: formData.get("message") as string,
  //       partnershipId: partnership.id,
  //       authorId: session.user.sub,
  //     }
  //   });

  //   revalidatePath("/");
  //   return message;
  // } catch (err) {
  //   console.error(err);
  //   throw new Error("Error creating the message.");
  // }
}
