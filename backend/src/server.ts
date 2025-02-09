import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import compareRoutes from "./routes/compareRoutes";
import expensesRoutes from "./routes/expensesRoutes";
import savingRoutes from "./routes/savingRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api", budgetRoutes);
app.use("/api", compareRoutes);
app.use("/api", expensesRoutes);
app.use("/api", savingRoutes);

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
