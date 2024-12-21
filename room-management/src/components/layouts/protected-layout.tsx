"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedLayout({ 
  children,
  redirectTo = "/login" 
}: ProtectedLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname()
  if(pathname === "/login") return <>{children}</>
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo)
    }
  }, [isLoading, user, router, redirectTo])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
