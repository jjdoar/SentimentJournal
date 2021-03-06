import React, { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Popover } from "@material-ui/core";
import SearchBackgrounds from "./BackgroundPicker.js";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Calendar from "./Calendar";
import { useAuth, firebaseAuth } from "../provider/AuthProvider";

import "./Calendar.css";

// Create context to share journal entries between components
export const EntryContext = createContext({
  entries: {},
  updateEntries: () => {},
});

function Home() {
  const { inputs, handle } = useAuth();
  const {handleSignout} = useContext(firebaseAuth)
  // Component state
  const [entries, setEntries] = useState("Empty");

  const styling = {
    backgroundColor: "white",
    border: "2px solid",
    textAlign: "left",
  };

  return (
    <EntryContext.Provider value={{ entries, setEntries }}>
      {/* <> */}
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              {...bindTrigger(popupState)}
            >
              &#128507;
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box p={1}>
                <SearchBackgrounds />
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
      <p>{inputs.name}</p>
      <div className="button" >
        <Button
          style={styling}
          color="primary"
          onClick={() => handleSignout()}
        >
          Sign Out
        </Button>
      </div>
      <div>
        
        <Calendar />
        {/* <EntrySubmitter /> */}

      </div>
      {/* </> */}
    </EntryContext.Provider>
  );
}

export default Home;
