import React, { useState, useContext, useEffect } from "react";
import {
  toDate,
  format,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import EntryCache from "./EntryCache";
import "./Calendar.css";
import { formatDateObj } from "./util";
import { EntryContext } from "./Home";

function Calendar(props) {
  // Component state
  const [date, setDate] = useState(new Date());
  // Shared context(Created in home)
  const { entries } = useContext(EntryContext);

  function header() {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(date, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  }

  function days() {
    const dateFormat = "E";
    const days = [];

    let startDate = startOfWeek(date);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  function cells() {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        var cellId = formatDateObj(day);
        days.push(
          <div
            id={cellId}
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, date)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(toDate(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  function nextMonth() {
    setDate(addMonths(date, 1));
  }
  function prevMonth() {
    setDate(subMonths(date, 1));
  }
  function onDateClick(day) {
    setDate(day);
  }

  function colorCells() {
    if (entries !== "Empty") {
      for (let entry in entries) {
        var cellColor = calcColor(entries[entry]["score"]);
        // console.log(cellColor);
        document.getElementById(
          entries[entry]["date"]
        ).style.background = cellColor;
      }
    }
  }

  function calcColor(score) {
    // Return a color corresponding to the given mood score
    var redScore = 255;
    var greenScore = 255;
    if (score >= 0) {
      redScore = 255 - Math.floor(255 * score);
    } else {
      greenScore = 255 + Math.floor(255 * score);
    }
    return "rgb(" + redScore + ", " + greenScore + ", 0)";
  }

  useEffect(() => {
    colorCells();
  }, [entries]);

  return (
    <div>
      <div className="calendar">
        <div>{header()}</div>
        <div>{days()}</div>
        <div>{cells()}</div>
      </div>
      <EntryCache date={date} />
    </div>
  );
}

export default Calendar;
