"use server";

import { connectToDB } from "@/libs/connectToDB";
import { session } from "@/libs/session";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import { format } from "date-fns";

export default async function BookedEventsPage() {
  await connectToDB();
  const email = await session().get("email");
  const etDocs = await EventTypeModel.find({ email });
  const bookedEnvents = await BookingModel.find({
    eventTypeId: etDocs.map((doc) => doc._id),
  }, {}, {sort: 'when'});

  return (
    <div className="mt-8 flex flex-col gap-2">
      
      {bookedEnvents.map((booking, index) => {
        const etDoc = etDocs.find(
          (etd) => (etd._id as string).toString() === booking.eventTypeId
        );
        return (
          <div key={index} className="p-4 border-b bg-gray-100">
            <h3>{etDoc.title}</h3>
            <span>{format(booking.when, "EEEE, MMMM d, HH:mm")}</span>
            <span>Winth: {booking.guestName} Email: {booking.guestEmail}</span>
            {booking.guestNote && (
              <p>Message from guest: booking.guestNote</p>
            )}
          </div>
        );
      })}
      {/* {JSON.stringify(bookedEnvents)} */}
    </div>
  );
}
