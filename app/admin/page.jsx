"use client";
import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import React, { useRef, useState } from "react";

function AdminPage() {
  const [deleteAllDataResponse, setDeleteAllDataResponse] = useState("");
  const [deleteLastDataResponse, setDeleteLastDataResponse] = useState("");
  const [deleteMentionedDataResponse, setDeleteMentionedDataResponse] =
    useState("");
  const inputRef = useRef();

  const deleteAllDataHandler = async () => {
    try {
      const resp = await fetch("/api/mongodb", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "all" }),
      });

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await resp.json();
      setDeleteAllDataResponse(response);
      setDeleteLastDataResponse("");
      setDeleteMentionedDataResponse("");
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      return null;
    }
  };

  const deleteLastDataHandler = async () => {
    try {
      const resp = await fetch("/api/mongodb", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "last" }),
      });

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const response = await resp.json();
      setDeleteAllDataResponse("");
      setDeleteLastDataResponse(response);
      setDeleteMentionedDataResponse("");
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      return null;
    }
  };

  const deleteMentionedDataHandler = async () => {
    try {
      const batchNumber = Number(inputRef.current.value);
      if (batchNumber) {
        const resp = await fetch("/api/mongodb", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "specific", batchNumber }),
        });

        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        const response = await resp.json();
        setDeleteAllDataResponse("");
        setDeleteLastDataResponse("");
        setDeleteMentionedDataResponse(response);
      }
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      return null;
    }
  };

  return (
    <>
      <HeaderBar title="Admin Page" />
      <div className="mx-auto w-[95vw] bg-slate-100 p-5 text-center text-xl">
        <div className="Delete_All_Data_Container mb-5 flex h-[25vh] w-full flex-col items-center justify-center rounded-xl bg-red-300">
          <div className="Delete_All_Data flex items-center justify-center gap-8">
            <p>
              To Delete All the collected data from the database click this
              button =&gt;
            </p>
            <button
              className="mb-5 rounded-md border border-blue-400 bg-slate-500 px-4 py-1 text-2xl capitalize"
              onClick={deleteAllDataHandler}
            >
              Delete All participant Data
            </button>
          </div>
          <p className="Delete_All_Data_Response mt-4 inline-block rounded-lg bg-white p-2 font-bold capitalize text-green-700">
            {deleteAllDataResponse}
          </p>
        </div>
        <div className="Delete_Last_Participant_Container mb-5 flex h-[25vh] w-full flex-col items-center justify-center rounded-xl bg-red-300">
          <div className="Delete_Last_Participant flex items-center justify-center gap-8">
            <p>
              To Delete All the data of last participant from the database click
              this button =&gt;
            </p>
            <button
              className="mb-5 rounded-md border border-blue-400 bg-slate-500 px-4 py-1 text-2xl capitalize"
              onClick={deleteLastDataHandler}
            >
              Delete last participant data
            </button>
          </div>
          <p className="Delete_Last_Participant_Response mt-4 inline-block rounded-lg bg-white p-2 font-bold capitalize text-green-700">
            {deleteLastDataResponse}
          </p>
        </div>
        <div className="Delete_Specific_Data_Container mb-5 flex h-[25vh] w-full flex-col items-center justify-center rounded-xl bg-red-300">
          <div className="Delete_Specific_Data flex items-center justify-center gap-8">
            <p>
              To Delete All the data of{" "}
              <input
                ref={inputRef}
                type="number"
                min={0}
                className="ml-1 mr-3 w-16 border border-gray-600 p-1"
              />
              from the database click this button =&gt;
            </p>
            <button
              className="mb-5 rounded-md border border-blue-400 bg-slate-500 px-4 py-1 text-2xl capitalize"
              onClick={deleteMentionedDataHandler}
            >
              Delete Mentioned participant Data
            </button>
          </div>
          <p className="Delete_Specific_Data_Response mt-4 inline-block rounded-lg bg-white p-2 font-bold capitalize text-green-700">
            {deleteMentionedDataResponse}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminPage;
