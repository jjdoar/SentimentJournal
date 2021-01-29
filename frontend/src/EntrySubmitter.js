import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextareaAutosize } from "@material-ui/core";
import axios from "axios";

function EntrySubmitter() {
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

  function submitEntry(value, date) {
    const userId = "TestId";

    console.log(date);
    console.log(userId);
    console.log(value);

    // Send PUT request to the backend
    axios({
      method: 'PUT',
      url: 'http://127.0.0.1:8081/v0/journal_entries',
      data: { date: date, userId: userId, content: value }
    })
    .then((response) => {
      console.log(response);
    });
  }

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
        <br />
        <Button color="primary" onClick={() => submitEntry(value, date)}>
          Submit
        </Button>{" "}
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <br />
      </div>
      {/* <span>{value}</span> */}
    </div>
  );
}

export default EntrySubmitter;
