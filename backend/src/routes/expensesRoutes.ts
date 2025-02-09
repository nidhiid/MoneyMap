import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/expenses/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const response = await axios.get(`${process.env.NESSIE_BASE_URL}/accounts/${customerId}/purchases`, {
      params: { key: process.env.NESSIE_API_KEY },
    });

    const expenses = response.data.map((item: any) => ({
      amount: item.amount,
      category: item.category,
      merchant: item.merchant_id,
      date: item.purchase_date,
    }));

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

export default router;
