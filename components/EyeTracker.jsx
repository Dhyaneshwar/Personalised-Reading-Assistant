"use client";
import {
  handleVideo,
  initializeWebGazer,
  initialWebgazerSetup,
} from "@/lib/webgazerHandler";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EyeTracker() {
  const [enableWebgazer, setEnableWebgazer] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    const { webgazer } = window;
    if (webgazer) {
      initialWebgazerSetup(webgazer);
    } else {
      initializeWebGazer();
    }

    return () => {
      if (window.webgazer) {
        window.webgazer.stopVideo();
        window.webgazer.end();
      }
    };
  }, []);

  const handleWebgazerState = () => {
    const { webgazer } = window;
    setEnableWebgazer((prevState) => {
      if (prevState) {
        handleVideo(webgazer, false);
        document.getElementById("webgazerVideoContainer").remove();
        document.getElementById("webgazerGazeDot").remove();
        webgazer.showPredictionPoints(false);
        webgazer.stopVideo();
      } else {
        webgazer.begin();
        handleVideo(webgazer, true);
        webgazer.showPredictionPoints(true);
      }
      return !prevState;
    });
  };

  const handlePreview = () => {
    const { webgazer } = window;
    setShowPreview((prevState) => {
      handleVideo(webgazer, !prevState);
      return !prevState;
    });
  };

  const handlePrediction = () => {
    const { webgazer } = window;
    setShowPredictions((prevState) => {
      webgazer.showPredictionPoints(!prevState);
      return !prevState;
    });
  };

  return (
    <div className="flex justify-evenly align-middle">
      <div className="text-center m-5 ml-[6rem] p-8">News Contents</div>
      <div className="flex align-middle">
        <Link
          className="bg-slate-400 m-6 p-2 w-32 h-16 rounded-xl flex items-center justify-center"
          href="/calibrate"
        >
          Calibrate
        </Link>
        <button
          className={`${
            enableWebgazer
              ? "bg-slate-400 text-zinc-950"
              : "bg-slate-100 text-zinc-500"
          } m-6 p-2 w-32 h-16 rounded-xl`}
          onClick={handlePreview}
          disabled={!enableWebgazer}
        >
          {showPreview ? "Hide" : "Show"} Preview
        </button>
        <button
          className={`${
            enableWebgazer
              ? "bg-slate-400 text-zinc-950"
              : "bg-slate-100 text-zinc-500"
          } m-6 p-2 w-32 h-16 rounded-xl`}
          onClick={handlePrediction}
          disabled={!enableWebgazer}
        >
          {showPredictions ? "Hide" : "Show"} Predictions
        </button>
        <button
          className="bg-slate-400 m-6 p-2 w-32 h-16 rounded-xl"
          onClick={handleWebgazerState}
        >
          {enableWebgazer ? "Disable" : "Enable"} Webgazer
        </button>
      </div>
    </div>
  );
}
