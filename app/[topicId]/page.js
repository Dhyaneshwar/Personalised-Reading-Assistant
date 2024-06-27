"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import { topics } from "@/lib/data";
import HeaderBar from "@/components/HeaderBar";

function TopicPage() {
  const { topicId } = useParams();
  const { title, contents = [] } = topics.find(({ id }) => id === topicId);
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
