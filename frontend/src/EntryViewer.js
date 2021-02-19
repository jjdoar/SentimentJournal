import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

function EntryViewer() {
  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState("Nothing to display here");

  const getDates = (date) => {
    var pad = (num) => ("00" + num).slice(-2);
    var begin_date = date;
    begin_date =
        begin_date.getUTCFullYear() +
        "-" +
        pad(begin_date.getUTCMonth() + 1) +
        "-" +
        pad(begin_date.getUTCDate());

    var end_date = date;
    end_date = 
        end_date.getUTCFullYear() +
        "-" +
        pad(end_date.getUTCMonth() + 1) +
        "-" +
        pad(end_date.getUTCDate());

    return [begin_date, end_date];
  }

  useEffect(() => {
    axios({
        method: "GET",
        url: "http://localhost:8081/v0/journal_entries",
        params: { startDate: getDates(date)[0], endDate: getDates(date)[1], userId: 1 },
    }).then((response) => {
        console.log(response.data);
        if (typeof(response.data[0]) !== "undefined") {
            setEntry(response.data[0].content);
        } else {
            setEntry("Nothing to display here");
        }
        
    })
  }, [date]);

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <li>{entry}</li>
    </div>
  );
}

export default EntryViewer;