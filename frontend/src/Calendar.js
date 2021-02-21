import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import EntryCache from './EntryCache';
import EntrySubmitter from './EntrySubmitter';

function CustomCalendar(props) {
	// Componeent state
	const [date, setDate] = useState(new Date());
	console.log(date);

	return (
		<div>
      <Calendar
        onChange={setDate}
        value={date}
      />
			<EntryCache date={date}/>
    </div>
	);
}

export default CustomCalendar;
