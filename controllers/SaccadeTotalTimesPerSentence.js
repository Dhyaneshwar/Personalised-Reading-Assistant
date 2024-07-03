import SaccadeTotalTimesPerSentence from "../models/SaccadeTotalTimesPerSentence";

export async function getSaccadeTotalTimesPerSentences(data) {
  try {
    const saccadeTotalTimesPerSentences =
      await SaccadeTotalTimesPerSentence.find({});
    return saccadeTotalTimesPerSentences;
  } catch (error) {
    console.log(error);
  }
}

export async function createSaccadeTotalTimesPerSentence(data) {
  try {
    const saccadeTotalTimesPerSentences =
      await SaccadeTotalTimesPerSentence.insertMany(data);
    return saccadeTotalTimesPerSentences;
  } catch (error) {
    console.log(error);
  }
}

export async function getSaccadeTotalTimesPerSentenceById(id) {
  try {
    const saccadeTotalTimesPerSentence =
      await SaccadeTotalTimesPerSentence.findById(id);
    if (!saccadeTotalTimesPerSentence) {
      return "SaccadeTotalTimesPerSentence not found";
    }
    return saccadeTotalTimesPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function updateSaccadeTotalTimesPerSentence(id, data) {
  try {
    const saccadeTotalTimesPerSentence =
      await SaccadeTotalTimesPerSentence.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    if (!saccadeTotalTimesPerSentence) {
      return "SaccadeTotalTimesPerSentence not found";
    }
    return saccadeTotalTimesPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllSaccadeTotalTimesPerSentence() {
  try {
    const saccadeTotalTimesPerSentence =
      await SaccadeTotalTimesPerSentence.deleteMany();
    if (!saccadeTotalTimesPerSentence) {
      return "SaccadeTotalTimesPerSentence not found";
    }
    return saccadeTotalTimesPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSaccadeTotalTimesPerSentenceByBatchNumber(
  batchNumber
) {
  try {
    const saccadeTotalTimesPerSentence =
      await SaccadeTotalTimesPerSentence.findOneAndDelete({
        batchNumber,
      });
    if (!saccadeTotalTimesPerSentence) {
      return "SaccadeTotalTimesPerSentence not found";
    }
    return saccadeTotalTimesPerSentence;
  } catch (error) {
    console.log(error);
  }
}
