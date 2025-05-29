import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const email = await session().get("email");
  const profileDoc = await ProfileModel.findOne({ email });
  if (!email) {
    return (
      <div className="text-center font-semibold text-xl mt-20">
        <h1>You are not logged in</h1>
      </div>
    );
  }
  return (
    <div>
      <DashboardNav username={profileDoc?.username} />
      {children}
    </div>
  );
}
