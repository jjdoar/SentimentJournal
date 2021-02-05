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
    pad(beg_date.getUTCDate());

  console.log(beg_date);

  var end_date = props.date;
  end_date =
    end_date.getUTCFullYear() +
    "-" +
    pad(end_date.getUTCMonth() + 1) +
    "-" +
    pad(end_date.getUTCDate() + 1);

  console.log(end_date);

  // axios.post("http://127.0.0.1:8081/v0/journal_entries", {
  //   "startDate": beg_date,
  //   "endDate": end_date,
  //   "userId": 1,
  //   method: "GET"
  // }).then(response => {
  //   this.posts = response.data;
  // }).catch(err => {
  //   console.log(err);
  // });

  axios({
    method: "GET",
    url: "http://127.0.0.1:8081/v0/journal_entries",
    params: { startDate: beg_date, endDate: end_date, userId: 1 },
  }).then((response) => {
    console.log(response);
  });


  return (
    <div>
      <h2>{props.date.toDateString()}</h2>
      {/* <h1>{JSON.stringify(entries)}</h1> */}
    </div>
  );
}

// GET request for some period of time

// Put journal entries in some data structure

// Display entry for the selected date

export default EntryViewer;
