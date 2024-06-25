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

export async function questionGenerationHandler(prompt) {
  const messages = [
    {
      role: "system",
      content:
        'Generate 3-5 questions and corresponding answers based on the following paragraph to help validate understanding of the content. Respond in JSON format with the number of questions generated and each question as an object, e.g., {"numOfQues": total_ques_count, "q1": {"ques": "...", "ans": "..."}, "q2": {"ques": "...", "ans": "..."}...}',
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
  const response = await questionGenerationHandler(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
