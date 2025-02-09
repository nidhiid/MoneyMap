import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CompareSpending: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <p>Loading...</p>; // Ensures context is not null
  }

  const { token } = authContext;

  const { data, isLoading, error } = useQuery({
    queryKey: ["compare"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/compare", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  if (isLoading) return <p>Loading comparison...</p>;
  if (error) return <p>Error loading comparison</p>;

  return (
    <div>
      <h2>📊 Spending Comparison</h2>
      <p>Your spending compared to similar people:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CompareSpending;
