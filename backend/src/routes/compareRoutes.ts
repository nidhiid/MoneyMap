import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/compare/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    // Fetch customer details
    const customerResponse = await axios.get(`${process.env.NESSIE_BASE_URL}/customers/${customerId}`, {
      params: { key: process.env.NESSIE_API_KEY },
    });

    const customer = customerResponse.data;
    const age = parseInt(customer.last_name); // Treat last_name as age
    const zip = parseInt(customer.address.zipcode);

    // Fetch all customers
    const allCustomersResponse = await axios.get(`${process.env.NESSIE_BASE_URL}/customers`, {
      params: { key: process.env.NESSIE_API_KEY },
    });

    const similarCustomers = allCustomersResponse.data.filter((c: any) => {
      const cAge = parseInt(c.last_name);
      const cZip = parseInt(c.address.zipcode);
      return Math.abs(cAge - age) <= 3 && Math.abs(cZip - zip) <= 10;
    });

    res.json({ similarCustomers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comparison data" });
  }
});

router.get("/percentile/:customerId", async (req, res) => {
    const { customerId } = req.params;
  
    try {
      const response = await axios.get(`${process.env.NESSIE_BASE_URL}/accounts/${customerId}/purchases`, {
        params: { key: process.env.NESSIE_API_KEY },
      });
  
      const userExpenses = response.data.reduce((sum: number, item: any) => sum + item.amount, 0);
  
      // Fetch all customer expenses
      const allCustomersResponse = await axios.get(`${process.env.NESSIE_BASE_URL}/customers`, {
        params: { key: process.env.NESSIE_API_KEY },
      });
  
      const allExpenses = allCustomersResponse.data.map((c: any) => {
        return c.purchases ? c.purchases.reduce((sum: number, item: any) => sum + item.amount, 0) : 0;
      });
  
      const percentile = (allExpenses.filter((e: any) => e < userExpenses).length / allExpenses.length) * 100;
  
      res.json({ userExpenses, percentile });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate percentile" });
    }
  });
  

export default router;


