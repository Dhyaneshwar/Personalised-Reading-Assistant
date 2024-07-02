import { topics } from "@/lib/data";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full h-80 bg-slate-800 flex justify-center items-center text-white">
      <div className="w-[75%] h-[65%] grid grid-cols-6 grid-rows-4 place-content-stretch gap-2">
        <div className="col-start-1 col-end-4 bg-green-700 ">
          <Link
            className="flex justify-center items-center size-full text-center"
            href="/"
          >
            Home
          </Link>
        </div>
        <div className="col-end-7 col-span-3 bg-green-700">
          <Link
            className="flex justify-center items-center size-full text-center"
            href="calibrate/"
          >
            Calibrate
          </Link>
        </div>
        {topics.map(({ id, title }) => (
          <div className="bg-green-700" key={id}>
            <Link
              className="flex justify-center items-center size-full text-center"
              href={`/${id}`}
            >
              {title}
            </Link>
          </div>
        ))}

        <div className="col-start-1 col-end-4 bg-green-700">
          <Link
            className="flex justify-center items-center size-full text-center"
            href="mailto:dhyaneshwar98@gmail.com"
          >
            Feedback
          </Link>
        </div>
        <div className="col-end-7 col-span-3 bg-green-700">
          <Link
            className="flex justify-center items-center size-full text-center"
            href="mailto:dhyaneshwar98@gmail.com"
          >
            Contact Me
          </Link>
        </div>
        <div className="col-start-1 col-end-7 flex justify-center items-center text-center">
          &copy; Dhyaneshwar Nagarajan
        </div>
      </div>
    </div>
  );
}

export default Footer;
