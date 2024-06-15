"use client";
import {
  initializeWebGazer,
  initialWebgazerSetup,
} from "@/lib/webgazerHandler";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function CalibratePage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const { webgazer } = window;
    const options = { showVideoPreview: false };
    if (webgazer) {
      initialWebgazerSetup(webgazer, options);
    } else {
      initializeWebGazer(() => {}, options);
    }
    return () => {
      if (window.webgazer) {
        window.webgazer.stopVideo();
        window.webgazer.end();
      }
    };
  });

  return (
    <>
      <div>Calibrate Page</div>
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Go Back
      </button>
    </>
  );
}

export default CalibratePage;
