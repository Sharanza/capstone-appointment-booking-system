import * as moment from 'moment';
import * as React from 'react';
import { useState } from 'react';

export function BookAppointmentForm() {

    const baseClass = 'BookAppointmentForm';

    let timeSlot = {
        slotInterval: 30,
        openTime: '09:00',
        closeTime: '17:00'
    };

    //Format the time
    let startTime = moment(timeSlot.openTime, "HH:mm");

    //Format the end time
    let endTime = moment(timeSlot.closeTime, "HH:mm");

    //Times
    let allTimes = [];

    //Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
        //Push times
        allTimes.push(startTime.format("HH:mm"));
        //Add interval of 30 minutes
        startTime.add(timeSlot.slotInterval, 'minutes');
    }

    console.log(allTimes);

    let allDays = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

    let allMonths = [
        {
            label: 'Choose a month...',
            value: '',
        },
        {
            label: 'January',
            value: 'january',
        },
        {
            label: 'February',
            value: 'february',
        },
        {
            label: 'March',
            value: 'march',
        },
        {
            label: 'April',
            value: 'april',
        },
        {
            label: 'May',
            value: 'may',
        },
        {
            label: 'June',
            value: 'june',
        },
        {
            label: 'July',
            value: 'july',
        },
        {
            label: 'August',
            value: 'august',
        },
        {
            label: 'September',
            value: 'september',
        },
        {
            label: 'October',
            value: 'october',
        },
        {
            label: 'November',
            value: 'november',
        },
        {
            label: 'December',
            value: 'december',
        },
    ];

    // state is a built-in React object that is used to contain data or information about the component
    // the useState hook is being used here
    const [data, setData] = useState({
        date: {
            day: '',
            month: '',
            time: ''
        },
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        comments: '',
    })

// Refreshes the page when reset button is clicked
function refreshPage() {
    window.location.reload()
}

function submit(e: any) {
    // prevent stops the submit button from refreshing the page
    e.preventDefault();
    console.log('submit', {
        date: data.date,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        comments: data.comments,
    })
}

function handle(e: any) {
    // const newdata: any = {data}
    // e represents the event handler argument and the e.target represents a DOM element
    // so e.target.value is the value or id property of the DOM element
    // newdata[e.target.id] = e.target.value
    setData({
        ...data,
        [e.target.name]: e.target.value
    });
    console.log('change', data)
}

return (
    <section className={`${baseClass}__flex-container-form`}>
        <form onSubmit={(e) => submit(e)} action="/add" method="post">
            <h1 className={`${baseClass}__book-appointment-header`}>Select a date and time</h1>
                <div className={`${baseClass}__form-group-date`}>
                    {/* The disabled attribute makes the option unable to select. */}
                    {/* The selected attribute shows the text inside <option> element opening and closing tags. */}
                    <select name='day' id='day-field' value={data.date.day}>
                    {allDays.map((dayItem) => (
                        <option
                        onChange={(e) => handle(e)}
                        value={dayItem}
                        >{dayItem}
                        </option>
                    ))}
                    </select>
                    <select name='month' id='month-field' value={data.date.month}>
                    {/* mapping over allMonths array for each itterating pass current array item through */}
                    {allMonths.map((monthItem) => (
                        <option
                        // onChange event and event handler is called
                        onChange={(e) => handle(e)}
                        // value is being read 2 objects value and label
                        value={monthItem.value}
                        >{monthItem.label}
                        </option>
                    ))}
                    </select>
                    <select name='time' id='time-field' value={data.date.time}>
                    {allTimes.map((timeItem) => (
                        <option
                        onChange={(e) => handle(e)}
                        value={timeItem}
                        > {timeItem}
                        </option>
                    ))}
                    </select>
                </div>
            <h1 className={`${baseClass}__details-header`}>Your Details</h1>
                <div className={`${baseClass}__form-group-details`}>
                    <input
                    onChange={(e) => handle(e)}
                    id='first-name'
                    name='firstName'
                    value={data.firstName} 
                    type='text' 
                    placeholder='First Name...' 
                    required 
                    />
                    <input 
                    onChange={(e) => handle(e)}
                    id='last-name'
                    name='lastName'
                    value={data.lastName} 
                    type='text' 
                    placeholder='Last Name...' 
                    required 
                    />
                    <input 
                    onChange={(e) => handle(e)} 
                    id='email'
                    name='email'
                    value={data.email} 
                    type='email' 
                    placeholder='E-mail...' 
                    required 
                    />
                    <input 
                    onChange={(e) => handle(e)} 
                    id='phone-number'
                    name='phoneNumber'
                    value={data.phoneNumber} 
                    type='tel' 
                    placeholder='Phone Number...' 
                    pattern='[0-9]{11}'
                    required 
                    />
                    <textarea 
                    onChange={(e) => handle(e)}
                    id='comments'
                    name='comments'
                    value={data.comments} 
                    placeholder='Comments...'
                    ></textarea>
                </div>
            <button type='submit' className='submit-btn'>Book Appointment</button>
            <button type="reset" onClick={refreshPage} className='reset-btn'>Reset</button>
        </form>
    </section>
);
}