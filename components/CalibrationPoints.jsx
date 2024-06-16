"use client";
import React from "react";

function CalibrationPointsPage() {
  const points = [
    { id: 1, style: { top: "70px", left: "2vw" }, clickCount: 0 },
    { id: 2, style: { top: "70px", left: "35vw" }, clickCount: 0 },
    { id: 3, style: { top: "70px", left: "65vw" }, clickCount: 0 },
    { id: 4, style: { top: "70px", right: "2vw" }, clickCount: 0 },
    { id: 5, style: { top: "35vh", left: "2vw" }, clickCount: 0 },
    { id: 6, style: { top: "35vh", left: "35vw" }, clickCount: 0 },
    { id: 7, style: { top: "35vh", left: "65vw" }, clickCount: 0 },
    { id: 8, style: { top: "35vh", right: "2vw" }, clickCount: 0 },
    { id: 9, style: { top: "65vh", left: "2vw" }, clickCount: 0 },
    { id: 10, style: { top: "65vh", left: "35vw" }, clickCount: 0 },
    { id: 11, style: { top: "65vh", left: "65vw" }, clickCount: 0 },
    { id: 12, style: { top: "65vh", right: "2vw" }, clickCount: 0 },
    { id: 13, style: { bottom: "2vw", left: "2vw" }, clickCount: 0 },
    { id: 14, style: { bottom: "2vw", left: "35vw" }, clickCount: 0 },
    { id: 15, style: { bottom: "2vw", left: "65vw" }, clickCount: 0 },
    { id: 16, style: { bottom: "2vw", right: "2vw" }, clickCount: 0 },
    { id: 17, style: { top: "50vh", left: "50vw" }, clickCount: 0 },
  ];

  const handleCalibrationPoints = (id, element) => {
    points.forEach((point) => {
      if (point.id === id) {
        return { ...point, clickCount: point.clickCount++ };
      }
      return point;
    });

    const point = points.find(({ id: pid }) => pid === id);

    if (point.clickCount == 10) {
      element.target.style.setProperty("background-color", "yellow");
      element.target.setAttribute("disabled", "disabled");
    } else if (point.clickCount < 10) {
      const opacity = 0.1 * point.clickCount + 0.1;
      element.target.style.setProperty("opacity", opacity);
    }
  };

  return (
    <>
      {points.map(({ id, style }) => (
        <button
          key={id}
          type="button"
          style={style}
          className="ml-5 size-8 rounded-full bg-red-500 opacity-20 border border-black fixed"
          id={`Pt${id}`}
          onClick={(event) => handleCalibrationPoints(id, event)}
        />
      ))}
    </>
  );
}

export default CalibrationPointsPage;
