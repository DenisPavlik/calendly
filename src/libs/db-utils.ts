import { ProfileModel } from "@/models/Profile";
import { connectToDB } from "./connectToDB";

export async function getUsernameByEmail(email: string) {
  await connectToDB();
  const profileDoc = await ProfileModel.findOne({ email });
  return profileDoc?.username || null;
}
