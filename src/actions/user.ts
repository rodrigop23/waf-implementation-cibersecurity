/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { setSession } from "@/lib/session";
import { invalidateSession, validateRequest } from "@/lib/auth";

export async function loginAction(formData: {
  [k: string]: FormDataEntryValue;
}) {
  try {
    const url = new URL("/api/users/login", process.env.HOST_URL);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.message);
    }

    await setSession(data.user.id);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function registerAction(formData: {
  [k: string]: FormDataEntryValue;
}) {
  try {
    const url = new URL("/api/users", process.env.HOST_URL);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.message);
    }

    await setSession(data.user.id);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function logoutAction() {
  const { session } = await validateRequest();

  if (!session) {
    return true;
  }

  await invalidateSession(session.id);

  return true;
}
