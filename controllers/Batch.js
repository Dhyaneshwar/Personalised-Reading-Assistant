import Batch from "../models/Batch";

export async function getBatchs(data) {
  try {
    const batchs = await Batch.find({});
    return batchs;
  } catch (error) {
    console.log(error);
  }
}

export async function getLastBatch() {
  try {
    const batch = await Batch.find({}).sort({ createdAt: -1 }).limit(1);
    return batch[0];
  } catch (error) {
    console.log(error);
  }
}

export async function createBatch(data) {
  try {
    console.log(data);
    const batch = await Batch.create(data);
    return batch;
  } catch (error) {
    console.log(error);
  }
}

export async function getBatchById(id) {
  try {
    const batch = await Batch.findById(id);
    if (!batch) {
      return "Batch not found";
    }
    return batch;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBatch(id, data) {
  try {
    const batch = await Batch.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!batch) {
      return "Batch not found";
    }
    return batch;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllBatch() {
  try {
    const batch = await Batch.deleteMany();
    if (!batch) {
      return "Batch not found";
    }
    return batch;
  } catch (error) {
    console.log(error);
  }
}
