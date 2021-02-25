import axios from "axios";
import React, { useState, useEffect } from "react";
import EntryViewer from "./EntryViewer";
import EntryDelete from './EntryDelete';
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
  
  useEffect(() => {
    retrieveJournalEntries(getFirstDayofMonth(date), getLastDayofMonth(date));
  }, [date]);

  return (
    <>
      <EntryViewer date={date} entries={entries} />
      <EntryDelete date={date} entries={entries} retrieveJournalEntries = {retrieveJournalEntries}/>
    </>
  );
}

export default EntryCache;
