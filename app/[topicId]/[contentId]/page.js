"use client";
import ContentPage from "@/components/Content";
import EyeTracker from "@/components/EyeTracker";
import { contents } from "@/lib/data";
import { useParams } from "next/navigation";
import React from "react";

function ContentContainer() {
  const { contentId } = useParams();
  const { title, content } = contents.find(({ id }) => id === contentId);
  return (
    <>
      <div className="flex justify-center">{title}</div>
      <EyeTracker />
      <ContentPage content={content} />
    </>
  );
}

export default ContentContainer;
