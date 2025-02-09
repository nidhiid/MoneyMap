import express from "express";
import Budget from "../models/budgetModel";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// Save or Update Budget (Requires Authentication)
router.post("/budget", authenticateUser as any, async (req: any, res: any) => {
  const { budget } = req.body;
  const customerId = req.user.customerId;

  try {
    let userBudget = await Budget.findOne({ customerId });

    if (userBudget) {
      userBudget.budget = budget;
      await userBudget.save();
    } else {
      userBudget = new Budget({ customerId, budget });
      await userBudget.save();
    }

    res.json({ success: true, budget: userBudget });
  } catch (error) {
    res.status(500).json({ error: "Failed to store budget" });
  }
});

// Fetch Budget for Authenticated User
router.get("/budget", authenticateUser as any, async (req: any, res: any) => {
  const customerId = req.user.customerId;

  try {
    const userBudget = await Budget.findOne({ customerId });
    if (!userBudget) return res.status(404).json({ error: "No budget found for this customer" });

    res.json(userBudget);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budget" });
  }
});

export default router;
