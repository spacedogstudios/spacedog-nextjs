"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signInAction } from "@/actions";
import { AUTH_PROVIDERS } from "@/lib/constants";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const options = redirectTo ? { redirectTo } : {};

  return (
    <div className="flex flex-row gap-12 pb-8">
      {AUTH_PROVIDERS.map((provider) => {
        const providerLower = provider.toLowerCase();
        return (
          <form
            key={providerLower}
            action={() => signInAction(providerLower, options)}
          >
            <button
              type="submit"
              className="flex flex-col justify-between items-center p-4 w-32 h-32 bg-white rounded-lg border border-solid shadow-sm transition-colors duration-300 border-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-950 hover:bg-neutral-50"
            >
              <Image
                src={`${providerLower}.svg`}
                alt={`${providerLower} logo`}
                width={44}
                height={44}
              />
              <div className="text-sm text-center">{provider}</div>
            </button>
          </form>
        );
      })}
    </div>
  );
}
