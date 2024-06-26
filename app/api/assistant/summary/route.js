import { NextResponse } from "next/server";
import { summaryGenerationHandler } from "../../groq/summaryGenerator/route";
import { definitionGenerationHandler } from "../../groq/definitionGenerator/route";
import { streamlineAndExtractOriginal } from "../controllor";

async function streamlineExtractAndSummarize(prompt) {
  const extractedOriginal = await streamlineAndExtractOriginal(prompt);
  const { summary } = JSON.parse(
    await summaryGenerationHandler(extractedOriginal)
  );
  const definitions = JSON.parse(
    await definitionGenerationHandler(extractedOriginal)
  );

  const result = {
    extractedContent: extractedOriginal,
    summaryData: summary,
    definitions,
  };
  return result;
}

export async function POST(req) {
  const body = await req.json();
  const response = await streamlineExtractAndSummarize(body);
  return NextResponse.json(response, { status: 200 });
}
