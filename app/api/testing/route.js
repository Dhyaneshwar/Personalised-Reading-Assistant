import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(req) {
  console.log("I am GET request handler");
  return NextResponse.json("Successfully handled GET response", {
    status: 200,
  });
}

export async function POST(req) {
  console.log("I am POST request handler");
  return NextResponse.json("Successfully handled POST response", {
    status: 200,
  });
}

export async function PUT(req) {
  console.log("I am PUT request handler");
  return NextResponse.json("Successfully handled PUT response", {
    status: 200,
  });
}

export async function DELETE(req) {
  console.log("I am DELETE request handler");
  return NextResponse.json("Successfully handled DELETE response", {
    status: 200,
  });
}

export async function HEAD(req) {
  console.log("I am HEAD request handler");
  return NextResponse.json("Successfully handled HEAD response", {
    status: 210,
  });
}

export async function OPTIONS(req) {
  console.log("I am OPTIONS request handler");
  return NextResponse.json("Successfully handled OPTIONS response", {
    status: 200,
  });
}
