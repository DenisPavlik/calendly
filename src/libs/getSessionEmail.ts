import { getIronSession, IronSessionData } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./session";
import { NextRequest } from "next/server";

export async function getSessionEmailFromCookies(): Promise<
  string | undefined
> {
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  return session.email;
}

export async function getSessionEmailFromRequest(
  req: NextRequest
): Promise<string | undefined> {
  const res = new Response();
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  return session.email;
}
