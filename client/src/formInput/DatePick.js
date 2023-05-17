import ReactDOM from "react-dom";
import React, { Component } from "react";
import {DropdownDate, YearPicker, MonthPicker, DayPicker} from "react-dropdown-date";
import { useState } from "react";


const DatePick = () => {
    const [year, setDate] = useState(2022);
   
        return (
    <div>
        <YearPicker
          defaultValue={'select year'}
          start={2010}                // default is 1900
          end={2020}                  // default is current year
          reverse                     // default is ASCENDING
          required={true}             // default is false
          disabled={true}             // default is false
          value={year}     // mandatory
          onChange={(year) => {       // mandatory
            setDate({ year });
            console.log(year);
          }}
          id={'year'}
          name={'year'}
          classes={'classes'}
          optionClasses={'option classes'}
        />
        </div>
  )
}

export default DatePick