"use server";

import DashboardNav from "@/app/components/DashboardNav";
import { connectToDB } from "@/libs/connectToDB";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import clsx from "clsx";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function EventTypesPage() {
  await connectToDB();
  const email = await session().get("email");

  const eventTypes = await EventTypeModel.find({ email });
  return (
    <div>
      <DashboardNav />
      <div className="border rounded-xl my-6">
        {eventTypes.map((et, index) => (
          <Link
            key={index}
            href={"/dashboard/event-types/edit/" + et.id}
            className={clsx(
              "block p-2",
              index !== eventTypes.length - 1 ? "border-b" : ""
            )}
          >
            {et.title}
            <span className="text-gray-500 ml-4 text-sm">
              {process.env.NEXT_PUBLIC_URL as string}/username/{et.uri}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          href={"/dashboard/event-types/new"}
        >
          Add event <CirclePlus />
        </Link>
      </div>
    </div>
  );
}
