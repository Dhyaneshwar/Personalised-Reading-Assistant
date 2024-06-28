"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { contents as allContents, topics } from "@/lib/data";
import HeaderBar from "@/components/HeaderBar";
import CardContainer from "@/components/CardContainer/CardContainer";
import AboutPage from "@/components/About";

function TopicPage() {
  const { topicId } = useParams();
  const { title } = topics.find(({ id }) => id === topicId);
  const contents = allContents.filter((content) => content.topicId === topicId);
  return (
    <>
      <HeaderBar title={title} />
      <div className="w-[95vw] h-[calc(100vh-61px)] text-center mx-auto p-5 bg-slate-100">
        <AboutPage title={title} />
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
