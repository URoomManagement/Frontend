"use client"

import { AuthTabs } from "@/components/auth/auth-tabs"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { TbCircleLetterU } from "react-icons/tb"

export default function Page() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/reserve")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <AuthTabs />
    </div>
  )
}
