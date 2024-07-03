import mongoose from "mongoose";

const SaccadeTotalTimesPerSentenceSchema = new mongoose.Schema({
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
  cumulativeTotalTime: {
    type: Number,
    required: true,
  },
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.SaccadeTotalTimesPerSentence ||
  mongoose.model(
    "SaccadeTotalTimesPerSentence",
    SaccadeTotalTimesPerSentenceSchema
  );
