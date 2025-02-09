import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customerId: { type: String, required: true, unique: true }, // Linked to Nessie API
});

export default mongoose.model("User", UserSchema);
