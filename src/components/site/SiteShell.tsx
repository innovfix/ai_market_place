"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/onboarding") || pathname.startsWith("/users/") || pathname.startsWith("/dashboard") || pathname.startsWith("/seller-dashboard");

  return (
    <>
      {!hideHeader ? <Header /> : null}
  {children}
  <Footer />
    </>
  );
}


