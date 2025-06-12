import DashboardNav from "@/app/components/DashboardNav";
import { getSessionEmailFromCookies } from "@/libs/getSessionEmail";
// import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const email = await getSessionEmailFromCookies()
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
