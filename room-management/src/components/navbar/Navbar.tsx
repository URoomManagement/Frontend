import Link from "next/link"
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { logout } from "@/lib/auth"
import { TbCircleLetterU } from "react-icons/tb";
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  const router = useRouter()
  const { setUser } = useAuth()
  const { toast } = useToast()

  // Handle logout function
  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      toast({
        title: "Success",
        description: "Logged out successfully.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout.",
      })
    }
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 shadow-sm bg-gray-800/90 text-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <TbCircleLetterU size={26} />
            <span className="p-3">URoom</span>
          </Link>
          <nav className="hidden md:flex gap-4 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/reserve"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/reservation/1"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Reservations
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <CgProfile className="cursor-pointer" size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/users/1">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}