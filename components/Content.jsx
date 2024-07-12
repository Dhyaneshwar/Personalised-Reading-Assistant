"use client";
import { useState } from "react";
import QuestionModal from "./QuestionModal";
import SummaryModal from "./SummaryModal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function ContentPage({ content, displayButton = true }) {
  const { topicId, contentId } = useParams();
  const router = useRouter();
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
    const words = webgazer?.wordAtPixel || [];
    if (words.length > 30) {
      router.push(`/report?topicId=${topicId}&contentId=${contentId}`);
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

      <div className="mb-10 flex w-full flex-col gap-8">
        <div className="mx-auto mt-3 h-[65vh] w-4/5 overflow-y-auto border border-black p-3 px-8">
          <div
            className="text-justify text-2xl leading-[2.5]"
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
        {displayButton && (
          <div className="flex justify-center gap-14">
            <button
              className="rounded-xl border border-slate-600 bg-slate-400 p-3 text-black"
              onClick={clearGazeData}
            >
              Clear Gaze Data
            </button>
            <button
              className="rounded-xl border border-slate-600 bg-slate-400 p-3 text-black"
              onClick={handleSummaryOpen}
            >
              Generate Summary
            </button>
            <button
              className="rounded-xl border border-slate-600 bg-slate-400 p-3 text-black"
              onClick={handleQuestionOpen}
            >
              Generate Question
            </button>
            <button
              className="rounded-xl border border-slate-600 bg-slate-400 p-3 text-black"
              onClick={handleProcessData}
            >
              Analyse Gaze Data
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ContentPage;
