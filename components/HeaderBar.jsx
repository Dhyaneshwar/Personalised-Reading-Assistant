"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function HeaderBar({ title = "Personalized Reading Assistant" }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.back();
  };

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
      <div className="Heading_Container text-center">
        <h1 className="text-4xl font-semibold">{title}</h1>
      </div>
      <div className="Calibration_Container border-l-2 border-blue-900 inline-flex items-center h-[59px] p-3">
        {pathname !== "/calibrate" ? (
          <Link href="/calibrate" className="text-white">
            Calibrate
          </Link>
        ) : (
          <button onClick={handleBack} className="text-white">
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}

export default HeaderBar;
