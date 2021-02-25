import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Calendar from "./Calendar";

function Home() {
  return (
    <div>
      <Link to="/entrySubmitter">
        <Button>New</Button>
      </Link>

      <Calendar />
    </div>

    // <div
    //   style={{
    //     position: "absolute",
    //     left: "50%",
    //     top: "50%",
    //     transform: "translate(-50%, -50%)",
    //     textAlign: "center",
    //   }}
    // >
  );
}

export default Home;