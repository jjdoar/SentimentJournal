import "./App.css";
import EntrySubmitter from "./EntrySubmitter";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Box from '@material-ui/core/Box';
import "react-calendar/dist/Calendar.css";

function App() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="App">
      <Calendar onChange={onChange} value={value} />
      <EntrySubmitter></EntrySubmitter>
      <Box>This Is Where The Return Text Will Be</Box>
    </div>
  );
}

export default App;
