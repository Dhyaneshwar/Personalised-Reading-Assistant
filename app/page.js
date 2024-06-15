import React from "react";
import EyeTracker from "@/components/EyeTracker";
import Link from "next/link";

function HomePage() {
  return (
    <div className="w-[500px] h-[750px] text-center mx-auto p-5 flex flex-col items-center justify-center">
      <span>Welcome to Our app</span>
      <Link href="/gazer" className="underline">
        Navigate to Gazer
      </Link>
    </div>
  );
}

export default HomePage;
