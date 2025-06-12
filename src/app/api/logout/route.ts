import { sessionOptions } from '@/libs/session';
import { getIronSession } from 'iron-session';
// import { session } from "@/libs/session";
// import { redirect } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   // await session().set('grandId', null)
//   // await session().set('email', null)
//   await session().destroy();
//   // redirect('/?logged-out=1');
//   redirect('/');
// }

export async function GET(req: NextRequest) {
  const res = new NextResponse();

  const session = await getIronSession(req, res, sessionOptions);
  await session.destroy();

  return NextResponse.redirect(new URL("/", req.url), {
    headers: res.headers
  })
}