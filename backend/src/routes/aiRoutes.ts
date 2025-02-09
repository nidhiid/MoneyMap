import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


router.post("/generate-recipes", async (req, res) => {
    const { remainingBudget, location } = req.body;
  
    const prompt = `Suggest meal recipes for a person with a $${remainingBudget} budget living in ${location}.`;
  
    const response = await axios.post("https://gemini-api-url.com", { prompt });
  
    res.json(response.data);
  });
  
export default router;
