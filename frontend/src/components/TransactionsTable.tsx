// import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";

export default function TransactionsTable() {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: 3 }}>
        <CircularProgress />
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", marginTop: 3 }}>
      <Typography variant="h4" align="center" sx={{ padding: 2 }}>
        Transaction List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Merchant</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((txn: any) => (
            <TableRow key={txn.id}>
              <TableCell>{txn.merchant}</TableCell>
              <TableCell>${txn.amount}</TableCell>
              <TableCell>{txn.category}</TableCell>
              <TableCell>{txn.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
