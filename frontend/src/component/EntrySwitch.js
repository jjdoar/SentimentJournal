import React, {useState, useEffect} from 'react';
import EntryCache from './EntryCache';
import EntrySubmitter from './EntrySubmitter';

function EntrySwitch(props) {
    const date = props.date;
    const [showCache, setShowCache] = useState(true);

    function handleClick(e) {
        e.preventDefault();
        if (showCache === true) {
            setShowCache(false);
        } else {
            setShowCache(true);
        }
    }

    useEffect(() => {
        setShowCache(true);
    }, [date])

    if (showCache === true) {
        return (
            <div>
                <EntryCache date={date} handleClick={handleClick}/>
            </div>            
        );
    } else {
        return (
            <EntrySubmitter handleClick={handleClick}/>
        );
    }

}

export default EntrySwitch;