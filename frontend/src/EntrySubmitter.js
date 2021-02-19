import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextareaAutosize } from "@material-ui/core";
import axios from "axios";

function EntrySubmitter() {

  const getTimeandDate = () => {
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

    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    const current = new Date();
    const hour = current.getHours() % 12;
    const minute = addZero(current.getMinutes());
    const time = `${hour}:${minute} ${
      current.getHours() >= 12 ? "PM" : "AM"
    }`;
    const date = `${
      monthNames[current.getMonth()]
    } ${current.getDate()}, ${current.getFullYear()}`;

    return [time, date];
  }

  // needs to made into its own component
  const getDates = (date) => {
    var pad = (num) => ("00" + num).slice(-2);
    var begin_date = date;
    begin_date =
        begin_date.getUTCFullYear() +
        "-" +
        pad(begin_date.getUTCMonth() + 1) +
        "-" +
        pad(begin_date.getUTCDate());

    var end_date = date;
    end_date = 
        end_date.getUTCFullYear() +
        "-" +
        pad(end_date.getUTCMonth() + 1) +
        "-" +
        pad(end_date.getUTCDate());

    return [begin_date, end_date];
  }

  const [value, setValue] = useState("");

  const onChangeEvent = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8081/v0/journal_entries",
      params: { startDate: getDates(new Date())[0], endDate: getDates(new Date())[1], userId: 1 },
    }).then((response) => {
      if (typeof(response.data[0]) !== "undefined") {
        setValue(response.data[0].content);
      }
    })
  }, [])

  function submitEntry(value) {
    const userId = "1";
    // const date = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate()
    const currentDate = new Date();
    // Send PUT request to the backend
    axios({
      method: "PUT",
      url: "http://localhost:8081/v0/journal_entries",
      data: { "date": currentDate.toISOString().substring(0,10), "userId": userId, "content": value },
    }).then((response) => {
      console.log(response);
    });
    // Fix Cross origin resource sharing
  }

  return (
    <div>
      <h4>Today is {getTimeandDate()[1]}</h4>
      <p>{getTimeandDate()[0]}</p>
      <div>
        <TextareaAutosize
          rowsMin={5}
          cols={60}
          placeholder="Insert Journal entry here"
          onChange={onChangeEvent}
          defaultValue={value}
        />
        <br />
        <Link to="/">
          <Button color="primary" onClick={() => submitEntry(value)}>
            Submit
          </Button>
        </Link>{" "}
        <Link to="/">
          <Button color="primary">Back</Button>
        </Link>
        <br />
      </div>
    </div>
  );
}

export default EntrySubmitter;
