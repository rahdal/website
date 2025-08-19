import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { auth } from "./actions";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SignIn(props: Props) {
  const searchParams = props.searchParams;
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      <main className="max-w-xl w-full mt-12 relative">
        <h1 className="text-2xl font-semibold mb-6">text me for password :)</h1>
        <form action={auth} className="space-y-4">
          <input name="redirect" type="hidden" defaultValue={String(searchParams.redirect || "/")} />
          <label className="block space-y-2">
            <span>password</span>
            <input name="password" type="password" required autoFocus className="w-full rounded-md px-3 py-2 text-black" />
          </label>
          <button type="submit" className="px-4 py-2 bg-white text-black rounded-md">access</button>
        </form>
      </main>
    </div>
  );
}


