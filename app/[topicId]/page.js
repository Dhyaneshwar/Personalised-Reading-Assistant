"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { contents as allContents, topics } from "@/lib/data";
import HeaderBar from "@/components/HeaderBar";

function TopicPage() {
  const { topicId } = useParams();
  const { title } = topics.find(({ id }) => id === topicId);
  const contents = allContents.filter((content) => content.topicId === topicId);
  return (
    <>
      <HeaderBar title={title} />
      <div className="flex justify-center">
        <ul>
          Navigate to
          {contents.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/${topicId}/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TopicPage;
