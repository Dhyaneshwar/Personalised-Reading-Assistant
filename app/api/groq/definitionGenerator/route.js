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

async function definitionGenerationHandler(prompt) {
  const messages = [
    {
      role: "system",
      content:
        "Given a paragraph, extract a few significant words from it and provide their definitions. Return the results in JSON format only, without any introductory sentences. The JSON structure should be as follows: {number_of_definitions: total_number_of_definitions_generated, definition1: {word: '...', definition:'...'}, definition2: {word: '...', definition:'...'}, ...}",
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
  const response = await definitionGenerationHandler(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
