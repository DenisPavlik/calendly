"use server";

import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { CirclePlus } from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";

export default async function EventTypesPage() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");
  const eventTypes = await EventTypeModel.find({ email });
  return (
    <div>
      <DashboardNav />
      <div className="flex justify-center mt-8">
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
