"use client";
import { useState } from "react";
import QuestionModal from "./QuestionModal";
import SummaryModal from "./SummaryModal";
import { Button } from "@mui/material";
import { btnClasses } from "@/utils/modalStyles";

function ContentPage() {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const handleSummaryOpen = () => setIsSummaryOpen(true);

  const handleSummaryClose = () => setIsSummaryOpen(false);

  const handleQuestionOpen = () => setIsQuestionOpen(true);

  const handleQuestionClose = () => setIsQuestionOpen(false);

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

      <div className="flex flex-col w-full gap-8">
        <div className="border border-black overflow-y-auto w-4/5 h-[55vh] mx-auto mt-32 p-3 px-8">
          <div
            className="leading-[4] text-justify text-3xl"
            style={{ wordSpacing: "2rem" }}
            id="ContentArea"
          >
            News is information about current events. This may be provided
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
            to play a similar role.
          </div>
        </div>
        <div className="flex gap-14 justify-center">
          <Button
            className="border border-slate-600 bg-slate-400 p-3 rounded-xl text-black"
            onClick={handleSummaryOpen}
          >
            Generate Summary
          </Button>
          <Button
            className="border border-slate-600 bg-slate-400 p-3 rounded-xl text-black"
            onClick={handleQuestionOpen}
          >
            Generate Question
          </Button>
        </div>
      </div>
    </>
  );
}

export default ContentPage;
