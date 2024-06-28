"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { contents as allContents, topics } from "@/lib/data";
import HeaderBar from "@/components/HeaderBar";
import CardContainer from "@/components/CardContainer/CardContainer";

function TopicPage() {
  const { topicId } = useParams();
  const { title } = topics.find(({ id }) => id === topicId);
  const contents = allContents.filter((content) => content.topicId === topicId);
  return (
    <>
      <HeaderBar title={title} />
      <div className="w-[90vw] text-center mx-auto p-5">
        <p>Welcome to {title}</p>
        <CardContainer
          cardTitle="Contents"
          cardContent={contents}
          pathName={`/${topicId}`}
        />
      </div>
    </>
  );
}

export default TopicPage;
