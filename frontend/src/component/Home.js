import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Popover } from "@material-ui/core";
import SearchBackgrounds from "./BackgroundPicker.js";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Calendar from "./Calendar";

function Home() {
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
         <div>
           <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
             &#128507;
           </Button>
           <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
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
        <Link to="/entrySubmitter">
          <Button>New</Button>
        </Link>

        <Calendar />
      </div>
    </>
  );
}

export default Home;