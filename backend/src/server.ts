import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Define a transaction type
interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  date: string;
}

// Mock transaction API endpoint
app.get("/api/transactions", (req: Request, res: Response) => {
  const transactions: Transaction[] = [
    { id: "txn_1", amount: 50, merchant: "Uber", category: "Transport", date: "2025-02-08" },
    { id: "txn_2", amount: 200, merchant: "Amazon", category: "Shopping", date: "2025-02-07" }
  ];
  
  res.json(transactions);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
