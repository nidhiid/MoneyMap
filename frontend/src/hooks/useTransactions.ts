import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:5000/api/transactions");
  return data;
};

export const useTransactions = () => useQuery({
  queryKey: ["transactions"],
  queryFn: fetchTransactions
});
