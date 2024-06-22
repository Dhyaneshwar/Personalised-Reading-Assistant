import { HfInference } from "@huggingface/inference";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

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
    const response = await inference.imageToText({
      data: imgBlog,
      model: imgToTextModel,
    });
    console.log(response);
    return response.generated_text;
  } catch (error) {
    console.error("Error during image to text conversion:", error);
  }
}

export async function POST(req) {
  const response = await imageToTextConverter();
  return NextResponse.json(response, { status: 200 });
}
