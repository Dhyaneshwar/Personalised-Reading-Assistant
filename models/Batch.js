import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema(
  {
    batchNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Batch || mongoose.model("Batch", BatchSchema);
