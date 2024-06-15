import Script from "next/script";

export const metadata = {
  title: "Calibration Page",
  description:
    "The aim of this application is to enhance readers reading proficiency and help improve their reading gains.",
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
