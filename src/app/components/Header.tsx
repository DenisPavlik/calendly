import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex gap-4 justify-between py-6 text-gray-600 font-light items-center">
        <div className="flex md:gap-10 sm:gap-6 gap-4 items-center">
          <Link
            href={"/"}
            className="text-blue-600 font-bold sm:text-2xl text-sm flex items-center gap-1"
          >
            <CalendarDays size={24} />
            Calendly
          </Link>
          <nav className="flex sm:gap-4 gap-2 sm:text-base text-sm">
            <Link href={"/features"}>Features</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/about"}>About</Link>
          </nav>
        </div>
        <nav className="flex sm:gap-4 gap-2 items-center sm:text-base text-sm">
          <Link href={"/sing-in"}>Sing in</Link>
          <Link
            href={"/sing-up"}
            className="bg-blue-600 text-white sm:py-2 sm:px-4 p-1 rounded-full"
          >
            Get started
          </Link>
        </nav>
      </header>
  )
}