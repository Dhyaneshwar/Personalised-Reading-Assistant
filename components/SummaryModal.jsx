"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { btnClasses, headerClasses, style } from "@/utils/modalStyles";
import _ from "lodash";

export default function SummaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState({});
  const [toggleLinesRead, setToggleLinesRead] = useState(true);

  useEffect(() => {
    const { webgazer } = window || {};
    const words = webgazer?.wordAtPixel;

    setResponse({
      extractedContent: _.isEmpty(words)
        ? "No Content to display"
        : words.join(" "),
      summaryData:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta laudantium repellat non vitae iusto aliquam, unde nulla quibusdam eaque deleniti tempora ipsum in ex aliquid alias ea necessitatibus dolores maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla ipsum saepe, harum quisquam ut excepturi? Iusto, placeat, eos repellat nobis tempora eligendi aut, impedit minima mollitia dolorem fuga saepe. Iusto, placeat, eos repellat nobis tempora eligendi aut, impedit minima mollitia dolorem fuga saepe.",
      definitions: {
        number_of_definitions: 5,
        definition1: {
          word: "testimony",
          definition: "a formal statement testifying to a fact or event",
        },
        definition2: {
          word: "broadcasting",
          definition:
            "the act of transmitting audio or video content to a wide audience via radio, television, or internet",
        },
        definition3: {
          word: "environment",
          definition:
            "the natural world, including land, water, air, plants, and living things",
        },
        definition4: {
          word: "quirky",
          definition: "unconventional or unexpected in a humorous way",
        },
        definition5: {
          word: "testifying",
          definition:
            "to give evidence or testimony, especially in a court of law",
        },
      },
    });
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const extractDefinition = (definitions) => {
    const { number_of_definitions, ...rest } = definitions;
    return Object.values(rest).map((define, index) => (
      <li key={index}>
        <span className="capitalize">{define.word}:- </span>
        <span>{define.definition}</span>
      </li>
    ));
  };

  return (
    <>
      {isOpen && (
        <Modal open={isOpen} onClose={handleClose}>
          <Box style={style}>
            <h1 className={headerClasses} style={{ top: "-25px" }}>
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
                <p className="text-justify">{response.extractedContent}</p>
              )}
            </div>
            <div className="Summary_Container mt-10">
              <h3 className="font-semibold inline-block">Brief Summary:</h3>
              <p className="text-justify">{response.summaryData}</p>
            </div>
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
          </Box>
        </Modal>
      )}

      <Button className={btnClasses} onClick={handleOpen}>
        Generate Summary
      </Button>
    </>
  );
}
