"use server";

import { sendEmail } from "@/lib/mailer";
import { verifyEmailTemplate } from "@/utils/emailTemplate";
import { v4 as uuidv4, v1 as uuidv1 } from "uuid";
import { generateHash } from "@/lib/hash";
import { createUser } from "@/queries/user.query";

export default async function signUp(data: FormData) {
  const email = data.get("email") as string;
  const nama = data.get("nama") as string;
  const password = data.get("password") as string;
  const token = [uuidv1(), uuidv4()].join("-");
  const html = verifyEmailTemplate(
    email,
    process.env.NEXTAUTH_URL + "auth/verify?token=" + token
  );

  try {
    const hashedPass = generateHash(password);
    await createUser({
      email: email,
      nama: nama,
      password: hashedPass,
      role: "USER",
      token: token,
    });
    await sendEmail(email, html);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}