import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemma-4-31b-it',
      contents: [
        { role: "model", parts: [{ text: "Hello" }] },
        { role: "user", parts: [{ text: "Hi" }] }
      ]
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
