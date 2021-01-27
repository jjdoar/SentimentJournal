import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextareaAutosize } from "@material-ui/core";

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
    const userId = "User_name";

    console.log(value);
    console.log(date);
    console.log(userId);

    const url = "";

    // Send PUT request to the backend
    // Change this to use Axios to send the request
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: date, userId: userId, content: value }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
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
