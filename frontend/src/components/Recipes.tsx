import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Recipes: React.FC = () => {
  const { token }: any = useContext(AuthContext);
  const [remainingBudget, setRemainingBudget] = useState("");
  const [location, setLocation] = useState("");
  const [recipes, setRecipes] = useState(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:5000/api/generate-recipes",
        { remainingBudget, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setRecipes(data); // ✅ Update state on success
    },
    onError: (error) => {
      console.error("Failed to fetch recipes:", error);
    },
  });

  return (
    <div>
      <h2>🍽 AI Meal Suggestions</h2>
      <input
        type="number"
        placeholder="Remaining Budget"
        value={remainingBudget}
        onChange={(e) => setRemainingBudget(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={() => mutation.mutate()}>Get Recipes</button>

      {mutation.isPending && <p>Generating recipes...</p>}  {/* ✅ FIXED */}
      {mutation.isError && <p>Error fetching recipes.</p>}
      {recipes && <pre>{JSON.stringify(recipes, null, 2)}</pre>}
    </div>
  );
};

export default Recipes;
