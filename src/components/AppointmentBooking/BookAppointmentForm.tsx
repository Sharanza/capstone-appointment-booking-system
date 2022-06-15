import * as moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function BookAppointmentForm() {
  const baseClass = "BookAppointmentForm";

  let timeSlot = {
    slotInterval: 30,
    openTime: "09:00",
    closeTime: "17:00",
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
    startTime.add(timeSlot.slotInterval, "minutes");
  }

  // get a list of available times (programmtic list dayjs) dates / times for next 30 days
  // looping through the next 30 days adding 'DD' to an array
  // let availableSlots: any = [];
  // for (let i = 0; i < 30; i++) {

  // availableSlots.push(moment().add(30, 'days').format('DD'));

  // foreach of these 30 days, loop through the available times and push DD - HH:mm to array

  // compare the 2 so that they only show available booking slots (array function to compare two lists) code the subtraction of the list from dayjs

  // state is a built-in React object that is used to contain data or information about the component
  // the useState hook is being used here
  const [data, setData] = useState({
    date: moment().toDate(),
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    comments: "",
  });

  // Refreshes the page when reset button is clicked
  function refreshPage() {
    window.location.reload();
  }

  // use effect hook used to create a side effect
  useEffect(() => {
    console.log(data);
  });

  async function submit(e: any) {
    // prevent stops the submit button from refreshing the page
    e.preventDefault();

    // Axios is a library that is used to make HTTP requests
    // Axios is used to make a POST request to the server
    try {
      const booking = data;

      // config is a built-in object that is used to configure the request sent to the server
      // the content type is set to application/json to send the data as a JSON object to the server
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // the data is sent to the server as a JSON object using the config object above and the axios post method is used to send the data to the server
      // the response is then stored in the response variable and is then parsed to get the data from the server
      // it is then stored in the data variable which is then set to the state of the component using the setData function
      const res = await axios.post(
        "http://localhost:8081/bookingRoutes/booking",
        booking,
        config
      );

      console.log(res);
      // catch exception used to catch and log any errors
    } catch (err) {
      console.log(err);
    }
  }

  // **NEXT STEP** Axios will then be used to make a GET request to the server to get the time slot information from the server side API to display on the page as a dropdown menu

  // make a call against back end to get all of the booked appointments (axios and mongo)
  async function getAvailableAppointments() {
    try {
      const res = await axios.get("http://localhost:8081/bookingRoutes/all");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  function handle(e: any) {
    // e represents the event handler argument and the e.target represents a DOM element
    // so e.target.value is the value or id property of the DOM element
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  }

  return (
    <section className={`${baseClass}__flex-container-form`}>
      <form onSubmit={(e) => submit(e)}>
        <h1 className={`${baseClass}__book-appointment-header`}>
          Select a date and time
        </h1>
        <div className={`${baseClass}__form-group-date`}>
          {/* use datepicker component to get date data and send it to mongo database */}
          <DatePicker
            selected={data.date}
            onChange={(date) => setData({ ...data, date: date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            minTime={moment("09:00", "HH:mm").toDate()}
            maxTime={moment("16:30", "HH:mm").toDate()}
            minDate={moment().toDate()}
            maxDate={moment().add(30, "days").toDate()}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <h1 className={`${baseClass}__details-header`}>Your Details</h1>
        <div className={`${baseClass}__form-group-details`}>
          <input
            onChange={(e) => handle(e)}
            id="first-name"
            name="firstName"
            value={data.firstName}
            type="text"
            placeholder="First Name..."
            required
          />
          <input
            onChange={(e) => handle(e)}
            id="last-name"
            name="lastName"
            value={data.lastName}
            type="text"
            placeholder="Last Name..."
            required
          />
          <input
            onChange={(e) => handle(e)}
            id="email"
            name="email"
            value={data.email}
            type="email"
            placeholder="E-mail..."
            required
          />
          <input
            onChange={(e) => handle(e)}
            id="phone-number"
            name="phoneNumber"
            value={data.phoneNumber}
            type="tel"
            placeholder="Phone Number..."
            pattern="[0-9]{11}"
            required
          />
          <textarea
            onChange={(e) => handle(e)}
            id="comments"
            name="comments"
            value={data.comments}
            placeholder="Comments..."
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
        <button type="reset" onChange={refreshPage} className="reset-btn">
          Reset
        </button>
      </form>
    </section>
  );
}
