import React from "react";
import classes from "./CardContainer.module.css";
import Link from "next/link";
import { contents } from "@/lib/data";

function CardContainer({ cardTitle, cardContent, pathName = "" }) {
  const getDynamicStyles = (index, img) => {
    const gradients = [
      "linear-gradient(to bottom right, #ffb900, #ff7730)",
      "linear-gradient(to bottom right, #7ed56f, #28b485)",
      "linear-gradient(to bottom right, #2998ff, #5643fa)",
    ];
    const gradient = gradients[index % 3];
    if (img) {
      return {
        backgroundImage: `${gradient}, url(${img})`,
      };
    }

    return {
      backgroundImage: `${gradient}`,
    };
  };

  const displayContents = (cid) => {
    if (cardTitle === "Topics") {
      const con = contents.filter(({ topicId }) => topicId === cid);
      return (
        <ul className="list-disc">
          {con.map((c, index) => (
            <li key={index}>
              <p className={`${classes.Card_Price_Only}`}>{c.title}</p>
            </li>
          ))}
        </ul>
      );
    }
    const con = cardContent.find(({ id }) => id === cid);
    return <p className={`${classes.Card_Price_Con}`}>{con.content}</p>;
  };
  return (
    <>
      <h2 className="text-4xl mb-6 text-left w-full underline underline-offset-8 decoration-double">
        {cardTitle} Available
      </h2>
      <div className="w-full grid grid-cols-3 auto-rows-auto gap-11">
        {cardContent.map(({ id, title, img }, index) => (
          <div className={`${classes.Card}`} key={index}>
            <div className={`${classes.Card_Side} ${classes.Card_Side_Front}`}>
              <div
                className={`${classes.Card_Picture}`}
                style={getDynamicStyles(index, img)}
              ></div>
              <h4
                className={`${classes.Card_Heading}`}
                style={{
                  fontSize: `${cardTitle === "Topics" ? "2.5rem" : "1.15rem"}`,
                }}
              >
                <span
                  className={`${classes.Card_Heading_Span}`}
                  style={{
                    ...getDynamicStyles(index),
                    padding: `${
                      cardTitle === "Topics" ? "1rem 1.5rem" : "0.35rem 1.5rem"
                    } `,
                  }}
                >
                  {title}
                </span>
              </h4>
            </div>
            <div
              className={`${classes.Card_Side} ${classes.Card_Side_Back}`}
              style={getDynamicStyles(index)}
            >
              <div className={`${classes.Card_Cta}`}>
                <div className={`${classes.Card_Price_Box}`}>
                  {displayContents(id)}
                </div>
                <Link
                  className={`${classes.Btn} ${classes.Btn_White}`}
                  href={`${pathName}/${id}`}
                >
                  Navigate to {title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardContainer;
