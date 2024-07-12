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
      className="sticky z-50 flex w-full items-center justify-between border border-black bg-amber-600"
      style={{ top: 0 }}
    >
      <div className="Icon_Container inline-flex border-r-2 border-blue-900 p-3">
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
      <div className="Calibration_Container inline-flex h-[59px] items-center border-l-2 border-blue-900 p-3">
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
