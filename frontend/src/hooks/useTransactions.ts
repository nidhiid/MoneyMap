import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/customers"; // Backend API

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching transactions from backend...");
    
    axios.get(API_URL)
      .then((response) => {
        setTransactions(response.data);
        console.log("Received transactions:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions");
      })
      .finally(() => setLoading(false));

  }, []); // Empty dependency array = runs only once

  return { transactions, loading, error };
};
