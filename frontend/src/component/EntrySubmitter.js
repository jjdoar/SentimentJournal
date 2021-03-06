import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { formatDateObj } from "./util";
import { useAuth } from "../provider/AuthProvider";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MDEditor from "@uiw/react-md-editor";
import "../styles.css";

import { getSpark, sparkMessages } from "./SparkMessages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EntrySubmitter(props) {
  const handleClick = props.handleClick;
  const colorCells = props.colorCells;

  // Component State
  const [value, setValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const { inputs } = useAuth();

  // Alert Dialog functions
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleClick();
  };

  function doSpark() {
    const currentDate = new Date();
    const threshold = -0.25;
    const days = 3;

    // Get entries from range of days[today-days, today]
    const end_date = formatDateObj(currentDate);
    const beg_date = formatDateObj(
      new Date(currentDate.setDate(currentDate.getDate() - days))
    );

    axios({
      method: "GET",
      url: "http://127.0.0.1:8081/v0/journal_entries",
      params: { startDate: beg_date, endDate: end_date, userId: inputs.uid },
    }).then((response) => {

      // Calculate avg score of range of days
      let totalScore = 0.0;
      for (let entry in response.data) {
        totalScore += response.data[entry]["score"];
      }

      let avgScore = totalScore / Object.keys(response.data).length;

      if (avgScore < threshold) {
        handleClickOpen();
      } else {
        handleClick(); // updates calendar after submit
      }
    });
  }

  function submitEntry(value) {
    const currentDate = new Date();

    // Send PUT request to the backend
    axios({
      method: "PUT",
      url: "http://127.0.0.1:8081/v0/journal_entries",
      data: {
        date: formatDateObj(currentDate),
        userId: inputs.uid,
        content: value,
      },
    }).then(() => {
      colorCells();
      doSpark();
    });
    // this.handleClick;
  }

  const styling = {
    backgroundColor: "white",
    border: "2px solid",
  };

  return (
    <div>
      <div className="mdeditor">
        <MDEditor value={value} onChange={setValue} />
      </div>
      <div className="button" onClick={handleClick}>
        <Button
          style={styling}
          color="primary"
          onClick={() => submitEntry(value)}
        >
          Submit
        </Button>
      </div>

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Looks like you need a spark?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {getSpark(
                Math.floor(Math.random() * sparkMessages.length),
                sparkMessages
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Thanks!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default EntrySubmitter;
