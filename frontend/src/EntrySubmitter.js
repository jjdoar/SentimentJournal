import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@material-ui/core";

function EntrySubmitter() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const current = new Date();
  const date = `${
    monthNames[current.getMonth()]
  } ${current.getDate()}, ${current.getFullYear()}`;

  const time = `${current.getHours() % 12}:${current.getMinutes()} ${
    current.getHours() >= 12 ? "PM" : "AM"
  }`;

  const [value, setValue] = useState("");

  const onChangeEvent = (event) => {
    setValue(event.target.value);
  };

  const onHeightChangeEvent = (height) => {
    console.log("height", height);
	};
	
	function submitEntry(value, date) {

		const userId = "User_name";

		console.log(value);
		console.log(date);
		console.log(userId);

		const url = "";

		//var dataString = JSON.stringify(dataObj);

		// Send put request to the backend
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({'date': date, 'userId': userId, 'content': value})
		};
		fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => this.setState({postId: data.id}));
	}

  return (
    <div className="EntrySubmitter">
      <h4>Today is {date}</h4>
      <p>{time}</p>
      <div>
        <TextareaAutosize
          rowsMin={5}
          cols={60}
          placeholder="Insert Journal entry here"
          onChange={onChangeEvent}
					onHeightChange={onHeightChangeEvent}
        />
				<Button color="primary" onClick={() => submitEntry(value, date)}>Submit</Button> <br />
      </div>
      {/* <span>{value}</span> */}
    </div>
  );
}

export default EntrySubmitter;
