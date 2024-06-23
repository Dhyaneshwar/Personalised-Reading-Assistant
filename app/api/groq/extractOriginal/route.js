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

async function extractOriginalContentHandler({ original, modified }) {
  const messages = [
    {
      role: "system",
      content:
        "Given the original and modified texts, identify the sentences in the modified text that are derived from the original text, including any slight modifications. Return the results in JSON format only, without any introductory sentences, e.g., {totalNoLines: number_of_sentences, sentence1: {modifiedLine: '...', originalLine: '...}, sentence2: {modifiedLine: '...', originalLine: '...}}",
    },
    {
      role: "user",
      content: `Original:- ${original}, Modified:- ${modified}`,
    },
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
  const response = await extractOriginalContentHandler(body);
  return NextResponse.json(response, { status: 200 });
}
