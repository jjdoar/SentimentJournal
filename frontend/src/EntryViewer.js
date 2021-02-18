import "./styles.css";
import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

function EntryViewer(props) {

  function onChange(value) {
    setValue(value);
  }
  const [value, setValue] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState({});

  // send GET request
  // console.log(props.date);

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

  // var tempEntries = {
  //   0:{
  //     content: "hello world",
  //     date: "2021-02-18",
  //     score: 0.8,
  //     time: "06:48:05.385405",
  //     userId: 1,
  //     },
  //   1:{
  //     content: "goodbye world",
  //     date: "2021-02-17",
  //     score: -0.8,
  //     time: "06:48:05.385405",
  //     userId: 1,
  //   }
  // }
  //console.log("This is in temp entries " + tempEntries[0]['date']);
  var moodScore = 0;
  //var moodColor = "rgb(0, 0, 0)";
  // var redScore;
  //var greenScore;

  //THIS CANNOT WORK WITH tileContent()
  //I'm keeping it for when we implement highlighting the current day's entry
  /*for (let entry in tempEntries) {
    moodScore = tempEntries[entry]['score'];
    redScore = 255;
    greenScore = 255;
    if(moodScore >= 0){
      redScore = 255 - Math.floor(255 * moodScore);
    } else{
      greenScore = 255 + Math.floor(255 * moodScore);
    }
    moodColor = "rgb(" + redScore + ", " + greenScore + ", 0)";
  }*/

  function tileClassName({ date, view }) {

    console.log("Inside tileClass journal entries: ", journalEntries);

    // Add class to tiles in month view only
    //console.log("I am being called I am tileContent");
    var editedDate = date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate());

    var listofEntries = [];
    for(let entry in journalEntries){
      listofEntries.push(journalEntries[entry]['date']);
    }
    if (view === 'month') {
      // console.log("I am being called I am tileContent");
      //console.log(listofEntries);
      //console.log(date);
      //console.log(date);
      if (listofEntries.find(dDate => dDate == editedDate)) {
        // console.log("I am being called I am tileContent");
        //I think how I find the same date could be improved
        for(let entry in journalEntries){
          if(editedDate == journalEntries[entry]['date']){
            moodScore = journalEntries[entry]['score'];
            if(moodScore >= 0.5){
              return "green";
            } else if (moodScore < -0.5) {
              return "red";
            } else {
              return "yellow";
            }
          }
        }
      }
    }
  }

  // console.log("Temp entry: ", tempEntries);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8081/v0/journal_entries",
      params: { startDate: beg_date, endDate: end_date, userId: 1 },
    }).then((response) => {
      console.log(response);
      setJournalEntries(response.data);
      // console.log("Journal entries: ", journalEntries);
    });
  });

  return (
    <div>
      <Calendar 
      onChange={onChange} 
      value={value} 
      tileClassName={tileClassName}
      />

      <h2>{props.date.toDateString()}</h2>
      {/* <h1>{JSON.stringify(entries)}</h1> */}
    </div>
  );
}

// GET request for some period of time

// Put journal entries in some data structure

// Display entry for the selected date

export default EntryViewer;
