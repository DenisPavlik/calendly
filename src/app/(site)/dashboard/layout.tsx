import DashboardNav from "@/app/components/DashboardNav";
import NotLoggedIn from "@/app/components/NotLoggedIn";
import Preloader from "@/app/components/Preloader";
import { getSessionEmailFromCookies } from "@/libs/getSessionEmail";
// import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const email = await getSessionEmailFromCookies();
  if (!email) {
    return <NotLoggedIn />
  }
  const profileDoc = await ProfileModel.findOne({ email });
  return (
    <div>
      <DashboardNav username={profileDoc?.username} />
      {children}
    </div>
  );
}
