import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TheLeafMansion from "../pages/TheLeafMansion";
import TheLeafPlatinum from "../pages/TheLeafPlatinum";
import TheLeafResidence from "../pages/TheLeafResidence";

const Router = () => {
  return (
    <Routes>
      <Route path="/TLM" element={<TheLeafMansion/>} />
      <Route path="/TLP" element={<TheLeafPlatinum />} />
      <Route path="/TLR" element={<TheLeafResidence />} />
      <Route path="/" element={<Navigate to="/TLM" />} />
    </Routes>
  );
};

export default Router;
