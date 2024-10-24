import { session } from "@/libs/session";
import { redirect } from "next/navigation";

export async function GET() {
  // await session().set('grandId', null)
  // await session().set('email', null)
  await session().destroy();
  // redirect('/?logged-out=1');
  redirect('/');
}