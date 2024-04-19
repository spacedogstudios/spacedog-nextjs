"use server";

import { signIn, signOut } from "@/auth";

type SignInOptions = Parameters<typeof signIn>[1];

export async function signInAction(provider: string, options?: SignInOptions) {
  await signIn(provider, options);
}

export async function signOutAction() {
  await signOut();
}
