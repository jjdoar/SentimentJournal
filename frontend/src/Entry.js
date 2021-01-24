import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";

function Entry() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const current = new Date();
  const date = `${
    monthNames[current.getMonth()]
  } ${current.getDate()}, ${current.getFullYear()}`;

  const time = `${current.getHours() % 12}:${current.getMinutes()} ${
    current.getHours() >= 12 ? "PM" : "AM"
  }`;

  const [value, setValue] = useState("");

  const onChangeEvent = (event) => {
    setValue(event.target.value);
  };

  const onHeightChangeEvent = (height) => {
    console.log("height", height);
  };

  return (
    <div className="Entry">
      <h4>Today is {date}</h4>
      <p>{time}</p>
      <div>
        <TextareaAutosize
          rowsMin={5}
          cols={60}
          placeholder="Insert Journal entry here"
          onChange={onChangeEvent}
          onHeightChange={onHeightChangeEvent}
        />
      </div>
      <Button color="primary">Submit</Button> <br />
      <span>{value}</span>
    </div>
  );
}

export default Entry;
