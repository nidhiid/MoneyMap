// import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionsTable from "./components/TransactionsTable.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionsTable />
    </QueryClientProvider>
  );
}
