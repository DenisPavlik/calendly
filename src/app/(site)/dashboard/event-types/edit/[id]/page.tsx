import EventTypeForm from "@/app/components/EventTypeForm";
import { connectToDB } from "@/libs/connectToDB";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditEventTypePage({ params }: PageProps) {
  await connectToDB();
  const email = await session().get("email");
  const eventtypeDoc = await EventTypeModel.findById(params.id);
  const profileDoc = await ProfileModel.findOne({ email });
  if (eventtypeDoc) {
    return (
      <div>
        <EventTypeForm
          username={profileDoc?.username || ""}
          doc={JSON.parse(JSON.stringify(eventtypeDoc))}
        />
      </div>
    );
  } else {
    return <div>Event by id:{params.id} not found</div>;
  }
}
