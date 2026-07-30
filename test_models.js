import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemma-4-31b-it',
      contents: [{ role: 'user', parts: [{ text: 'hello' }] }],
      config: {
        systemInstruction: "You are an AI."
      }
    });
    console.log("gemma-4-31b-it: ", response.text);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
