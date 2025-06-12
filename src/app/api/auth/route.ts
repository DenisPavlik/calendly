import { nylas, nylasConfig } from "@/libs/nylas";

import { NextResponse } from "next/server";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
  });

  console.log("➡️ Redirecting to:", authUrl);

  return NextResponse.redirect(authUrl);
}