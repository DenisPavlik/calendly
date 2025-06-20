"use server";

import DashboardNav from "@/app/components/DashboardNav";
import { connectToDB } from "@/libs/connectToDB";
import { getSessionEmailFromCookies } from "@/libs/getSessionEmail";
// import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import clsx from "clsx";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function EventTypesPage() {
  await connectToDB();
  const email = await getSessionEmailFromCookies();
  const eventTypes = await EventTypeModel.find({ email });
  const profileDoc = await ProfileModel.findOne({ email });
  
  return (
    <div>
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
              {process.env.NEXT_PUBLIC_URL as string}/{profileDoc.username}/{et.uri}
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
