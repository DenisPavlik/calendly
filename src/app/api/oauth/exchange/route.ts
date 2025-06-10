import { connectToDB } from "@/libs/connectToDB";
import { nylas, nylasConfig } from "@/libs/nylas";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {
      status: 400,
    });
  }

  const response = await nylas.auth.exchangeCodeForToken({
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId as string, // Note this is *different* from your API key
    redirectUri: nylasConfig.callbackUri, // URI you registered with Nylas in the previous step
    code,
  });
  const { grantId, email } = response;

  await connectToDB();
  
  
  const profileDoc = await ProfileModel.findOne({ email });
  if (profileDoc) {
    profileDoc.grantId = grantId;
    await profileDoc.save();
  } else {
    await ProfileModel.create({ email, grantId });
  }

  // await session().set("grandId", grantId);
  console.log("✅ EMAIL to set:", email);
  await session().set("email", email);
  console.log("✅ Session set successfully");


  return Response.redirect(new URL("/", req.url), 302);
}
