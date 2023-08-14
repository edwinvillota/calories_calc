import { PropsWithChildren } from "react";
import { AuthService } from "../_services";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const auth = await AuthService.getAuthState();

  if (!auth.isAuthenticated) {
    redirect("/");
  }

  return <main>{children}</main>;
}
