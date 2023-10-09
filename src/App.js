import React, { useState, useEffect, Fragment } from "react";


import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Layout from "./components/layout/Layout";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if(token) {
      setShowLayout(true);
    } else {
      setShowLayout(false);
    }
  })

  return (
    <Fragment>
      <BrowserRouter>
        <Layout setShowLayout={setShowLayout} showLayout={showLayout} />

        <Routes>
          <Route path="/" element={<Login setShowLayout={setShowLayout} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
