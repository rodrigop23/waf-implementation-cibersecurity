import RegisterForm from "@/components/register-form";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 px-4">
      <RegisterForm />

      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <span>{"password'); DROP TABLE users;--"}</span>
      </div>
    </div>
  );
}
