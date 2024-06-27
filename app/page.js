import React from "react";
import Link from "next/link";
import { topics } from "@/lib/data";
import HeaderBar from "@/components/HeaderBar";
import TopicsPage from "@/components/Topics";

function HomePage() {
  return (
    <>
      <HeaderBar />
      <div className="w-[500px] text-center mx-auto p-5 flex flex-col items-center justify-center">
        <span>Welcome to Our app</span>
        <TopicsPage />
        <Link href="/gazer" className="underline">
          Navigate to Gazer
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
    </>
  );
}

export default HomePage;
