import React from "react";
import CalibrationPointsPage from "@/components/Calibration/CalibrationPoints";
import HeaderBar from "@/components/HeaderBar";

function CalibrationPage() {
  return (
    <>
      <HeaderBar title="Calibration Page" />
      <CalibrationPointsPage />
    </>
  );
}

export default CalibrationPage;
