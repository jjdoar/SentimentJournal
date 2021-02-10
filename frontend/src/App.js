import "./App.css";
import EntrySubmitter from "./EntrySubmitter";
import EntryViewer from "./EntryViewer";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { Button, Box } from "@material-ui/core";

import "react-calendar/dist/Calendar.css";

function App() {
  const [value, onChange] = useState(new Date());
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
      <Link to="/entry">
        <Button>New</Button>
      </Link>
      <Calendar onChange={onChange} value={value} />
      <EntryViewer date={value}/>
    </div>
  );
}

export default App;
