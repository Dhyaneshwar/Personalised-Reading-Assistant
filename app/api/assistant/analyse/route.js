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

function calculateTimeDifferences({ wordReadTime }) {
  for (let i = 0; i < wordReadTime.length; i++) {
    if (i < wordReadTime.length - 1) {
      wordReadTime[i].totalTime =
        wordReadTime[i + 1].timestamp - wordReadTime[i].timestamp;
    } else {
      wordReadTime[i].totalTime = 0;
    }
  }
}

function averageTimeSpentOnEachWordPerSentence({
  wordReadTime = [],
  actualLines,
  saccadeLines,
}) {
  const len = Math.max(actualLines.length, saccadeLines.length);

  const actualLineWords = actualLines.map((line) => line.trim().split(" "));
  const saccadeLineWords = saccadeLines.map((line) => line.trim().split(" "));

  let isActual = wordReadTime[0].word === actualLineWords[0]?.[0];
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

    const segmentData = wordReadTime.slice(startIndex, endIndex);

    if (isActual) {
      actualLinesObj.push(segmentData);
    } else {
      saccadeLinesObj.push(segmentData);
    }

    startIndex = endIndex;
    endIndex = startIndex + (followedBy[i]?.length || 0);

    const segmentData2 = wordReadTime.slice(startIndex, endIndex);

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
    return _.mapValues(
      _.groupBy(sentenceWords, ({ word }) => word.toLowerCase()),
      (wordEntries) =>
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
  originalLines,
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
        isPresentInSentence: _.includes(
          originalLines[sentenceIndex].toLowerCase(),
          wordData.word
        ),
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

  const saccadeDetailedReport = saccadeTotalTimesPerSentence.map(
    (line, index) => ({
      ...defaultProps,
      ...line,
      from: index + 1,
      to: index + 2,
    })
  );

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

  const defaultProps = {
    topicId,
    contentId,
    batchNumber,
  };
  const result = collateReadingData({
    ...totalTimesPerWord,
    ...totalTimesPerSentence,
    ...body,
    defaultProps,
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
  await createBatch({ batchNumber: batchNumber + 1 });

  return NextResponse.json(
    {
      batch: defaultProps,
      detailedReport: detailedReport.map((report, index) => ({
        ...report.toObject({ getters: true }),
        index: index + 1,
      })),
      maxTimeWordsPerSentence: maxTimeWordsPerSentence.map((time, index) => ({
        ...time.toObject({ getters: true }),
        index: index + 1,
      })),
      maxFixationWordsPerSentence: maxFixationWordsPerSentence.map(
        (fixation, index) => ({
          ...fixation.toObject({ getters: true }),
          index: index + 1,
        })
      ),
      saccadeDetailedReport: saccadeDetailedReport.map((saccade, index) => ({
        ...saccade.toObject({ getters: true }),
        index: index + 1,
      })),
    },
    { status: 200 }
  );
}
