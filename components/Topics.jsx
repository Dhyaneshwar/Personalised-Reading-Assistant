import { topics } from "@/lib/data";
import Image from "next/image";
import React from "react";

function TopicsPage() {
  return (
    <>
      <div>Topics</div>
      {topics.map(({ img }, index) => (
        <div key={index} className="m-10">
          <Image src={img} width={90} height={90} alt={img} />
        </div>
      ))}
    </>
  );
}

export default TopicsPage;
