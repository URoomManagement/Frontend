"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedLayout({
  children,
  redirectTo = "/login",
}: ProtectedLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login" && !isLoading && !user) {
      router.push(redirectTo);
    }
  }, [isLoading, user, router, redirectTo, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (pathname === "/login" || user) {
    return <>{children}</>;
  }

  return null;
}
