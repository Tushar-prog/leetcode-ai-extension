import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { buildPrompt } from "./utils/promptBuilder.js";

dotenv.config();

console.log("🔑 Groq API Key loaded?", !!process.env.GROQ_API_KEY);
console.log("🔑 Key starts with gsk_?", process.env.GROQ_API_KEY?.startsWith('gsk_'));

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(bodyParser.json());

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/analyze", async (req, res) => {
  try {
    const { code } = req.body;
    
    console.log("📝 Received code for analysis...");
    
    const prompt = buildPrompt(code);
    console.log("🔨 Calling Groq AI...");

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile", // Fast and accurate model
      temperature: 0.7
    });

    console.log("✅ Response received!");
    
    const content = completion.choices[0].message.content;
    console.log("📄 Raw content:", content);
    
    // Clean up markdown
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/```\n?/g, '');
    }
    cleanContent = cleanContent.trim();
    
    console.log("🧹 Cleaned content:", cleanContent);
    
    const analysis = JSON.parse(cleanContent);
    console.log("✅ Analysis complete:", analysis);
    
    res.json(analysis);
        
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ 
      error: "Analysis failed", 
      details: err.message 
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`✅ AI Backend running on http://localhost:${process.env.PORT}`)
);