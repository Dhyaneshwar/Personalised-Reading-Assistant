"use client";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useRef } from "react";

const HuggingFacePage = () => {
  const inputRef = useRef();
  const [content, setContent] = useState("");

  const getSummaryHandler = async () => {
    const response = await fetch("/api/huggingface/textGenerator", {
      method: "post",
      body: JSON.stringify({
        prompt: inputRef.current.value,
      }),
    });
    const outputValue = await response.json();
    setContent(outputValue);
  };

  return (
    <>
      <div className="m-10">
        <textarea
          className="h-[150px] w-[1000px] border-2 border-black p-4"
          placeholder="type here"
          ref={inputRef}
        />
        <div>
          <button
            className="rounded-lg bg-slate-300 p-4"
            onClick={getSummaryHandler}
          >
            Get Summary
          </button>
        </div>
        <p>{content}</p>
      </div>
      <Footer />
    </>
  );
};

export default HuggingFacePage;
