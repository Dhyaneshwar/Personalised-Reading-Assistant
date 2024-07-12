import { topics } from "@/lib/data";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex h-80 w-full items-center justify-center bg-slate-800 text-white">
      <div className="grid h-[65%] w-[75%] grid-cols-6 grid-rows-4 place-content-stretch gap-2">
        <div className="col-start-1 col-end-4 bg-green-700">
          <Link
            className="flex size-full items-center justify-center text-center"
            href="/"
          >
            Home
          </Link>
        </div>
        <div className="col-span-3 col-end-7 bg-green-700">
          <Link
            className="flex size-full items-center justify-center text-center"
            href="calibrate/"
          >
            Calibrate
          </Link>
        </div>
        {topics.map(({ id, title }) => (
          <div className="bg-green-700" key={id}>
            <Link
              className="flex size-full items-center justify-center text-center"
              href={`/${id}`}
            >
              {title}
            </Link>
          </div>
        ))}

        <div className="col-start-1 col-end-4 bg-green-700">
          <Link
            className="flex size-full items-center justify-center text-center"
            href="mailto:dhyaneshwar98@gmail.com"
          >
            Feedback
          </Link>
        </div>
        <div className="col-span-3 col-end-7 bg-green-700">
          <Link
            className="flex size-full items-center justify-center text-center"
            href="mailto:dhyaneshwar98@gmail.com"
          >
            Contact Me
          </Link>
        </div>
        <div className="col-start-1 col-end-7 flex items-center justify-center text-center">
          &copy; Copyrights 2024 Dhyaneshwar Nagarajan
        </div>
      </div>
    </div>
  );
}

export default Footer;
