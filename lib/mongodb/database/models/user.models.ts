import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  authId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  cars: { type: [Schema.Types.ObjectId], ref: "Car" },
});

const User = models.User || model("User", UserSchema);

export default User;
