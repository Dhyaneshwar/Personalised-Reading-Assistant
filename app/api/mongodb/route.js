import { deleteAllBatch } from "@/controllers/Batch";
import {
  deleteAllDetailedReport,
  getDetailedReports,
} from "@/controllers/DetailedReport";
import {
  deleteAllMaxFixatedWordsPerSentence,
  getMaxFixatedWordsPerSentences,
} from "@/controllers/MaxFixatedWordsPerSentence";
import {
  deleteAllMaxTimeSpentWordsPerSentence,
  getMaxTimeSpentWordsPerSentences,
} from "@/controllers/MaxTimeSpentWordsPerSentence";
import {
  deleteAllSaccadeTotalTimesPerSentence,
  getSaccadeTotalTimesPerSentences,
} from "@/controllers/SaccadeTotalTimesPerSentence";
import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { dbName, action } = body;
  let result;
  if (action === "get") {
    switch (dbName) {
      case "details":
        result = await getDetailedReports();
        break;
      case "time":
        result = await getMaxTimeSpentWordsPerSentences();
        break;
      case "fixate":
        result = await getMaxFixatedWordsPerSentences();
        break;
      case "saccade":
        result = await getSaccadeTotalTimesPerSentences();
        break;
    }
  }
  return NextResponse.json(result, {
    status: 200,
  });
}

export async function PUT(req) {
  await dbConnect();

  return NextResponse.json("Successfully handled PUT response", {
    status: 200,
  });
}

export async function DELETE(req) {
  await dbConnect();

  await deleteAllDetailedReport();
  await deleteAllMaxFixatedWordsPerSentence();
  await deleteAllMaxTimeSpentWordsPerSentence();
  await deleteAllSaccadeTotalTimesPerSentence();
  await deleteAllBatch();

  return NextResponse.json("Successfully handled DELETE response", {
    status: 200,
  });
}
