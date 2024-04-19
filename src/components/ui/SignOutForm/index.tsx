import { signOutAction } from "@/actions";

export default function SignOutForm() {
  return (
    <form action={() => signOutAction()}>
      <button
        type="submit"
        className="relative flex justify-center items-center w-48 h-16 bg-sky-700 uppercase text-xl text-white"
      >
        Sign out
      </button>
    </form>
  );
}
