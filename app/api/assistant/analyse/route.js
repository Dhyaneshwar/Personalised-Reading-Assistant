import { createBatch, getLastBatch } from "@/controllers/Batch";
import { createDetailedReport } from "@/controllers/DetailedReport";
import { createMaxFixatedWordsPerSentence } from "@/controllers/MaxFixatedWordsPerSentence";
import { createMaxTimeSpentWordsPerSentence } from "@/controllers/MaxTimeSpentWordsPerSentence";
import { createSaccadeTotalTimesPerSentence } from "@/controllers/SaccadeTotalTimesPerSentence";
import dbConnect from "@/lib/dbconnect";
import _ from "lodash";
import { NextResponse } from "next/server";

function processGazeContent({ originalLines, gazeContent }) {
  const actualLines = [];
  const saccadeLines = [];

  let startSaccadeIndex = 0;

  originalLines.forEach((line) => {
    const words = line.split(" ");
    const startWords = words.slice(0, 2).join(" ");
    const endWords = words.slice(-2).join(" ");

    const startIndex = gazeContent.indexOf(startWords);
    if (startIndex === -1) return;

    const endIndex = gazeContent.indexOf(
      endWords,
      startIndex + startWords.length
    );
    if (endIndex === -1 || endIndex < startIndex) return;

    const extractedSegment = gazeContent.substring(
      startIndex,
      endIndex + endWords.length
    );
    actualLines.push(extractedSegment);

    const saccadeSegment = gazeContent.substring(startSaccadeIndex, startIndex);
    saccadeLines.push(saccadeSegment);

    startSaccadeIndex = endIndex + endWords.length;
  });

  if (startSaccadeIndex < gazeContent.length) {
    saccadeLines.push(gazeContent.substring(startSaccadeIndex));
  }

  return { actualLines, saccadeLines };
}

function calculateTimeDifferences({ data }) {
  for (let i = 0; i < data.length; i++) {
    if (i < data.length - 1) {
      data[i].totalTime = data[i + 1].timestamp - data[i].timestamp;
    } else {
      data[i].totalTime = 0;
    }
  }
}

function averageTimeSpentOnEachWordPerSentence({
  data = [],
  actualLines,
  saccadeLines,
}) {
  const len = Math.max(actualLines.length, saccadeLines.length);

  const actualLineWords = actualLines.map((line) => line.trim().split(" "));
  const saccadeLineWords = saccadeLines.map((line) => line.trim().split(" "));

  let isActual = data[0].word === actualLineWords[0]?.[0];
  const [firstWordBelongsTo, followedBy] = isActual
    ? [actualLineWords, saccadeLineWords]
    : [saccadeLineWords, actualLineWords];

  const actualLinesObj = [];
  const saccadeLinesObj = [];

  let startIndex,
    endIndex = 0;
  for (let i = 0; i < len; i++) {
    startIndex = endIndex;
    endIndex = startIndex + (firstWordBelongsTo[i]?.length || 0);

    const segmentData = data.slice(startIndex, endIndex);

    if (isActual) {
      actualLinesObj.push(segmentData);
    } else {
      saccadeLinesObj.push(segmentData);
    }

    startIndex = endIndex;
    endIndex = startIndex + (followedBy[i]?.length || 0);

    const segmentData2 = data.slice(startIndex, endIndex);

    if (!isActual) {
      actualLinesObj.push(segmentData2);
    } else {
      saccadeLinesObj.push(segmentData2);
    }
  }

  return {
    actualLinesObj,
    saccadeLinesObj: isActual ? saccadeLinesObj : saccadeLinesObj.slice(1),
  };
}

function calculateCumulativeWordTimesPerSentence(linesObj) {
  const groupedWordsBySentence = linesObj.map((sentenceWords) => {
    return _.mapValues(_.groupBy(sentenceWords, "word"), (wordEntries) =>
      wordEntries.map((entry) => _.omit(entry, ["word", "timestamp"]))
    );
  });
  const totalTimesPerWord = [];

  groupedWordsBySentence.forEach((sentence) => {
    const sentenceResult = [];

    for (const word in sentence) {
      const cumulativeTotalTime = sentence[word].reduce(
        (sum, entry) => sum + entry.totalTime,
        0
      );
      const fixationCount = sentence[word].length;
      sentenceResult.push({ word, cumulativeTotalTime, fixationCount });
    }

    totalTimesPerWord.push(sentenceResult);
  });
  return totalTimesPerWord;
}

function calculateCumulativeWordTimes(totalTimesPerWord) {
  const sentenceResult = [];
  totalTimesPerWord.forEach((sentence, index) => {
    const cumulativeTotalTime = sentence.reduce(
      (sum, entry) => sum + entry.cumulativeTotalTime,
      0
    );
    sentenceResult.push({
      sentenceNumber: index + 1,
      cumulativeTotalTime,
    });
  });
  return sentenceResult;
}

function calculateTimeSpentForEachWord({ actualLinesObj, saccadeLinesObj }) {
  const actualTotalTimesPerWord =
    calculateCumulativeWordTimesPerSentence(actualLinesObj);
  const saccadeTotalTimesPerWord =
    calculateCumulativeWordTimesPerSentence(saccadeLinesObj);
  return { actualTotalTimesPerWord, saccadeTotalTimesPerWord };
}

function calculateTimeSpentForEachSentence({
  actualTotalTimesPerWord,
  saccadeTotalTimesPerWord,
}) {
  const actualTotalTimesPerSentence = calculateCumulativeWordTimes(
    actualTotalTimesPerWord
  );
  const saccadeTotalTimesPerSentence = calculateCumulativeWordTimes(
    saccadeTotalTimesPerWord
  );
  return { actualTotalTimesPerSentence, saccadeTotalTimesPerSentence };
}

function collateReadingData({
  defaultProps,
  actualTotalTimesPerWord,
  actualTotalTimesPerSentence,
  saccadeTotalTimesPerSentence,
}) {
  const detailedReport = [];
  const maxTimeWordsPerSentence = [];
  const maxFixationWordsPerSentence = [];

  actualTotalTimesPerWord.forEach((words, sentenceIndex) => {
    const sentenceReadTime =
      actualTotalTimesPerSentence[sentenceIndex].cumulativeTotalTime;

    words.forEach((wordData) => {
      detailedReport.push({
        ...defaultProps,
        ...wordData,
        sentenceNumber: sentenceIndex + 1,
        sentenceReadTime,
      });
    });

    const sortedByTime = [...words].sort(
      (a, b) => b.cumulativeTotalTime - a.cumulativeTotalTime
    );
    maxTimeWordsPerSentence.push(
      ...sortedByTime.slice(0, 3).map((timed, index) => ({
        ...timed,
        ...defaultProps,
        rank: index + 1,
        sentenceNumber: sentenceIndex + 1,
      }))
    );

    const sortedByFixation = [...words].sort(
      (a, b) => b.fixationCount - a.fixationCount
    );
    maxFixationWordsPerSentence.push(
      ...sortedByFixation.slice(0, 3).map((fixation, index) => ({
        ...fixation,
        ...defaultProps,
        rank: index + 1,
        sentenceNumber: sentenceIndex + 1,
      }))
    );
  });

  const saccadeDetailedReport = saccadeTotalTimesPerSentence.map((line) => ({
    ...defaultProps,
    ...line,
  }));

  return {
    detailedReport,
    maxTimeWordsPerSentence,
    maxFixationWordsPerSentence,
    saccadeDetailedReport,
  };
}

export async function POST(req) {
  await dbConnect();

  const currentBatchNumber = await getLastBatch();
  const { batchNumber = 1 } = currentBatchNumber || {};
  const body = await req.json();
  const { topicId, contentId } = body;
  const lines = processGazeContent(body);
  calculateTimeDifferences(body);
  const linesObj = averageTimeSpentOnEachWordPerSentence({
    ...body,
    ...lines,
  });
  const totalTimesPerWord = calculateTimeSpentForEachWord(linesObj);
  const totalTimesPerSentence =
    calculateTimeSpentForEachSentence(totalTimesPerWord);

  const result = collateReadingData({
    ...totalTimesPerWord,
    ...totalTimesPerSentence,
    defaultProps: {
      topicId,
      contentId,
      batchNumber,
    },
  });

  const detailedReport = await createDetailedReport(result.detailedReport);
  const maxTimeWordsPerSentence = await createMaxTimeSpentWordsPerSentence(
    result.maxTimeWordsPerSentence
  );
  const maxFixationWordsPerSentence = await createMaxFixatedWordsPerSentence(
    result.maxFixationWordsPerSentence
  );
  const saccadeDetailedReport = await createSaccadeTotalTimesPerSentence(
    result.saccadeDetailedReport
  );
  const batch = await createBatch({ batchNumber: batchNumber + 1 });

  return NextResponse.json(
    {
      batch,
      detailedReport,
      maxTimeWordsPerSentence,
      maxFixationWordsPerSentence,
      saccadeDetailedReport,
    },
    { status: 200 }
  );
}