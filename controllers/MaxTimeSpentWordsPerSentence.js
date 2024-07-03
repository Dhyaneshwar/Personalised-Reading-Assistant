import MaxTimeSpentWordsPerSentence from "../models/MaxTimeSpentWordsPerSentence";

export async function getMaxTimeSpentWordsPerSentences(data) {
  try {
    const maxTimeSpentWordsPerSentences =
      await MaxTimeSpentWordsPerSentence.find({});
    return maxTimeSpentWordsPerSentences;
  } catch (error) {
    console.log(error);
  }
}

export async function createMaxTimeSpentWordsPerSentence(data) {
  try {
    const maxTimeSpentWordsPerSentences =
      await MaxTimeSpentWordsPerSentence.insertMany(data);
    return maxTimeSpentWordsPerSentences;
  } catch (error) {
    console.log(error);
  }
}

export async function getMaxTimeSpentWordsPerSentenceById(id) {
  try {
    const maxTimeSpentWordsPerSentence =
      await MaxTimeSpentWordsPerSentence.findById(id);
    if (!maxTimeSpentWordsPerSentence) {
      return "MaxTimeSpentWordsPerSentence not found";
    }
    return maxTimeSpentWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMaxTimeSpentWordsPerSentence(id, data) {
  try {
    const maxTimeSpentWordsPerSentence =
      await MaxTimeSpentWordsPerSentence.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    if (!maxTimeSpentWordsPerSentence) {
      return "MaxTimeSpentWordsPerSentence not found";
    }
    return maxTimeSpentWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllMaxTimeSpentWordsPerSentence() {
  try {
    const maxTimeSpentWordsPerSentence =
      await MaxTimeSpentWordsPerSentence.deleteMany();
    if (!maxTimeSpentWordsPerSentence) {
      return "MaxTimeSpentWordsPerSentence not found";
    }
    return maxTimeSpentWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMaxTimeSpentWordsPerSentenceByBatchNumber(
  batchNumber
) {
  try {
    const maxTimeSpentWordsPerSentence =
      await MaxTimeSpentWordsPerSentence.deleteMany({
        batchNumber,
      });
    if (!maxTimeSpentWordsPerSentence) {
      return "MaxTimeSpentWordsPerSentence not found";
    }
    return maxTimeSpentWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}
