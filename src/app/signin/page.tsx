export const runtime = "edge";

import { auth } from "@/auth";
import SignInForm from "@/components/ui/SignInForm";
import SignOutForm from "@/components/ui/SignOutForm";

export default async function Page() {
  const session = await auth();
  const content = session
    ? "Already authenticated."
    : "Please sign in using one of the options below:";

  return (
    <main className="h-screen max-w-7xl mx-auto py-24 px-16">
      <h1 className="text-5xl md:text-7xl text-white pb-8">Sign in</h1>
      <div className="w-full max-w-7xl aspect-video relative">
        <p className="text-white pb-8">{content}</p>
        {session ? <SignOutForm /> : <SignInForm />}
      </div>
    </main>
  );
}
