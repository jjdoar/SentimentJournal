import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { formatDateObj } from "./util";
import { useAuth } from "../provider/AuthProvider";

function EntrySubmitter(props) {
  // Component State
  const [value, setValue] = useState("");
  const { uid } = useAuth();

  const onChangeEvent = (event) => {
    setValue(event.target.value);
  };

  function submitEntry(value) {
    const currentDate = new Date();

    // Send PUT request to the backend
    axios({
      method: "PUT",
      url: "http://0.0.0.0:8081/v0/journal_entries",
      data: {
        date: formatDateObj(currentDate),
        userId: uid,
        content: value,
      },
    });

    // Switch back to main page
    window.location.href = "/";
  }

  return (
    <div>
      <TextareaAutosize
        rowsMin={5}
        cols={60}
        placeholder="Insert Journal entry here"
        onChange={onChangeEvent}
        defaultValue={value}
      />
      <br />
      <Button color="primary" onClick={() => submitEntry(value)}>
        Submit
      </Button>
      <Link to="/">
        <Button color="primary">Back</Button>
      </Link>
      <br />
    </div>
  );
}

export default EntrySubmitter;
