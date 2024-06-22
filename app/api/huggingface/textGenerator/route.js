import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();
const apiKey = process.env.HUGGING_FACE_TOKEN;
if (!apiKey) {
  throw new Error("HUGGING_FACE_TOKEN environment variable is not set.");
}
const inference = new HfInference(apiKey);
const model = "meta-llama/Meta-Llama-3-8B-Instruct";

async function textGenerationHandler(prompt) {
  const messages = [
    {
      role: "system",
      content:
        "The paragraph contains redundancy and lacks coherence. Eliminate repetitive phrases while improving clarity and coherence without adding any new content. Do not include any introductory phrases in the response. Respond only with the revised version of the text.",
    },
    { role: "user", content: prompt },
  ];
  try {
    const response = await inference.chatCompletion({
      model,
      messages,
      max_length: 4096,
      temperature: 1,
    });
    console.log(response.choices[0].message);
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error generating text:", error);
  }
}

export async function POST(req) {
  const body = await req.json();
  const response = await textGenerationHandler(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
