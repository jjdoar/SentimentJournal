import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";
import axios from "axios";

function EntryViewer(props) {
  var date = props.date;
  const date_a =
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2);

  const date_b =
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + (date.getUTCDate() + 1)).slice(-2);


  axios({
    method: "GET",
    url: "http://127.0.0.1:8081/v0/journal_entries",
    params: { 'startDate': date_a, "endDate": date_b, "userID": 1 },
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });

  return (
    <h2>{date_a}</h2>

  );
}

export default EntryViewer;