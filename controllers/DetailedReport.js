import DetailedReport from "../models/DetailedReport";

export async function getDetailedReports() {
  try {
    const detailedReports = await DetailedReport.find({});
    return detailedReports;
  } catch (error) {
    console.log(error);
  }
}

export async function createDetailedReport(data) {
  try {
    const detailedReports = await DetailedReport.insertMany(data);
    return detailedReports;
  } catch (error) {
    console.log(error);
  }
}

export async function getDetailedReportById(id) {
  try {
    const detailedReport = await DetailedReport.findById(id);
    if (!detailedReport) {
      return "DetailedReport not found";
    }
    return detailedReport;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDetailedReport(id, data) {
  try {
    const detailedReport = await DetailedReport.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!detailedReport) {
      return "DetailedReport not found";
    }
    return detailedReport;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllDetailedReport() {
  try {
    const detailedReport = await DetailedReport.deleteMany({});
    if (!detailedReport) {
      return "DetailedReport not found";
    }
    return detailedReport;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDetailedReportByBatchNumber(batchNumber) {
  try {
    const detailedReport = await DetailedReport.deleteMany({
      batchNumber,
    });
    if (!detailedReport) {
      return "DetailedReport not found";
    }
    return detailedReport;
  } catch (error) {
    console.log(error);
  }
}
