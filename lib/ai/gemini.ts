import { GoogleGenerativeAI } from "@google/generative-ai";
import { RetrievalResult } from "../knowledge/retriever";
import fs from "fs";
import path from "path";

const SYSTEM_INSTRUCTION = `You are the official AI Assistant for "Greedy Adventures", specifically assisting customers with the "Sea View Skydiving" tandem experience in Pattaya, Thailand.

Core Guidelines:
1. Answer customer questions accurately using ONLY the provided website knowledge base.
2. If the user asks for a brochure, PDF, or video: Inform the user that the official brochure (PDF) and/or experience video preview has been attached directly below your response.
3. If information is NOT found in the website knowledge (e.g. jumping with pets, scuba diving immediately before jump, unlisted locations), do NOT make up or hallucinate facts. Clearly state that the information is unavailable on our website and recommend contacting the dropzone directly.
4. Remember the conversation history for follow-up questions.
5. Maintain a friendly, helpful, adventurous, and professional tone. Keep responses clear and easy to read.`;

function getApiKey(): string | undefined {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0) {
    return process.env.GEMINI_API_KEY.trim();
  }

  // Fallback to reading .env / .env.local if process.env wasn't refreshed
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    try {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        const match = content.match(/GEMINI_API_KEY=(.+)/);
        if (match && match[1]?.trim()) {
          return match[1].trim();
        }
      }
    } catch {
      // Continue to next file
    }
  }

  return undefined;
}

export async function generateChatResponse({
  messages,
  retrieval,
}: {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  retrieval: RetrievalResult;
}): Promise<{ content: string; modelUsed: string; isMock: boolean }> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add your GEMINI_API_KEY to .env or .env.local."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Use Gemini 2.5 Flash as requested
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  // Prepare conversation history for multi-turn chat (excluding the latest message)
  // Gemini requires:
  // 1. The first message in history MUST have role 'user' (never 'model').
  // 2. Roles must strictly alternate (user -> model -> user -> model).
  // 3. History must end with a 'model' turn so the next sendMessage() is from 'user'.
  const previousMessages = messages.slice(0, -1);
  const formattedHistory: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

  let startedWithUser = false;
  for (const m of previousMessages) {
    if (!startedWithUser) {
      if (m.role !== "user") {
        continue; // Skip initial assistant greetings
      }
      startedWithUser = true;
    }

    const role: "user" | "model" = m.role === "assistant" ? "model" : "user";

    // Merge consecutive messages with the same role
    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === role) {
      formattedHistory[formattedHistory.length - 1].parts[0].text += `\n\n${m.content}`;
    } else {
      formattedHistory.push({
        role,
        parts: [{ text: m.content }],
      });
    }
  }

  // Ensure history ends with a 'model' turn
  while (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === "user") {
    formattedHistory.pop();
  }

  const latestUserMessage = messages[messages.length - 1]?.content || "";

  // Note for media attachments if detected
  let mediaNote = "";
  if (retrieval.intent.wantsBrochure && retrieval.intent.wantsVideo) {
    mediaNote = "\n[System Context: Both the official brochure PDF and experience video preview are attached below this response]";
  } else if (retrieval.intent.wantsBrochure) {
    mediaNote = "\n[System Context: The official Sea View Skydiving brochure PDF is attached below this response with open/download options]";
  } else if (retrieval.intent.wantsVideo) {
    mediaNote = "\n[System Context: The experience preview video is attached below this response]";
  }

  const promptWithContext = `Relevant Website Knowledge Base:\n${retrieval.contextPrompt}${mediaNote}\n\nCustomer Question:\n${latestUserMessage}`;

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(promptWithContext);
  const responseText = result.response.text();

  return {
    content: responseText,
    modelUsed: "gemini-2.5-flash",
    isMock: false,
  };
}
