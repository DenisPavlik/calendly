import { ReactNode } from "react";
import { connectToDB } from "@/libs/connectToDB";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { Clock, Info } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
  params: {
    username: string;
    "booking-uri": string;
  };
};

export default async function BookingBoxLayout(props: LayoutProps) {
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
    <div>
      <div
        className="h-screen bg-cover flex items-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="w-full text-center">
          <div className="inline-flex flex-col sm:flex-row
          shadow-md rounded-lg overflow-hidden mx-2 md:mx-auto">
            <div className="bg-sky-100/50 w-100 flex flex-col gap-4 p-4">
              <h1 className="text-2xl text-left border-b border-black/20 pb-2 font-semibold">
                {etDoc.title}
              </h1>
              <div className="flex items-center gap-2">
                <div>
                  <Clock />
                </div>
                <div>{etDoc.length}min</div>
              </div>
              <div className="flex gap-2 text-left">
                <div>
                  <Info />
                </div>
                <div>{etDoc.description}</div>
              </div>
            </div>
            <div className="bg-white/80 grow">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
