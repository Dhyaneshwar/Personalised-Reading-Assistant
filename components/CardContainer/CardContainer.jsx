import React from "react";
import classes from "./CardContainer.module.css";
import Link from "next/link";
import { contents } from "@/lib/data";
import CardTitle from "./CardTitle";

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
        <ul className="list-inside list-disc text-justify">
          {con.map((c, index) => (
            <li key={index}>
              <span className={`${classes.Card_Content_List}`}>{c.title}</span>
            </li>
          ))}
        </ul>
      );
    }
    const con = cardContent.find(({ id }) => id === cid);
    return (
      <p className={`${classes.Card_Content_Description}`}>{con.content}</p>
    );
  };
  return (
    <>
      <CardTitle cardTitle={cardTitle + " Available"} />
      <div className="mx-auto grid w-[90%] auto-rows-auto grid-cols-3 gap-11">
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
              <h3 className={`${classes.Card_Back_Heading}`}>{title}</h3>
              <div className={`${classes.Card_Content_Container}`}>
                {displayContents(id)}
              </div>
              <Link
                className={`${classes.Btn} ${classes.Btn_White}`}
                href={`${pathName}/${id}`}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardContainer;
