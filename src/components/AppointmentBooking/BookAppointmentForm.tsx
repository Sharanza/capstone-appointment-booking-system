import * as moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";

export function BookAppointmentForm() {
  const baseClass = "BookAppointmentForm";

  const [bookedDates, setBookedDates] = useState([]);

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

  // TODO: add hook that uses state to track excludedTimes values
  const [excludedTimes, setExcludedTimes] = useState([] as Date[]);

  // Refreshes the page when reset button is clicked
  function handleReset() {
    window.location.reload();
  }

  // use effect hook used to create a side effect
  useEffect(() => {
    console.log(data);
  });

  useEffect(() => {
    getBookedAppointments();
  }, []);

  function submit(e: any) {
    // prevent stops the submit button from refreshing the page
    e.preventDefault();

    // Axios is a library that is used to make HTTP requests
    // Axios is used to make a POST request to the server

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

    axios
      .post("http://localhost:8081/bookingRoutes/booking", booking, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // catch exception used to catch and log any errors
        console.log(err);
      });
  }

  // make a call against back end to get all of the booked appointments (axios and mongo)
  function getBookedAppointments() {
    axios
      .get("http://localhost:8081/bookingRoutes/available")
      .then((res) => {
        const bookings = res.data;

        setBookedDates(
          bookings.map((booking: any) => {
            return moment.utc(booking.date);
          })
        );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  function getExcludedTimes(date: any) {
    // Reset array of excluded times
    setExcludedTimes([]);
    console.log(bookedDates);
    console.log(date);
    // Assign empty arrays within function scope to be
    // populated with dates and times that we'd like to exclude
    let arrSpecificDates: any[] = [];
    let arrExcludedTimes: any[] = [];

    // foreach item in arrDates (bookedDates)
    // if the current iteration (singular bookedDate)
    // equals the date that has been passed then execute what's in the scope
    //   push the date in the current iteration of the
    //   array to the arrSpecificDates array
    bookedDates.forEach((bookedDate: any) => {
      console.log(bookedDate);
      // for the first iteration
      // bookedDate === arrDates[i] === arrDates[0] === new Date(2021, 5, 20, 8, 15)
      if (
        moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(bookedDate, moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(moment(bookedDate, moment.ISO_8601).toObject());
      }
    });
    console.log(arrSpecificDates);

    // for each item in arrSpecificDates
    // push a time to arrExcludedTimes
    arrSpecificDates.forEach((specificDate: any) => {
      arrExcludedTimes.push(
        setHours(
          setMinutes(new Date(), specificDate.minutes),
          specificDate.hours
        )
      );
      // set state with the value of that array
      // state value is then passed to datepicker's excludeTime prop
      setExcludedTimes(arrExcludedTimes);
    });
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
          <DatePicker
            placeholderText="Select a date..."
            selected={data.date}
            onChange={(date) => {
              setData({
                ...data,
                date: date,
              });
              getExcludedTimes(date);
            }}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={30}
            minTime={moment("09:00", "HH:mm").toDate()}
            maxTime={moment("16:30", "HH:mm").toDate()}
            minDate={moment().toDate()}
            maxDate={moment().add(30, "days").toDate()}
            dateFormat="MMMM d, yyyy h:mm aa"
            excludeTimes={excludedTimes}
            onSelect={getExcludedTimes}
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
        <button type="reset" onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </form>
    </section>
  );
}
