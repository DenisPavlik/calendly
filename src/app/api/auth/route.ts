import { nylas, nylasConfig } from "@/libs/nylas";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
  });

  return Response.redirect(authUrl, 302);
}