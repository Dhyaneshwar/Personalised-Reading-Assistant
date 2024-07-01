import mongoose from "mongoose";

const DetailedReportSchema = new mongoose.Schema({
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
  sentenceReadTime: {
    type: Number,
    required: true,
  },
});

const DetailedReport =
  mongoose.models.DetailedReport ||
  mongoose.model("DetailedReport", DetailedReportSchema);

export default DetailedReport;
