import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

async function callNvidiaAPI(messages: any[], isChat: boolean, systemInstruction?: string) {
  const invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions";
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY is not set");
  
  let formattedMessages: any[] = [];
  if (systemInstruction) {
    formattedMessages.push({ role: "system", content: systemInstruction });
  }
  
  if (isChat) {
    for (const msg of messages) {
       let text = msg.parts?.[0]?.text || "";
       let role = msg.role === "model" ? "assistant" : "user";
       formattedMessages.push({ role: role, content: text });
    }
  } else {
     formattedMessages.push({ role: "user", content: messages[0] });
  }

  const payload = {
    "messages": formattedMessages,
    "model": "google/gemma-4-31b-it",
    "chat_template_kwargs": {
      "enable_thinking": true
    },
    "max_tokens": 16384,
    "stream": false,
    "temperature": 1,
    "top_p": 0.95
  };

  const response = await fetch(invoke_url, {
     method: "POST",
     headers: {
       "Authorization": `Bearer ${apiKey}`,
       "Accept": "application/json",
       "Content-Type": "application/json"
     },
     body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
     const text = await response.text();
     throw new Error(`NVIDIA API error: ${response.status} ${text}`);
  }
  
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      let text = "";
      try {
        const aiClient = getAI();
        const response = await aiClient.models.generateContent({
          model: 'gemma-4-31b-it',
          contents: messages,
          config: {
            systemInstruction: "You are an intelligent AI tutor. Help the user study, explain concepts clearly, and if they ask you to generate a quiz or Q&A based on a topic, provide one in a clear, easy-to-read markdown format. For quizzes, provide multiple choice questions. For Q&A, provide question and answer pairs."
          }
        });
        text = response.text || "";
      } catch (geminiError: any) {
        const isQuota = geminiError.status === 429 || geminiError.status === "RESOURCE_EXHAUSTED" || (geminiError.message && geminiError.message.toLowerCase().includes("quota"));
        if (isQuota && process.env.NVIDIA_API_KEY) {
          console.log("Falling back to NVIDIA API for chat...");
          text = await callNvidiaAPI(messages, true, "You are an intelligent AI tutor. Help the user study, explain concepts clearly, and if they ask you to generate a quiz or Q&A based on a topic, provide one in a clear, easy-to-read markdown format. For quizzes, provide multiple choice questions. For Q&A, provide question and answer pairs.");
        } else {
          throw geminiError;
        }
      }
      res.json({ text });
    } catch (error: any) {
      console.error("Chat error:", error);
      const isQuota = error.status === 429 || error.status === "RESOURCE_EXHAUSTED" || (error.message && error.message.toLowerCase().includes("quota"));
      const message = isQuota 
        ? "I'm currently receiving too many requests. Please wait a minute and try again."
        : error.message || "An error occurred";
      res.status(isQuota ? 429 : 500).json({ error: message });
    }
  });

  app.post("/api/process-material", async (req, res) => {
    try {
      const { content, action } = req.body;
      
      let prompt = "";
      if (action === "qa") {
        prompt = `Based on the following material, generate 5 question and answer pairs for studying. Return the result strictly as a JSON array of objects, where each object has a "question" and an "answer" field. No markdown formatting, just the raw JSON array.\n\nMaterial:\n${content}`;
      } else if (action === "mindmap") {
        prompt = `Based on the following material, generate a hierarchical mindmap. Return the result strictly as a JSON object with a single field "markdown" containing a nested Markdown bulleted list representing the mindmap structure. No surrounding markdown formatting like \`\`\`json.\n\nMaterial:\n${content}`;
      } else {
        prompt = `Based on the following material, generate a 5-question multiple choice quiz. Return the result strictly as a JSON array of objects, where each object has a "question" (which includes the options A/B/C/D) and an "answer" (the correct option and a brief explanation). No markdown formatting, just the raw JSON array.\n\nMaterial:\n${content}`;
      }

      let text = "";
      try {
        const aiClient = getAI();
        const response = await aiClient.models.generateContent({
          model: 'gemma-4-31b-it',
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });
        text = response.text || "";
      } catch (geminiError: any) {
        const isQuota = geminiError.status === 429 || geminiError.status === "RESOURCE_EXHAUSTED" || (geminiError.message && geminiError.message.toLowerCase().includes("quota"));
        if (isQuota && process.env.NVIDIA_API_KEY) {
          console.log("Falling back to NVIDIA API for processing...");
          const nvidiaPrompt = prompt + "\n\nRespond strictly with ONLY valid JSON and no markdown formatting.";
          text = await callNvidiaAPI([nvidiaPrompt], false);
        } else {
          throw geminiError;
        }
      }
      
      // Attempt to extract JSON if there's conversational wrapper text
      const firstBrace = text.indexOf('{');
      const firstBracket = text.indexOf('[');
      const lastBrace = text.lastIndexOf('}');
      const lastBracket = text.lastIndexOf(']');

      let jsonStr = text;
      if (action === "qa" || action === "quiz") {
        if (firstBracket !== -1 && lastBracket !== -1) {
          jsonStr = text.substring(firstBracket, lastBracket + 1);
        }
      } else if (action === "mindmap") {
        if (firstBrace !== -1 && lastBrace !== -1) {
          jsonStr = text.substring(firstBrace, lastBrace + 1);
        }
      }

      // clean up any markdown blocks if they remain
      jsonStr = jsonStr.replace(/```json/gi, "").replace(/```/g, "").trim();
      
      let parsedResult;
      try {
        parsedResult = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("JSON Parse Error. Raw text:", text);
        throw new Error("The AI returned a format that couldn't be parsed. Please try again.");
      }

      res.json({ result: parsedResult });
    } catch (error: any) {
      console.error("Processing error:", error);
      const isQuota = error.status === 429 || error.status === "RESOURCE_EXHAUSTED" || (error.message && error.message.toLowerCase().includes("quota"));
      const message = isQuota 
        ? "I'm currently receiving too many requests. Please wait a minute and try again."
        : error.message || "An error occurred";
      res.status(isQuota ? 429 : 500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
