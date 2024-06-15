import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  console.log("herereeeee....");
  const apiKey = process.env.OPENAI_API_KEY;
  const client = new OpenAI({ apiKey });
  const body = await req.json();
  console.log(body);
  const { content } = body;
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with statements, and your task is to convert them to standard English.",
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    console.log(response);
    console.log(response.choices[0].message);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.error.message || "Error fetching response from ChatGPT" },
      { status: error.status || 500 }
    );
  }
}
