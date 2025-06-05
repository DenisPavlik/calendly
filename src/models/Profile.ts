import { Profile } from "@/libs/types";
import { model, models, Schema } from "mongoose";

const ProfileSchema = new Schema<Profile>({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  grantId: {type: String},
});

export const ProfileModel =
  models?.Profile || model<Profile>("Profile", ProfileSchema);
