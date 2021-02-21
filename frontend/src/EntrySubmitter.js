import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { formatDateObj } from "./util";


function EntrySubmitter(props) {
  // Component State 
  const [value, setValue] = useState("");

  const onChangeEvent = (event) => {
    setValue(event.target.value);
  };
 
  function submitEntry(value) {
    const userId = "1";
    const currentDate = new Date();

    // Send PUT request to the backend
    axios({
      method: "PUT",
      url: "http://localhost:8081/v0/journal_entries",
      data: { "date": formatDateObj(currentDate), "userId": userId, "content": value },
    }).then((response) => {
      console.log(response);
    });
  }

  // return (
  //   <div>
  //     <h4>Today is {getTimeandDate()[1]}</h4>
  //     <p>{getTimeandDate()[0]}</p>
  //     <div>
  //       <TextareaAutosize
  //         rowsMin={5}
  //         cols={60}
  //         placeholder="Insert Journal entry here"
  //         onChange={onChangeEvent}
  //         defaultValue={value}
  //       />
  //       <br />
  //       <Link to="/">
  //         <Button color="primary" onClick={() => submitEntry(value)}>
  //           Submit
  //         </Button>
  //       </Link>{" "}
  //       <Link to="/">
  //         <Button color="primary">Back</Button>
  //       </Link>
  //       <br />
  //     </div>
  //   </div>
  // );

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
         <Link to="/">
           <Button color="primary" onClick={() => submitEntry(value)}>
             Submit
           </Button>
         </Link>{" "}
         <Link to="/">
           <Button color="primary">Back</Button>
         </Link>
      <br />
    </div>
  );
}

export default EntrySubmitter;
