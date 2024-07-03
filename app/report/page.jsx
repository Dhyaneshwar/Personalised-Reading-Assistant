"use client";
import AboutPage from "@/components/About";
import ContentPage from "@/components/Content";
import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import ReportTable from "@/components/ReportTable";
import { contents, topics } from "@/lib/data";
import {
  columnDetailsAbout,
  defaultPrompt,
  detailedReportAbout,
  detailedReportColumn,
  maxFixationWordsPerSentenceAbout,
  maxFixationWordsPerSentenceColumn,
  maxTimeWordsPerSentenceAbout,
  maxTimeWordsPerSentenceColumn,
  saccadeDetailedReportAbout,
  saccadeDetailedReportColumn,
} from "@/utils/reportColumns";
import _ from "lodash";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

function ReportPage() {
  const initialResponse = useMemo(
    () => ({
      batch: { batchNumber: 0 },
      detailedReport: [],
      maxFixationWordsPerSentence: [],
      maxTimeWordsPerSentence: [],
      saccadeDetailedReport: [],
    }),
    []
  );
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const contentId = searchParams.get("contentId");
  const [response, setResponse] = useState(initialResponse);
  const [isLoading, setIsLoading] = useState(false);

  const { title: topicTitle } = topics.find(({ id }) => id === topicId);
  const { title: contentTitle, content } = contents.find(
    ({ id }) => id === contentId
  );

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      const { webgazer } = window || {};
      const { lines = [], wordAtPixel = [], wordReadAt = [] } = webgazer || {};

      const prompt = {
        topicId,
        contentId,
        originalLines: lines,
        gazeContent: wordAtPixel.join(" "),
        wordReadTime: wordReadAt,
      };

      //   const prompt = defaultPrompt
      try {
        const resp = await fetch("/api/assistant/analyse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prompt),
        });

        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }

        const reportDetails = await resp.json();
        setResponse(reportDetails);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
        return null;
      }
      setIsLoading(false);
    };
    fetchReport();
  }, []);

  if (isLoading || _.isEmpty(response.detailedReport)) {
    return (
      <>
        <HeaderBar title="Report Page" />
        <div className="w-[95vw] text-center mx-auto p-5 bg-slate-100">
          <div className="Acknowledgement_Container">
            <p>Please wait your data is currently being processed</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderBar title="Report Page" />
      <div className="w-[95vw] text-center mx-auto p-5 bg-slate-100">
        <div className="Acknowledgement_Container">
          <p>
            Thank you for participating in this study. Your unique participation
            ID is {response?.batch?.batchNumber}.
          </p>
        </div>
        <AboutPage
          title="Content read"
          paras={[
            <div key={1}>
              The report is generated based on the{" "}
              <bold className="font-bold">{contentTitle}</bold> content which
              belongs to <bold className="font-bold">{topicTitle}</bold>.
            </div>,
          ]}
        />
        <ContentPage content={content} displayButton={false} />
        <AboutPage title="Column Details" paras={[columnDetailsAbout]} />
        <div className="Detailed_Report_Container">
          <ReportTable
            title="Detailed Report"
            paras={detailedReportAbout}
            rows={response.detailedReport}
            columns={detailedReportColumn}
            width="85%"
          />
        </div>
        <div className="Time_Per_Word_Container">
          <ReportTable
            title="Top 3 Word in each sentence for which max time was spent"
            paras={maxTimeWordsPerSentenceAbout}
            rows={response.maxTimeWordsPerSentence}
            columns={maxTimeWordsPerSentenceColumn}
          />
        </div>
        <div className="Fixation_Per_Word_Container">
          <ReportTable
            title="Top 3 Word in each sentence which was fixated many times"
            paras={maxFixationWordsPerSentenceAbout}
            rows={response.maxFixationWordsPerSentence}
            columns={maxFixationWordsPerSentenceColumn}
          />
        </div>
        <div className="Saccade_Container">
          <ReportTable
            title="Saccade for Each Sentence"
            paras={saccadeDetailedReportAbout}
            rows={response.saccadeDetailedReport}
            columns={saccadeDetailedReportColumn}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReportPage;
