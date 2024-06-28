import React from "react";
import { aboutContent, topics } from "@/lib/data";
import HeaderBar from "@/components/HeaderBar";
import CardContainer from "@/components/CardContainer/CardContainer";
import AboutPage from "@/components/About";

function HomePage() {
  return (
    <>
      <HeaderBar />
      <div className="w-[95vw] text-center mx-auto p-5 bg-slate-100">
        <AboutPage title="Home Page" paras={aboutContent} />
        <CardContainer cardTitle="Topics" cardContent={topics} />
      </div>
    </>
  );
}

export default HomePage;
