import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTransactions } from "./hooks/useTransactions"; // ✅ Correct import

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionsLogger />
    </QueryClientProvider>
  );
};

const TransactionsLogger = () => {
  const { transactions, loading, error } = useTransactions(); // ✅ Call the hook properly

  if (loading) {
    console.log("Loading transactions...");
    return null;
  }

  if (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }

  console.log("Fetched transactions:", transactions);
  return null; // No UI, just logging
};

export default App;
