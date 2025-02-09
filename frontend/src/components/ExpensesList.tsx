import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ExpensesList: React.FC = () => {
  const { token }: any = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });
  
  if (isLoading) return <p>Loading expenses...</p>;
  if (error) return <p>Error fetching expenses</p>;

  return (
    <div>
      <h2>💸 Your Expenses</h2>
      <ul>
        {data.map((expense: any, index: number) => (
          <li key={index}>
            {expense.merchant} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
