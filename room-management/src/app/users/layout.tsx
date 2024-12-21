import { ProtectedLayout } from "@/components/layouts/protected-layout"

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>
}