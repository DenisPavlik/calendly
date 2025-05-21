"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function DashboardNav() {
  const pathName = usePathname();
  const ifEventTypesPage = pathName.includes("event-types");
  return (
    <div className="flex gap-4 justify-center">
      <Link
        href={"/dashboard"}
        className={clsx(
          "rounded-full px-4 py-2",
          !ifEventTypesPage
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        )}
      >
        Booked events
      </Link>
      <Link
        href={"/dashboard/event-types"}
        className={clsx(
          "rounded-full px-4 py-2",
          ifEventTypesPage
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        )}
      >
        Event types
      </Link>
    </div>
  );
}
