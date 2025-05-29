"use server";

import ProfileForm from "@/app/components/ProfileForm";
import { getUsernameByEmail } from "@/libs/db-utils";
import { session } from "@/libs/session";

export default async function DashboardPage() {
  const email = await session().get("email");
  const username = await getUsernameByEmail(email);

  return (
    <div>
      <ProfileForm un={username} />
    </div>
  );
}
