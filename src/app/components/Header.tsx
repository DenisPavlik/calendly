"use server";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function Header({email}: {email?: string}) {

  return (
    <header className="flex gap-4 justify-between py-6 text-gray-600 font-light items-center">
      <div className="flex md:gap-10 sm:gap-6 gap-2 items-center">
        <Link
          href={"/"}
          className="text-blue-600 font-bold sm:text-2xl text-sm flex items-center gap-1"
        >
          <CalendarDays size={24} />
          Calendly
        </Link>
        <nav className="flex sm:gap-4 gap-2 sm:text-base text-sm">
          <Link href={"/features"}>Features</Link>
          <Link href={"/pricing"} className="hidden sm:block">Pricing</Link>
          <Link href={"/about"} className="hidden sm:block">About</Link>
        </nav>
      </div>
      {email && (
        <nav className="flex items-center text-sm sm:text-base gap-2 sm:gap-4">
          <Link
            href={"/dashboard"}
            className="btn bg-blue-600 text-white"
          >
            Dashboard
          </Link>
          <a href={"/api/logout"}>Logout</a>
        </nav>
      )}
      {!email && (
        <nav className="flex sm:gap-4 gap-1 items-center sm:text-base text-sm">
          <a href={"/api/auth"}>Sing in</a>
          <a
            href={"/api/auth"}
            className="btn bg-blue-600 text-white text-nowrap"
          >
            Get started
          </a>
        </nav>
      )}
    </header>
  );
}
