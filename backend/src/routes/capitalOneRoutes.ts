import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Fetch customers from Nessie Public API
router.get("/customers", async (req, res) => {
  try {
    console.log("IN THE CUSTOMERS!!" + `\n${process.env.NESSIE_BASE_URL}/customers`);
    const response = await axios.get(`${process.env.NESSIE_BASE_URL}/customers`, {
      params: { key: process.env.NESSIE_API_KEY }, // Secure API key in .env
      headers: { Accept: "application/json" },
    });

    res.json(response.data); // Send Nessie API response to frontend
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers from Nessie API" });
  }
});

router.get("/customer", async (req: any, res) => {
  try {
    console.log("IN THE CUSTOMERS!!" + `\n${process.env.NESSIE_BASE_URL}/customer/${req.id}`);
    const response = await axios.get(`${process.env.NESSIE_BASE_URL}/customers`, {
      params: { key: process.env.NESSIE_API_KEY }, // Secure API key in .env
      headers: { Accept: "application/json" },
    });

    res.json(response.data); // Send Nessie API response to frontend
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers from Nessie API" });
  }
});



export default router;
