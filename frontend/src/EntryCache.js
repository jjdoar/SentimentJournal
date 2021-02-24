import axios from "axios";
import React, { useState, useEffect } from "react";
import EntryViewer from "./EntryViewer";
import { getFirstDayofMonth, getLastDayofMonth } from "./util";

function EntryCache(props) {
  // Passed in from parent component(Calendar)
  const date = props.date;

  // Component state
  const [entries, setEntries] = useState({});

  function retrieveJournalEntries(beg_date, end_date) {
    axios({
      method: "GET",
      url: "http://154.151.49.150:8081/v0/journal_entries",
      params: { startDate: beg_date, endDate: end_date, userId: 1 },
    }).then((response) => {
      console.log("Entry Chache: ");
      console.log(response.data);
      setEntries(response.data);
    });
  }

  function deleteJournalEntries(beg_date, end_date) {
    axios({
      method: "DELETE",
      url: "http://154.151.49.150:8081/v0/journal_entries",
      params: { startDate: beg_date, endDate: end_date, userId: 1 },
    }).then((response) => {
      setEntries(response.data);
      retrieveJournalEntries(beg_date, end_date);
    })
  }
  
  useEffect(() => {
    retrieveJournalEntries(getFirstDayofMonth(date), getLastDayofMonth(date));
  }, [date]);

  return (
    <>
      <EntryViewer date={date} entries={entries} />;
      <Button color="primary" onClick={() => deleteJournalEntries(getFirstDayofMonth(date), getLastDayofMonth(date))}>
        Delete
      </Button>
    </>
  );
}

export default EntryCache;
