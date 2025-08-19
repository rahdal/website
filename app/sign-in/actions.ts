import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function auth(formData: FormData) {
  "use server";

  const session = await getSession();
  const submittedPassword = formData.get("password");
  const redirectPath = (formData.get("redirect") as string) || "/";

  const shouldAuthenticate = submittedPassword === process.env.IRON_SESSION_PASSWORD;

  session.isAuthenticated = Boolean(shouldAuthenticate);
  await session.save();

  if (!shouldAuthenticate) {
    redirect(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
  }

  redirect(redirectPath.startsWith("/") ? redirectPath : "/");
}


