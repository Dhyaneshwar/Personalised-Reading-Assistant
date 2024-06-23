"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { btnClasses, headerClasses, style } from "@/utils/modalStyles";

export default function QuestionModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box style={style}>
            <h1 className={headerClasses}>Question</h1>
            <p>{window?.webgazer?.wordAtPixel?.join(" ")}</p>
          </Box>
        </Modal>
      )}

      <Button className={btnClasses} onClick={handleOpen}>
        Generate Question
      </Button>
    </>
  );
}
