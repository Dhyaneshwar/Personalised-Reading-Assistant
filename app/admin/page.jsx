"use client";
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
      <div className="w-[95vw] h-[92vh] text-center mx-auto p-5 bg-slate-100 text-xl">
        <div className="Delete_All_Data_Container w-full h-[25vh] bg-red-300 mb-5 flex items-center justify-center rounded-xl flex-col">
          <div className="Delete_All_Data flex justify-center items-center gap-8">
            <p>
              To Delete All the collected data from the database click this
              button =&gt;
            </p>
            <button
              className="capitalize text-2xl mb-5 px-4 py-1 rounded-md bg-slate-500 border border-blue-400"
              onClick={deleteAllDataHandler}
            >
              Delete All Data
            </button>
          </div>
          <p className="Delete_All_Data_Response capitalize text-green-700  mt-4 p-2 rounded-lg inline-block bg-white font-bold">
            {deleteAllDataResponse}
          </p>
        </div>
        <div className="Delete_Last_Participant_Container  w-full h-[25vh] bg-red-300 mb-5 flex items-center justify-center rounded-xl flex-col">
          <div className="Delete_Last_Participant flex justify-center items-center gap-8">
            <p>
              To Delete All the data of last participant from the database click
              this button =&gt;
            </p>
            <button
              className="capitalize text-2xl mb-5 px-4 py-1 rounded-md bg-slate-500 border border-blue-400"
              onClick={deleteLastDataHandler}
            >
              Delete last participant data
            </button>
          </div>
          <p className="Delete_Last_Participant_Response capitalize text-green-700  mt-4 p-2 rounded-lg inline-block bg-white font-bold">
            {deleteLastDataResponse}
          </p>
        </div>
        <div className="Delete_Specific_Data_Container  w-full h-[25vh] bg-red-300 mb-5 flex items-center justify-center rounded-xl flex-col">
          <div className="Delete_Specific_Data flex justify-center items-center gap-8">
            <p>
              To Delete All the data of{" "}
              <input
                ref={inputRef}
                type="number"
                min={0}
                className="w-16 ml-1 mr-3 p-1 border border-gray-600"
              />
              from the database click this button =&gt;
            </p>
            <button
              className="capitalize text-2xl mb-5 px-4 py-1 rounded-md bg-slate-500 border border-blue-400"
              onClick={deleteMentionedDataHandler}
            >
              Delete Mentioned Data
            </button>
          </div>
          <p className="Delete_Specific_Data_Response capitalize text-green-700 mt-4 p-2 rounded-lg inline-block bg-white font-bold">
            {deleteMentionedDataResponse}
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
