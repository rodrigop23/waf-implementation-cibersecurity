"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/user";

export default function LogoutButton() {
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await logoutAction();

    router.push("/sign-in");
  }

  return (
    <form onSubmit={onSubmit}>
      <Button type="submit">
        <LogOut />
        Cerrar sesión
      </Button>
    </form>
  );
}
