"use client";

import { logout } from "@/actions/user/action";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await logout();

    router.push("/sign-in");
  }

  return (
    <form onSubmit={onSubmit}>
      <Button
        type="submit"
        className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:px-5 sm:text-base"
      >
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Cerrar sesión
      </Button>
    </form>
  );
}
