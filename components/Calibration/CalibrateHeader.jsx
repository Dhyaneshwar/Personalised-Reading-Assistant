"use client";
import {
  initializeWebGazer,
  initialWebgazerSetup,
} from "@/lib/webgazerHandler";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
        try {
          window.webgazer?.stopVideo();
          window.webgazer?.end();
        } catch (e) {
          console.log(e);
        }
      }
    };
  });

  return (
    <div
      className="w-full bg-amber-600 border border-black flex justify-between items-center sticky"
      style={{ top: 0 }}
    >
      <div className="Icon_Container border-r-2 border-blue-900 inline-flex p-3">
        <Link href="/">
          <Image
            src="/icon.png"
            width={35}
            height={35}
            alt="Picture of the author"
          />
        </Link>
      </div>
      <div className="Heading_Container">
        <h1 className="text-4xl font-semibold">Calibration Page</h1>
      </div>
      <div className="border-l-2 border-blue-900 inline-flex items-center h-[59px] p-3">
        <button onClick={handleBack} className="text-white">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CalibrateHeader;
