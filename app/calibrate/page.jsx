import React from "react";
import CalibrationPointsPage from "@/components/Calibration/CalibrationPoints";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";

function CalibrationPage() {
  return (
    <>
      <HeaderBar title="Calibration Page" />
      <CalibrationPointsPage />
      <Footer />
    </>
  );
}

export default CalibrationPage;
