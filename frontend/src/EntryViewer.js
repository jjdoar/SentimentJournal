import React from "react";
import "react-calendar/dist/Calendar.css";
import { formatDateObj } from "./util";

function EntryViewer(props) {
  // Passed in from parent component(EntryCache)
  const date = props.date;
  const entries = props.entries;

  // Returns the journal entry for the given date, empty string if no entry found
  function getEntry(date, entries) {
    var formattedDate = formatDateObj(date);
    for (let entry in entries) {
      if (entries[entry]["date"] === formattedDate) {
        return entries[entry]["content"];
      }
    }
    return "";
  }

  return (
    <div>
      <li>{getEntry(date, entries)}</li>
    </div>
  );
}

export default EntryViewer;
