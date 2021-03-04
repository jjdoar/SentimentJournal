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
    const colorCells = props.colorCells;

    function resetColor() {
      for (let entry in entries) {
        var cellColor = "rgb(255, 255, 255)";
        document.getElementById(
          entries[entry]["date"]
        ).style.background = cellColor;
      }
    }

    function deleteJournalEntries(date) {
      const formattedDate = formatDateObj(date);
      console.log(date)
        axios({
          method: "DELETE",
          url: "http://0.0.0.0:8081/v0/journal_entries",
          params: { startDate: formattedDate, endDate: formattedDate, userId: inputs.uid },
        }).then((response) => {
          retrieveJournalEntries(getFirstDayofMonth(date), getLastDayofMonth(date));
          resetColor();
        })
      }

    if (entries.length !== 0) {
        return (
            <Button color="primary" onClick={() => deleteJournalEntries(date)}>
            Delete
            </Button>
        );
    } else {
        return null;
    }
}

export default EntryDelete;
