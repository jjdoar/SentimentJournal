import "./App.css";
import Entry from "./Entry";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@material-ui/core";

function App() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="App">
      <Calendar onChange={onChange} value={value} />
      <Button>+</Button>
    </div>
  );
}

export default App;
