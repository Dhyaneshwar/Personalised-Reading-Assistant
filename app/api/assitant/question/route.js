import { NextResponse } from "next/server";
import { streamlineAndExtractOriginal } from "../controllor";
import { questionGenerationHandler } from "../../groq/questionGenerator/route";

async function streamlineExtractAndQuestion(prompt) {
  const extractedOriginal = await streamlineAndExtractOriginal(prompt);
  const questions = JSON.parse(
    await questionGenerationHandler(extractedOriginal)
  );

  const result = {
    extractedContent: extractedOriginal,
    questions,
  };
  return result;
}

export async function POST(req) {
  const body = await req.json();
  const response = await streamlineExtractAndQuestion(body);
  return NextResponse.json(response, { status: 200 });
}
