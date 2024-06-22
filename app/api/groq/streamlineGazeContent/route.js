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

async function streamlineGazeContentHandler(prompt) {
  const messages = [
    {
      role: "system",
      content:
        "Eliminate redundancy and enhance coherence in the paragraph without introducing new content. Respond in JSON format with only the revised text, e.g., {gazeContent: '...'}",
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
    console.log(response.choices[0].message);
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error generating text:", error);
  }
}

export async function POST(req) {
  const body = await req.json();
  const response = await streamlineGazeContentHandler(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
