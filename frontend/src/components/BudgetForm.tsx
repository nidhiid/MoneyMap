import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BudgetForm: React.FC = () => {
  const { token }: any = useContext(AuthContext);
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/budget", { budget }, { headers: { Authorization: `Bearer ${token}` } });
    alert("Budget updated successfully!");
  };

  return (
    <div>
      <h2>Set Your Budget</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter your budget" />
        <button type="submit">Save Budget</button>
      </form>
    </div>
  );
};

export default BudgetForm;
