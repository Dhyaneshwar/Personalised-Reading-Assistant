import { style } from "@/utils/modalStyles";
import { Box, Modal } from "@mui/material";
import Link from "next/link";
import React, { useRef } from "react";
import classes from "./CardContainer/CardContainer.module.css";

function ConsentForm({ isOpen, handleClose }) {
  const checkBox = useRef();

  const acceptConsentHandler = () => {
    if (checkBox.current.checked) {
      handleClose();
    }
  };

  return (
    <Modal open={isOpen}>
      <Box style={style}>
        <h1
          className="sticky mb-3 ml-[-50px] mt-[-25px] w-[110%] bg-white p-4 text-center text-3xl font-semibold"
          style={{ top: "-25px" }}
        >
          Consent Form
        </h1>
        <div className="Consent_Para text-justify">
          <p>
            We will use WebGazer to collect gaze point data while you read text
            on your screen. This gaze point data will help us understand which
            words or sections of text you focus on, allowing us to create
            personalized summaries and questions to improve your reading
            experience.
          </p>
          <br />
          <ul className="list-inside list-disc text-justify">
            <span className="text-2xl font-bold">
              Types of Data Collected:{" "}
            </span>
            <li>
              <span className="font-bold">Sequential Eye Gaze Data: </span>
              Numerical coordinates of eye positions
            </li>
            <li>
              <span className="font-bold">Timestamp Data: </span>Time at which
              each gaze point is recorded
            </li>
          </ul>
          <br />
          <div>
            <ul className="list-inside list-disc text-justify">
              <span className="text-2xl font-bold">Privacy Measures:</span>
              <li>
                <span className="font-bold">No Raw Video Data: </span>It is
                important to note that no images or pictures of you will be
                taken during this process; only the gaze point data will be
                fetched for mapping with the words you read on the screen.
              </li>
              <li>
                <span className="font-bold">Confidentiality: </span>All
                responses will remain confidential and will be used solely for
                research purposes.
              </li>
              <li>
                <span className="font-bold">Anonymization:</span> Your data will
                be anonymized to protect your identity.
              </li>
              <li>
                <span className="font-bold">No Personal Information: </span>Your
                name or Gmail details will not be recorded.
              </li>
            </ul>
          </div>
          <br />
          <div>
            <p>
              We adhere to strict ethical standards to ensure your privacy and
              data security. Participation in this survey is voluntary, and you
              may withdraw at any time without any consequence.
            </p>
          </div>
        </div>
        <br />

        <div>
          <input
            type="checkbox"
            id="consent"
            name="consent"
            className="mr-5"
            ref={checkBox}
          />
          <label for="consent">I have read everything</label>
        </div>
        <footer className="mt-8 flex justify-center gap-10 text-center">
          <button
            className={`${classes.Btn} ${classes.Btn_Green} w-24`}
            onClick={acceptConsentHandler}
          >
            Yes
          </button>
          <Link className={`${classes.Btn} ${classes.Btn_Red} w-24`} href="/">
            No
          </Link>
        </footer>
      </Box>
    </Modal>
  );
}

export default ConsentForm;
