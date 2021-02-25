import React from "react";
import { getFirstDayofMonth, getLastDayofMonth } from "./util";
import { Button } from "@material-ui/core";
import axios from "axios";

function EntryDelete(props) {
    const date = props.date;
    const entries = props.entries;
    const retrieveJournalEntries = props.retrieveJournalEntries;

    function deleteJournalEntries(beg_date, end_date) {
        axios({
          method: "DELETE",
          url: "http://154.151.49.1509.150:8081/v0/journal_entries",
          params: { startDate: beg_date, endDate: end_date, userId: 1 },
        }).then((response) => {
          retrieveJournalEntries(beg_date, end_date);
        })
      }

    if (entries.length !== 0) {
        return (
            <Button color="primary" onClick={() => deleteJournalEntries(getFirstDayofMonth(date), getLastDayofMonth(date))}>
            Delete
            </Button>
        );
    } else {
        return null;
    }
}

export default EntryDelete;