"use client";
import {
  initializeWebGazer,
  initialWebgazerSetup,
} from "@/lib/webgazerHandler";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function CalibrateHeader() {
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
      initializeWebGazer(options);
    }
    return () => {
      if (window.webgazer) {
        window.webgazer?.stopVideo();
        window.webgazer?.end();
      }
    };
  });

  return (
    <div className="flex justify-around items-center bg-stone-600 mb-4 text-center font-medium p-2">
      <div className="text-white ml-12 flex-grow-[1] text-4xl">
        Calibrate Page
      </div>
      <button
        onClick={handleBack}
        className="bg-purple-500 text-white p-2 rounded "
      >
        Go Back
      </button>
    </div>
  );
}

export default CalibrateHeader;
