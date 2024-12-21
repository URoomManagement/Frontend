import { ProtectedLayout } from "@/components/layouts/protected-layout"

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>
} 