"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { btnClasses, headerClasses, style } from "@/utils/modalStyles";

export default function QuestionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState({});
  const [toggleLinesRead, setToggleLinesRead] = useState(true);
  const [visibleAnswers, setVisibleAnswers] = useState([]);

  useEffect(() => {
    const { webgazer } = window || {};
    const words = webgazer?.wordAtPixel || [];
    const extractedContent = words.join(" ");
    const originalText = document.getElementById("ContentArea").textContent;

    const res = {
      extractedContent: extractedContent || "No Content to display",
      questions: {
        numOfQues: 4,
        q1: {
          ques: "What is news?",
          ans: "News is information about current events.",
        },
        q2: {
          ques: "Through what media can news be provided?",
          ans: "Word of mouth, printing, postal systems, broadcasting, electronic communication, or through the testimony of observers and witnesses to events.",
        },
        q3: {
          ques: "What is 'hard news'?",
          ans: "Hard news is a term used to differentiate news from soft media.",
        },
        q4: {
          ques: "What are some common topics for news reports?",
          ans: "War, government, politics, education, health, the environment, economy, business, fashion, entertainment, and sport, as well as quirky or unusual events.",
        },
      },
    };
    setResponse(res);
    setVisibleAnswers(new Array(res.questions.numOfQues).fill(false));
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswers((prevVisibleAnswers) =>
      prevVisibleAnswers.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const toggleAllAnswerVisibility = () => {
    const state = visibleAnswers.every((v) => v);
    setVisibleAnswers((prevVisibleAnswers) =>
      prevVisibleAnswers.map((v) => !state)
    );
  };

  const extractQuestion = (questions) => {
    const { numOfQues, ...rest } = questions;
    return Object.values(rest).map((question, index) => (
      <>
        <h3 className="font-bold text-xl mt-2">Questions {index + 1}: </h3>
        <p className="capitalize font-medium mb-2"> {question.ques} </p>
        <button
          className="p-1 rounded-lg bg-slate-400 border border-black"
          onClick={() => toggleAnswerVisibility(index)}
        >
          {visibleAnswers[index] ? "Hide Answer" : "Show Answer"}
        </button>
        <br />
        {visibleAnswers[index] && (
          <p className="mb-3">
            <span className="font-medium">Answer:- </span>
            {question.ans}
          </p>
        )}
        <br />
      </>
    ));
  };

  return (
    <>
      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <Box style={style}>
            <h1 className={headerClasses} style={{ top: "-25px" }}>
              Question
            </h1>
            <div className="Extracted_Gaze_Content">
              <div
                className="cursor-pointer flex items-center"
                onClick={() => {
                  setToggleLinesRead((prevState) => !prevState);
                }}
              >
                {toggleLinesRead ? (
                  <ArrowDropDown className="ml-[-24px]" />
                ) : (
                  <ArrowDropUp className="ml-[-24px]" />
                )}
                <h3 className="font-semibold inline-block">Lines Read:</h3>
              </div>
              {toggleLinesRead && (
                <p className="text-justify">{response.extractedContent}</p>
              )}
            </div>
            <div className="Question_Container mt-10 text-justify">
              {extractQuestion(response.questions)}
            </div>

            <div className="Show_All_Button text-justify flex justify-center">
              <button
                className="p-1 rounded-lg bg-slate-400 border border-black capitalize w-40 h-10 "
                onClick={toggleAllAnswerVisibility}
              >
                {visibleAnswers.every((v) => v) ? "hide" : "show"} all
              </button>
            </div>
          </Box>
        </Modal>
      )}

      <Button className={btnClasses} onClick={handleOpen}>
        Generate Question
      </Button>
    </>
  );
}
