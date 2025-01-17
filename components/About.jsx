import React from "react";
import CardTitle from "./CardContainer/CardTitle";
import _ from "lodash";

function AboutPage({ title = "About", paras = [] }) {
  return (
    <>
      <CardTitle cardTitle={title} />
      {paras.map((para, index) => {
        if (!_.isString(para)) {
          return para;
        }
        return (
          <div key={index} className="">
            <p className="px-10 text-justify">{para}</p>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default AboutPage;
