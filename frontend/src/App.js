import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@material-ui/core";
import CustomCalendar from "./Calendar";

function App() {

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <Link to="/entrySubmitter">
        <Button>New</Button>
      </Link>

      <CustomCalendar />
    </div>
  );
}

export default App;
