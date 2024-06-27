"use client";
import { Modal, Box } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { style } from "@/utils/modalStyles";

export default function QuestionModal({ isOpen, handleClose }) {
  const initialResponse = useMemo(
    () => ({
      extractedContent:
        "Please read the displayed content to generate some question",
      questions: { numOfQues: 0 },
    }),
    []
  );
  const [response, setResponse] = useState(initialResponse);
  const [isLoading, setIsLoading] = useState(false);

  const [toggleLinesRead, setToggleLinesRead] = useState(true);
  const [visibleAnswers, setVisibleAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestion = async (prompt) => {
      try {
        const resp = await fetch("/api/assistant/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prompt),
        });

        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }

        const dataQuestion = await resp.json();
        return dataQuestion;
      } catch (error) {
        console.error("Failed to fetch question:", error);
        return null;
      }
    };

    const fetchAndSetQuestion = async () => {
      setIsLoading(true);
      const { webgazer } = window || {};
      const words = webgazer?.wordAtPixel || [];
      if (words.length > 30) {
        const gazeContent = words.join(" ");
        const originalContent =
          document.getElementById("ContentArea")?.textContent || "";

        const data = await fetchQuestion({ originalContent, gazeContent });
        setResponse(data);
        setVisibleAnswers(new Array(data.questions.numOfQues).fill(false));
        webgazer.wordAtPixel = data.extractedContent.split();
      } else {
        setResponse(initialResponse);
        setVisibleAnswers(
          new Array(initialResponse.questions.numOfQues).fill(false)
        );
      }
      setIsLoading(false);
    };

    fetchAndSetQuestion();
  }, [initialResponse]);

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
    const { numOfQues, ...rest } = questions || {};
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

  if (isLoading) {
    return (
      <Modal open={isLoading}>
        <Box style={style}>
          <h1
            className="mb-3 text-3xl font-semibold text-center sticky mt-[-25px] ml-[-50px] w-[110%] bg-white p-4"
            style={{ top: "-25px" }}
          >
            Questions are Loading
          </h1>
          <p className="text-center">
            Please wait... The questions are getting generated!!!
          </p>
        </Box>
      </Modal>
    );
  }

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box style={style}>
          <h1
            className="mb-3 text-3xl font-semibold text-center sticky mt-[-25px] ml-[-50px] w-[110%] bg-white p-4"
            style={{ top: "-25px" }}
          >
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
          {response.questions.numOfQues > 0 && (
            <>
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
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
