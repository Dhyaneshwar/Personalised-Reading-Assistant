"use client";
import ConsentForm from "@/components/ConsentForm";
import ContentPage from "@/components/Content";
import EyeTracker from "@/components/EyeTracker";
import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import { contents } from "@/lib/data";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function ContentContainer() {
  const { contentId } = useParams();
  const { title, content } = contents.find(({ id }) => id === contentId);
  const [isConsentOpen, setIsConsentOpen] = useState(true);

  const handleConsentClose = () => setIsConsentOpen(false);

  if (isConsentOpen) {
    return (
      <>
        <ConsentForm isOpen={isConsentOpen} handleClose={handleConsentClose} />
        <HeaderBar title={title} />
        <ContentPage content={content} />
        <Footer />
      </>
    );
  }
  return (
    <>
      <HeaderBar title={title} />
      <EyeTracker />
      <ContentPage content={content} />
      <Footer />
    </>
  );
}

export default ContentContainer;
