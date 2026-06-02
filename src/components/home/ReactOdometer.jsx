import React, { useEffect, useRef } from "react";
import Odometer from "odometer";
// import "./Odometer.css";

const ReactOdometer = ({ value }) => {
  const odometerRef = useRef(null);

  useEffect(() => {
    odometerRef.current = new Odometer({
      el: document.getElementById("odometer"),
      value: 0,
      format: "(,ddd)",
      theme: "digital",
      duration: 2000,
    });
    odometerRef.current.update(value);
  }, []);

  useEffect(() => {
    if (odometerRef.current) {
      odometerRef.current.update(value);
    }
  }, [value]);

  return <div id="odometer"></div>;
};

export default ReactOdometer;
