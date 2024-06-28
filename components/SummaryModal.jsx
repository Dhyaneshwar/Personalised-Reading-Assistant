"use client";
import { Modal, Box } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { style } from "@/utils/modalStyles";

export default function SummaryModal({ isOpen, handleClose }) {
  const initialResponse = useMemo(
    () => ({
      extractedContent:
        "Please read the displayed content to generate some summary",
      summaryData: "",
      definitions: { number_of_definitions: 0 },
    }),
    []
  );
  const [response, setResponse] = useState(initialResponse);
  const [toggleLinesRead, setToggleLinesRead] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async (prompt) => {
      try {
        const resp = await fetch("/api/assistant/summary", {
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
        return dataSummary;
      } catch (error) {
        console.error("Failed to fetch summary:", error);
        return null;
      }
    };

    const fetchAndSetSummary = async () => {
      setIsLoading(true);
      const { webgazer } = window || {};
      const words = webgazer?.wordAtPixel || [];
      if (words.length > 30) {
        const gazeContent = words.join(" ");
        const originalContent =
          document.getElementById("ContentArea")?.textContent || "";

        const data = await fetchSummary({ originalContent, gazeContent });
        setResponse(data);
        webgazer.wordAtPixel = data.extractedContent.split(" ");
      } else {
        setResponse(initialResponse);
      }
      setIsLoading(false);
    };

    fetchAndSetSummary();
  }, [initialResponse]);

  const extractDefinition = (definitions) => {
    const { number_of_definitions, ...rest } = definitions || {};
    return Object.values(rest).map((define, index) => (
      <li key={index}>
        <span className="capitalize">{define.word}:- </span>
        <span>{define.definition}</span>
      </li>
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
            Summary & Definition is Loading
          </h1>
          <p className="text-center">
            Please wait... The summary and definition is getting generated!!!
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
            Summary
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
              <p className="text-justify">{response?.extractedContent}</p>
            )}
          </div>
          {response.summaryData && (
            <div className="Summary_Container mt-10">
              <h3 className="font-semibold inline-block">Brief Summary:</h3>
              <p className="text-justify">{response.summaryData}</p>
            </div>
          )}
          {response.definitions.number_of_definitions > 0 && (
            <div className="Definition_Container mt-10">
              <h3 className="font-semibold inline-block">
                Definitions for Important/Complicated Words:
              </h3>
              <p className="text-justify">
                <ul className="list-disc">
                  {extractDefinition(response.definitions)}
                </ul>
              </p>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}
