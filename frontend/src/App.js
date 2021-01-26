import "./App.css";
import EntrySubmitter from "./EntrySubmitter";
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

      <Box>This Is Where The Return Text Will Be</Box>
    </div>
  );
}

export default App;
