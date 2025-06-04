import TimePicker from "@/app/components/TimePicker";
import { connectToDB } from "@/libs/connectToDB";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
  };
};

export default async function BookingPage(props: PageProps) {
  await connectToDB();
  const profileDoc = await ProfileModel.findOne({
    username: props.params.username,
  });
  if (!profileDoc) {
    return "404 P";
  }
  const etDoc = await EventTypeModel.findOne({
    email: profileDoc.email,
    uri: props.params["booking-uri"],
  });
  if (!etDoc) {
    return "404 ET";
  }
  return (
    <TimePicker
      bookingTimes={JSON.parse(JSON.stringify(etDoc?.bookingTimes))}
      length={etDoc.length}
      username={props.params.username}
      meetingUri={etDoc.uri}
    />
  );
}
