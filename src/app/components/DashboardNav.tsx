"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function DashboardNav({ username }: { username?: string }) {
  const pathName = usePathname();
  const ifEventTypesPage = pathName.includes("event-types");
  const ifBookedEventsPage = pathName.includes("booked-events");
  return (
    <div className="flex gap-2 justify-center text-nowrap">
      <Link
        href={"/dashboard"}
        className={clsx(
          "rounded-full px-4 py-2",
          !ifEventTypesPage && !ifBookedEventsPage
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        )}
      >
        Profile
      </Link>
      {username && (
        <>
          <Link
            href={"/dashboard/booked-events"}
            className={clsx(
              "rounded-full px-4 py-2",
              ifBookedEventsPage
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
        </>
      )}
    </div>
  );
}
