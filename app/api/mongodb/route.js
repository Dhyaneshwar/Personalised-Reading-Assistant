import {
  deleteAllBatch,
  deleteBatchByBatchNumber,
  getLastBatch,
} from "@/controllers/Batch";
import {
  deleteAllDetailedReport,
  deleteDetailedReportByBatchNumber,
  getDetailedReports,
} from "@/controllers/DetailedReport";
import {
  deleteAllMaxFixatedWordsPerSentence,
  deleteMaxFixatedWordsPerSentenceByBatchNumber,
  getMaxFixatedWordsPerSentences,
} from "@/controllers/MaxFixatedWordsPerSentence";
import {
  deleteAllMaxTimeSpentWordsPerSentence,
  deleteMaxTimeSpentWordsPerSentence,
  deleteMaxTimeSpentWordsPerSentenceByBatchNumber,
  getMaxTimeSpentWordsPerSentences,
} from "@/controllers/MaxTimeSpentWordsPerSentence";
import {
  deleteAllSaccadeTotalTimesPerSentence,
  deleteSaccadeTotalTimesPerSentenceByBatchNumber,
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

  const body = await req.json();

  const { type, batchNumber } = body || {};

  let response = "";
  switch (type) {
    case "all":
      await deleteAllDetailedReport();
      await deleteAllMaxFixatedWordsPerSentence();
      await deleteAllMaxTimeSpentWordsPerSentence();
      await deleteAllSaccadeTotalTimesPerSentence();
      await deleteAllBatch();

      response = "Successfully Deleted All Data From Database";
      break;

    case "last":
      const currentBatchNumberDoc = await getLastBatch();
      const { batchNumber: currentBatchNumber = 1 } =
        currentBatchNumberDoc || {};
      const lastBatchNumber = currentBatchNumber - 1;
      console.log(typeof lastBatchNumber);
      await deleteDetailedReportByBatchNumber(lastBatchNumber);
      await deleteMaxTimeSpentWordsPerSentenceByBatchNumber(lastBatchNumber);
      await deleteMaxFixatedWordsPerSentenceByBatchNumber(lastBatchNumber);
      await deleteSaccadeTotalTimesPerSentenceByBatchNumber(lastBatchNumber);
      await deleteBatchByBatchNumber(currentBatchNumber);

      response = "Successfully Deleted Last Participant Data From Database";
      break;

    case "specific":
      const specificBatchNumber = batchNumber;
      await deleteDetailedReportByBatchNumber(specificBatchNumber);
      await deleteMaxTimeSpentWordsPerSentenceByBatchNumber(
        specificBatchNumber
      );
      await deleteMaxFixatedWordsPerSentenceByBatchNumber(specificBatchNumber);
      await deleteSaccadeTotalTimesPerSentenceByBatchNumber(
        specificBatchNumber
      );
      await deleteBatchByBatchNumber(specificBatchNumber);

      response =
        "Successfully Deleted Mentioned Participant Data From Database";
      break;
  }

  return NextResponse.json(response, {
    status: 200,
  });
}
