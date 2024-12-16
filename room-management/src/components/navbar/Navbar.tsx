import Link from "next/link"
import { CgProfile } from "react-icons/cg";

export default function Component() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 shadow-sm bg-gray-800/90 text-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
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
            <Link href="/users/1" prefetch={false}>
                <CgProfile className="cursor-pointer" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}