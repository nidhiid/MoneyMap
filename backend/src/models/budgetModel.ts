import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  budget: { type: Number, required: true },
});

export default mongoose.model("Budget", BudgetSchema);
