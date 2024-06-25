import dotenv from "dotenv";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Load environment variables from .env file
dotenv.config();
const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error("GROQ_API_KEY environment variable is not set.");
}

const groq = new Groq({ apiKey });
const llama_70b = "llama3-70b-8192";
const llama_8b = "llama3-8b-8192";
const model = llama_70b;

export async function summaryGenerationHandler(prompt) {
  const messages = [
    {
      role: "system",
      content:
        'Provide a clear and concise summary of the following paragraph, ensuring it retains the key points. Respond in JSON format with only the summary text, e.g., {"summary": "..."}',
    },
    { role: "user", content: prompt },
  ];

  try {
    const response = await groq.chat.completions.create({
      messages,
      model,
      temperature: 1,
      max_tokens: 8192,
    });
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error generating text:", error);
  }
}

export async function POST(req) {
  const body = await req.json();
  const response = await summaryGenerationHandler(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
