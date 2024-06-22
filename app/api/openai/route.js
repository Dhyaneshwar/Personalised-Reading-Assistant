import OpenAI from "openai";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY environment variable is not set.");
}
const client = new OpenAI({ apiKey });
const model = "gpt-3.5-turbo";

async function textGenerationHandler(prompt) {
  const messages = [
    {
      role: "system",
      content:
        "You will be provided with statements, and your task is to convert them to standard English.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.error.message || "Error fetching response from ChatGPT" },
      { status: error.status || 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const response = await textGenerationHandler(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
