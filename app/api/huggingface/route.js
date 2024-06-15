import { HfInference } from "@huggingface/inference";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.HUGGING_FACE_TOKEN;
if (!apiKey) {
  throw new Error("HUGGING_FACE_TOKEN environment variable is not set.");
}

const inference = new HfInference(apiKey);
const imgToTextModel = "nlpconnect/vit-gpt2-image-captioning";

async function imageToTextConverter() {
  const imgPath = path.resolve("./test.png");
  const imgBuffer = await fs.readFile(imgPath);
  const imgBlog = new Blob([imgBuffer]);

  try {
    const result = await inference.imageToText({
      data: imgBlog,
      model: imgToTextModel,
    });
    console.log(result);
  } catch (error) {
    console.error("Error during image to text conversion:", error);
  }
}

async function textGenerationFunction(prompt) {
  const messages = [
    {
      role: "system",
      content:
        "You are summary generator who explains things for grade 2 child.",
    },
    { role: "user", content: prompt },
  ];
  try {
    const response = await inference.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages,
      max_length: 1000,
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
  const response = await textGenerationFunction(body.prompt);
  return NextResponse.json(response, { status: 200 });
}
