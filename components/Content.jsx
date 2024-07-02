"use client";
import { useState } from "react";
import QuestionModal from "./QuestionModal";
import SummaryModal from "./SummaryModal";
import { useParams } from "next/navigation";

function ContentPage({ content }) {
  const { topicId, contentId } = useParams();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const clearGazeData = () => {
    const { webgazer } = window || {};
    webgazer.wordAtPixel = [];
    webgazer.wordReadAt = [];
  };

  const handleSummaryOpen = () => setIsSummaryOpen(true);

  const handleSummaryClose = () => setIsSummaryOpen(false);

  const handleQuestionOpen = () => setIsQuestionOpen(true);

  const handleQuestionClose = () => setIsQuestionOpen(false);

  const handleProcessData = async () => {
    const { webgazer } = window || {};
    const { lines, wordAtPixel, wordReadAt } = webgazer;
    const prompt = {
      topicId,
      contentId,
      originalLines: lines,
      gazeContent: wordAtPixel.join(" "),
      wordReadTime: wordReadAt,
    };
    try {
      const resp = await fetch("/api/assistant/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }

      const dataSummary = await resp.json();
      console.log(dataSummary);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      return null;
    }
  };

  return (
    <>
      {isSummaryOpen && (
        <SummaryModal isOpen={isSummaryOpen} handleClose={handleSummaryClose} />
      )}
      {isQuestionOpen && (
        <QuestionModal
          isOpen={isQuestionOpen}
          handleClose={handleQuestionClose}
        />
      )}

      <div className="flex flex-col w-full gap-8 mb-10">
        <div className="border border-black overflow-y-auto w-4/5 h-[65vh] mx-auto mt-3 p-3 px-8">
          <div
            className="leading-[2.5] text-justify text-2xl"
            style={{ wordSpacing: "1.5rem" }}
            id="ContentArea"
          >
            {content ||
              `News is information about current events. This may be provided
            through many different media: word of mouth, printing, postal
            systems, broadcasting, electronic communication, or through the
            testimony of observers and witnesses to events. News is sometimes
            called &apos;hard news&apos; to differentiate it from soft media.
            Common topics for news reports include war, government, politics,
            education, health, the environment, economy, business, fashion,
            entertainment, and sport, as well as quirky or unusual events.
            Government proclamations, concerning royal ceremonies, laws, taxes,
            public health, and criminals, have been dubbed news since ancient
            times. Technological and social developments, often driven by
            government communication and espionage networks, have increased the
            speed with which news can spread, as well as influenced its content.
            Throughout history, people have transported new information through
            oral means. Having developed in China over centuries, newspapers
            became established in Europe during the early modern period. In the
            20th century, radio and television became an important means of
            transmitting news. Whilst in the 21st, the internet has also begun
            to play a similar role.`}
          </div>
        </div>
        <div className="flex gap-14 justify-center">
          <button
            className="border border-slate-600 bg-slate-400 p-3 rounded-xl text-black"
            onClick={clearGazeData}
          >
            Clear Gaze Data
          </button>
          <button
            className="border border-slate-600 bg-slate-400 p-3 rounded-xl text-black"
            onClick={handleSummaryOpen}
          >
            Generate Summary
          </button>
          <button
            className="border border-slate-600 bg-slate-400 p-3 rounded-xl text-black"
            onClick={handleQuestionOpen}
          >
            Generate Question
          </button>
          <button
            className="border border-slate-600 bg-slate-400 p-3 rounded-xl text-black"
            onClick={handleProcessData}
          >
            Analyse Gaze Data
          </button>
        </div>
      </div>
    </>
  );
}

export default ContentPage;
