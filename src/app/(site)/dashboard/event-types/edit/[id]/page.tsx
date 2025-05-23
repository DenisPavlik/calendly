import EventTypeForm from "@/app/components/EventTypeForm";
import { connectToDB } from "@/libs/connectToDB";
import { EventTypeModel } from "@/models/EventType";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditEventTypePage({ params }: PageProps) {
  await connectToDB();
  const eventtypeDoc = await EventTypeModel.findById(params.id);
  if (eventtypeDoc) {
    return (
      <div>
        <EventTypeForm doc={JSON.parse(JSON.stringify(eventtypeDoc))} />
      </div>
    );
  } else {
    return <div>Event by id:{params.id} not found</div>;
  }
}
