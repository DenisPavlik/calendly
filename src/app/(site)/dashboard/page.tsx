'use server'

import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";

export default async function DashboardPage() {
  const email = await session().get('email');

  if (!email) {
    return (
      <div className="text-center font-semibold text-xl mt-20">
        <h1>You are not logged in</h1>
      </div>
    )
  }
  return (
    <div>
      <DashboardNav />
      booked events here
    </div>
  )
}