import React from "react";
import { formatDateObj, getFirstDayofMonth, getLastDayofMonth } from "./util";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";

function EntryDelete(props) {
  const { inputs } = useAuth();
  const date = props.date;
  const entries = props.entries;
  const retrieveJournalEntries = props.retrieveJournalEntries;

  function resetColor() {
    for (let entry in entries) {
      var cellColor = "rgb(255, 255, 255)";
      document.getElementById(
        entries[entry]["date"]
      ).style.background = cellColor;
    }
  }

  function deleteJournalEntries(beg_date, end_date) {
    axios({
      method: "DELETE",
      url: "http://0.0.0.0:8081/v0/journal_entries",
      params: { startDate: beg_date, endDate: end_date, userId: inputs.uid },
    }).then((response) => {
      retrieveJournalEntries(beg_date, end_date);
      resetColor();
    });
  }

  const styling = {
    backgroundColor: "white",
    border: "2px solid",
  };

  if (entries.length !== 0) {
    return (
      <Button
        style={styling}
        color="primary"
        onClick={() =>
          deleteJournalEntries(
            getFirstDayofMonth(date),
            getLastDayofMonth(date)
          )
        }
      >
        Delete
      </Button>
    );
  } else {
    return null;
  }
}

export default EntryDelete;
