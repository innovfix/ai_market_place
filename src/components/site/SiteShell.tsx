"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/onboarding") || pathname.startsWith("/users/");

  return (
    <>
      {!hideHeader ? <Header /> : null}
      {children}
    </>
  );
}


