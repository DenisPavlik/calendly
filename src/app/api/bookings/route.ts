import { connectToDB } from "@/libs/connectToDB";
import { nylas } from "@/libs/nylas";
import { EventType } from "@/libs/types";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { addMinutes } from "date-fns";
import { NextRequest } from "next/server";

type JsonData = {
  guestEmail: string;
  guestName: string;
  guestNotes: string;
  username: string;
  bookingUri: string;
  bookingTime: string;
};

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const data: JsonData = await req.json();
    const { guestName, guestEmail, guestNotes, bookingTime } = data;

    if (
      !guestName ||
      !guestEmail ||
      !bookingTime ||
      !data.username ||
      !data.bookingUri
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const profileDoc = await ProfileModel.findOne({
      username: data.username,
    });
    if (!profileDoc) {
      return Response.json({ error: "Invalid profile URL" }, { status: 404 });
    }

    const etDoc = await EventTypeModel.findOne({
      email: profileDoc.email,
      uri: data.bookingUri,
    }) as EventType;
    if (!etDoc) {
      return Response.json({ error: "Invalid booking URL" }, { status: 404 });
    }

    await BookingModel.create({
      guestName,
      guestEmail,
      guestNotes,
      when: bookingTime,
      eventTypeId: etDoc._id,
    });

    // Add to calendar
    const grantId = profileDoc.grantId;
    const startTime = new Date(bookingTime)

    await nylas.events.create({
      identifier: grantId,
      requestBody: {
        title: etDoc.title,
        when: {
          startTime: Math.round(startTime.getTime() / 1000),
          endTime: Math.round(addMinutes(startTime, etDoc.length).getTime() / 1000),
        },
        description: etDoc.description,
        conferencing: {
          autocreate: {},
          provider: 'Google Meet',
        },
        participants: [
          {
            name: guestName,
            email: guestEmail,
            status: 'yes'
          }
        ]
      },
      queryParams: {
        calendarId: etDoc.email
      }
    })

    return Response.json(
      { message: "Booking created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST /api/bookings:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
