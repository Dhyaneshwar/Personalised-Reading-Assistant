import MaxFixatedWordsPerSentence from "../models/MaxFixatedWordsPerSentence";

export async function getMaxFixatedWordsPerSentences(data) {
  try {
    const maxFixatedWordsPerSentences = await MaxFixatedWordsPerSentence.find(
      {}
    );
    return maxFixatedWordsPerSentences;
  } catch (error) {
    console.log(error);
  }
}

export async function createMaxFixatedWordsPerSentence(data) {
  try {
    const maxFixatedWordsPerSentences =
      await MaxFixatedWordsPerSentence.insertMany(data);
    return maxFixatedWordsPerSentences;
  } catch (error) {
    console.log(error);
  }
}

export async function getMaxFixatedWordsPerSentenceById(id) {
  try {
    const maxFixatedWordsPerSentence =
      await MaxFixatedWordsPerSentence.findById(id);
    if (!maxFixatedWordsPerSentence) {
      return "MaxFixatedWordsPerSentence not found";
    }
    return maxFixatedWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMaxFixatedWordsPerSentence(id, data) {
  try {
    const maxFixatedWordsPerSentence =
      await MaxFixatedWordsPerSentence.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    if (!maxFixatedWordsPerSentence) {
      return "MaxFixatedWordsPerSentence not found";
    }
    return maxFixatedWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllMaxFixatedWordsPerSentence() {
  try {
    const maxFixatedWordsPerSentence =
      await MaxFixatedWordsPerSentence.deleteMany();
    if (!maxFixatedWordsPerSentence) {
      return "MaxFixatedWordsPerSentence not found";
    }
    return maxFixatedWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMaxFixatedWordsPerSentenceByBatchNumber(
  batchNumber
) {
  try {
    const maxFixatedWordsPerSentence =
      await MaxFixatedWordsPerSentence.deleteMany({
        batchNumber,
      });
    if (!maxFixatedWordsPerSentence) {
      return "MaxFixatedWordsPerSentence not found";
    }
    return maxFixatedWordsPerSentence;
  } catch (error) {
    console.log(error);
  }
}
