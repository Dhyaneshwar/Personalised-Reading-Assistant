import React from "react";
import CardTitle from "./CardContainer/CardTitle";

function AboutPage({ title }) {
  return (
    <>
      <CardTitle cardTitle="About" />
      <p>Welcome to {title}</p>
    </>
  );
}

export default AboutPage;
