import React from "react";
import CardTitle from "./CardContainer/CardTitle";
import _ from "lodash";

function AboutPage({ title, paras = [] }) {
  return (
    <>
      <CardTitle cardTitle="About" />
      {paras.map((para, index) => {
        if (!_.isString(para)) {
          return para;
        }
        return (
          <div key={index} className="">
            <p className="text-justify px-10">{para}</p>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default AboutPage;
