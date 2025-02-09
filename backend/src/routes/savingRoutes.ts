import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();


router.get("/savings/:customerId", async (req, res) => {
    const { customerId } = req.params;
  
    try {
      const response = await axios.get(`${process.env.NESSIE_BASE_URL}/accounts/${customerId}/purchases`, {
        params: { key: process.env.NESSIE_API_KEY },
      });
  
      const userExpenses = response.data.reduce((sum: number, item: any) => sum + item.amount, 0);
      const recommendedSavings = userExpenses * 0.2; // Save 20% of total expenses
  
      res.json({ recommendedSavings });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch savings data" });
    }
  });
  
  export default router;
