import React from "react";
import classes from "./CardContainer.module.css";

function CardTitle({ cardTitle }) {
  return (
    <div className={classes.Card_Title}>
      <span className={classes.Card_Title_Span}>{cardTitle}</span>
    </div>
  );
}

export default CardTitle;
