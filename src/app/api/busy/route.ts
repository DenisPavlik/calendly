import { connectToDB } from "@/libs/connectToDB";
import { nylas } from "@/libs/nylas";
import { Profile } from "@/libs/types";
import { ProfileModel } from "@/models/Profile";
import { NextRequest } from "next/server";
import { TimeSlot } from "nylas";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  const from = new Date(url.searchParams.get("from") as string);
  const to = new Date(url.searchParams.get("to") as string);

  await connectToDB();

  const profileDoc = await ProfileModel.findOne({ username }) as Profile;
  if (!profileDoc) {
    return Response.json("invalid username and/or bookingUri", { status: 404 });
  }

  const nylasBusyResult = await nylas.calendars.getFreeBusy({
    identifier: profileDoc.grantId,
    requestBody: {
      emails: [profileDoc.email],
      startTime: Math.round(from.getTime() / 1000),
      endTime: Math.round(to.getTime() / 1000),
    }
  })

  let busySlots: TimeSlot[] = [];
  
  if (nylasBusyResult.data?.[0]) {
    // @ts-ignore
    const slots = nylasBusyResult.data?.[0]?.timeSlots as TimeSlot[];
    // @ts-ignore
    busySlots = slots.filter(slot => slot.status === 'busy');
  }

  return Response.json(
    busySlots
  )
}
