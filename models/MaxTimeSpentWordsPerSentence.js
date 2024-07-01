import mongoose from "mongoose";

const MaxTimeSpentWordsPerSentenceSchema = new mongoose.Schema({
  batchNumber: {
    type: Number,
    required: true,
  },
  topicId: {
    type: String,
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
  sentenceNumber: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  cumulativeTotalTime: {
    type: Number,
    required: true,
  },
  fixationCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.MaxTimeSpentWordsPerSentence ||
  mongoose.model(
    "MaxTimeSpentWordsPerSentence",
    MaxTimeSpentWordsPerSentenceSchema
  );
