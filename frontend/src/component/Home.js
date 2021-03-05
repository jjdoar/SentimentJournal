import React, { useState, createContext } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Popover } from "@material-ui/core";
import SearchBackgrounds from "./BackgroundPicker.js";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Calendar from "./Calendar";
import { useAuth } from "../provider/AuthProvider";

// Create context to share journal entries between components
export const EntryContext = createContext({
  entries: {},
  updateEntries: () => {},
});

function Home() {
  const { inputs } = useAuth();
  // Component state
  const [entries, setEntries] = useState("Empty");

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
      <div>
        <p>{inputs.name}</p>
        <Calendar />
        {/* <EntrySubmitter /> */}

      </div>
      {/* </> */}
    </EntryContext.Provider>
  );
}

export default Home;
