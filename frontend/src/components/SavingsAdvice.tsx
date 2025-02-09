import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// ✅ Define expected API response
interface SavingsData {
  recommendedSavings: number;
}

const SavingsAdvice: React.FC = () => {
  const { token }: any = useContext(AuthContext);

  const { data, isLoading, error } = useQuery<SavingsData>({
    queryKey: ["savings"],
    queryFn: async () => {
      const response = await axios.get<SavingsData>("http://localhost:5000/api/savings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  if (isLoading) return <p>Loading savings advice...</p>;
  if (error) return <p>Error fetching savings: {error.message}</p>;

  return (
    <div>
      <h2>💰 Recommended Savings</h2>
      <p>You should save around <b>${data?.recommendedSavings}</b> based on your spending.</p>
    </div>
  );
};

export default SavingsAdvice;
