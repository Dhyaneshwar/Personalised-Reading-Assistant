import React from "react";
import Link from "next/link";
import { topics } from "@/lib/data";

function HomePage() {
  return (
    <div className="w-[500px] h-[750px] text-center mx-auto p-5 flex flex-col items-center justify-center">
      <span>Welcome to Our app</span>
      <Link href="/gazer" className="underline">
        Navigate to Gazer
      </Link>
      <Link href="/calibrate" className="underline">
        Navigate to Calibrate
      </Link>
      <ul className="m-5 list-disc text-left">
        Navigate to
        {topics.map((topic) => (
          <li key={topic.id} className="ml-5">
            <Link href={`/${topic.id}`} className="underline">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
