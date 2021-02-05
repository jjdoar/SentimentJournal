import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";
import axios from "axios";

function EntryViewer(props) {
  // send GET request
  console.log(props.date);

  var pad = function (num) {
    return ("00" + num).slice(-2);
  };
  var beg_date = props.date;
  beg_date =
    beg_date.getUTCFullYear() +
    "-" +
    pad(beg_date.getUTCMonth() + 1) +
    "-" +
    pad(beg_date.getUTCDate()) +
    " " +
    pad(0) +
    ":" +
    pad(beg_date.getUTCMinutes()) +
    ":" +
    pad(beg_date.getUTCSeconds());

  console.log(beg_date);

  var end_date = props.date;
  end_date =
    end_date.getUTCFullYear() +
    "-" +
    pad(end_date.getUTCMonth() + 1) +
    "-" +
    pad(end_date.getUTCDate()) +
    " " +
    pad(23) +
    ":" +
    pad(59) +
    ":" +
    pad(59);

  console.log(end_date);

  const entries = axios
    .get("http://127.0.0.1:8081/v0/journal_entries", {
      params: {
        startDate: beg_date,
        endDate: end_date,
        userId: "1",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <h2>{props.date.toDateString()}</h2>
      <h1>{JSON.stringify(entries)}</h1>
    </div>
  );
}

// GET request for some period of time

// Put journal entries in some data structure

// Display entry for the selected date

export default EntryViewer;
