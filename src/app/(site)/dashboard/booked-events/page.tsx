"use server";

import { connectToDB } from "@/libs/connectToDB";
import { getSessionEmailFromCookies } from "@/libs/getSessionEmail";
// import { session } from "@/libs/session";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import { format } from "date-fns";
import { CalendarDays, Clock, NotebookText, UserCircle } from "lucide-react";

export default async function BookedEventsPage() {
  await connectToDB();
  const email = await getSessionEmailFromCookies();
  const etDocs = await EventTypeModel.find({ email });
  const bookedEnvents = await BookingModel.find(
    {
      eventTypeId: etDocs.map((doc) => doc._id),
    },
    {},
    { sort: "when" }
  );

  return (
    <div className="mt-8 flex flex-col gap-2">
      {bookedEnvents.map((booking, index) => {
        const etDoc = etDocs.find(
          (etd) => (etd._id as string).toString() === booking.eventTypeId
        );
        return (
          <div key={index} className="p-4 border-b bg-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-600">
                {etDoc.title}
              </h3>

              <span className="flex items-center gap-1">
                <CalendarDays size={20} />
                {format(booking.when, "EEEE, MMMM d, HH:mm")}
              </span>
            </div>
            <span className="flex items-center gap-1 my-1 text-gray-500">
              <Clock size={20} />
              {etDoc.length}
              min
            </span>
            <div className="flex gap-2 items-center my-1">
              <UserCircle size={20} />
              <span>{booking.guestName}</span>
              <span className="text-gray-400">{booking.guestEmail}</span>
            </div>
            {booking.guestNotes && (
              <p className="flex items-center gap-1 text-gray-700">
                <NotebookText /> {booking.guestNotes}
              </p>
            )}
          </div>
        );
      })}
      {/* {JSON.stringify(bookedEnvents)} */}
    </div>
  );
}
