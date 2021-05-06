import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import React, { useState, useEffect } from "react";

import Rectangle_41 from "../images/Rectangle_41.png";
import Rectangle_40 from "../images/Rectangle_40.png";
import Rectangle_39 from "../images/Rectangle_39.png";
import Rectangle_38 from "../images/Rectangle_38.png";
import EventTile1 from "../images/EventTile1.png";
import EventTile2 from "../images/EventTile2.png";
import EventTile3 from "../images/EventTile3.png";
import SignUpTile from "../images/SignUpTile.png";

// import { useHistory } from "react-router-dom";
//question to future self: how do we make the volunteer & events section a pointer cursor without doing it for the whole navbar?

function Volunteer_Events() {
  // States to track what is in the input fields

  //name fields
  const [name, setName] = useState("");

  //email field
  const [email, setEmail] = useState("");

  //age field
  const [age, setAge] = useState("");

  //gender field
  const [gender, setGender] = useState("");

  //phone number field
  const [phoneNumber, setPhoneNumber] = useState("");

  //Questions/Concerns field
  const [concernsBox, setConcernsBox] = useState("");

  // Functions to track typing changes in the input fields
  function onNameChange(event) {
    setName(event.target.value);
  }
  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onAgeChange(event) {
    // regex
    const re = /^[0-9\b]+$/; // Only allow positive integer input
    if (re.test(event.target.value) && event.target.value[0] != 0) {
      // has entered valid input
      setAge(event.target.value);
      document.getElementById("age-error-message").style.display = "none";
    } else if (event.target.value == "") {
      // there's no input
      setAge(event.target.value);
      document.getElementById("age-error-message").style.display = "none";
    } else {
      // whenever something invalid is typed
      document.getElementById("age-error-message").style.display = "block"; // determine which choice looks best
    }
  }

  function onGenderChange(event) {
    setGender(event.target.value);
  }

  function onPhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  function onConcernsBoxChange(event) {
    setConcernsBox(event.target.value);
  }

  function submit() {
    // let test_item = {
    //   name: firstName + ' ' + lastName,
    //   date_added: Date.now(),
    //   price: '37.23',
    //   images: ['img1fakeline', 'img2fakelink', 'img3fakelink'],
    //   date_sold: Date.now(),
    //   transaction_id: 'sdfsdfrs34345345345xdcsdf345435345',
    //   tracking_link: "test_link",
    //   cancelled: false,
    //   shipping_address: new Map(),
    // }
    // axios.post('http://localhost:5000/sold_items/add_item', test_item)
    //   .then(res => {
    //     console.log(res);
    // })
    // }
    // 1. Make an object containing each of the fields you've gathered
    // 2.
  }

  useEffect(() => {
    // call axios's GET request on /event/get_all_events
    // you would have returned an array of event objects
    // parse out the next 3 upcoming events
    let today = new Date();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    // loop through all of the events returned
    // get the 3 events with a date field closest to today
    filterThreeSoonestDates(today);
  }, []);

  function filterThreeSoonestDates(base_date, events) {
    // try {
    //   let three_events = [events[0], events[1], events[2]];
    // } catch { }
    // for (let i = 3; i < events.length; i++) {
    //   let cur_event_date = new Date(events[i].date);
    //   // is events[i] in the future?
    //   if (cur_event_date.getTime() > today.getTime()) {
    //     // get the three closest events to today
    //     if (cur_event_date.getTime() > new Date(three_events[0].date).getTime()) {
    //       three_events[]
    //     }
    //     else if (cur_event_date.getTime() > new Date(three_events[1].date).getTime()) {
    //     }
    //     else if (cur_event_date.getTime() > new Date(three_events[2].date).getTime()) {
    //     }
    //   }
    // }
  }

  return (
    <div class="container-fluid p-0 left-space">
      {/* upcoming events title + description block */}
      <div>
        <h1 className="upcoming-events-text">Upcoming Events</h1>
      </div>

      {/* This is the big first image */}
      {/* <div class="row no-gutters">
        <div class="col-12">
          <img className="banner_image" src={Rectangle_41} />
          </div>
      </div> */}
      
      {/* This is the sign up button */}
      <div>
        {/* to do: overlap sign up button with image on top */}

        {/* <button className="event_sign_up_button">
                <p>sign up to volunteer!</p>
              </button> */}
      </div>

      {/* This is the picture tiles section for events */}

      <div class="container-fluid p-0">
        <div
          class="row no-gutters event-tile-banner-space"
          align="center"
        >
          <div class="col-12 col-md-4">
            <div>
              <img className="event_tile" src={EventTile1} />
            </div>
            <div className="event_tile_banner" align="left">
              <h3> Event Name</h3>
              <p>Event Description</p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div>
              <img className="event_tile" src={EventTile2} />
            </div>
            <div className="event_tile_banner" align="left">
              <h3> Event Name</h3>
              <p>Event Description</p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div>
              <img className="event_tile" src={EventTile3} />
            </div>
            <div className="event_tile_banner" align="left">
              <h3> Event Name</h3>
              <p>Event Description</p>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteering opportunities Section */}
      <div class="container-fluid p-0">
      
          <h1 className="volunteering-opportunities-text">
            Volunteering Opportunities
          </h1>
          <h3 className="description-text">
            Description of volunteering opportunities and events available.
          </h3>
      
      </div>

      {/* Event Name + Calendar */}
      <div class="container-fluid p-0">
        <div class="row no-gutters event-tile-banner-space" align="center">
          <div class="col-6">
            <div>
              <img className="sign-up-tile"src={SignUpTile} />
            </div>
            <div className="sign-up-banner" align="left">
              <h3>Event Name</h3>
              <p>Event Description</p>
            </div>
          
            <div className="sign-up-button">Sign Up</div>
          </div>

          <div class="col-6">
            <div className="calendar">
              Calendar
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Sign Up Form To Do: appear and disapper on click*/}
      <div align="left" class="container-fluid p-0">
        {/*Form title + Description */}
        <h1 className="form-title">Volunteer Sign Up Form</h1>
        <h3 className="description-text">
          Please fill in the information below to sign up for this
          volunteering event.
        </h3>

        {/* First Name + Last Name  */}
        <div class="row no-gutters name-top-space">
          <div class="col-4 col-md-5">
            <h3>Name</h3>
          </div>
          <div class="col-8 col-md-6 field-column-padding">
            <input
              type="text"
              placeholder="Name"
              value={name}
              class="first-name-box"
              onChange={onNameChange}
            />
            <p class="label-text">First Name, Last Name</p>
          </div>
        </div>

        {/* Age  */}
        <div class="row no-gutters ageSection">
          <div class="col-4 col-md-5">
            <h3 className="">Age</h3>
          </div>
          <div class="col-8 col-md-6 field-column-padding">
            <input
              type="text"
              placeholder="Age"
              value={age}
              class="first-name-box"
              onChange={onAgeChange}
            />
          </div>
          <p id="age-error-message" style={{ display: "none" }}>
            Error! Bad input!
          </p>
        </div>

        {/* Gender */}
        <div class="row no-gutters genderSection">
          <div class="col-4 col-md-5">
            <h3 className="">Gender</h3>
          </div>
          <div class="col-6 field-column-padding">
            <input
              type="radio"
              checked={gender === "Male"}
              value="Male"
              onChange={onGenderChange}
            />
            <label class="gender-label">Male</label>
            <br />

            <input
              type="radio"
              checked={gender === "Female"}
              value="Female"
              onChange={onGenderChange}
              style={{ marginTop: "8px"}}
            />
            <label class="gender-label">Female</label>
            <br />

            <input
              type="radio"
              checked={gender === "Non-binary"}
              value="Non-binary"
              onChange={onGenderChange}
              style={{ marginTop: "8px"}}

            />
            <label class="gender-label">Non-binary</label>
            <br />

            <input
              type="radio"
              checked={gender === "Prefer not to say"}
              value="Prefer not to say"
              onChange={onGenderChange}
              style={{ marginTop: "8px"}}

            />
            <label class="gender-label">Prefer not to say</label>
          </div>
        </div>

        {/*Phone number */}
        <div class="row no-gutters phoneSection">
          <div class="col-4 col-md-5">
            <h3 className="">Phone Number</h3>
          </div>
          <div class="col-8 col-md-6 field-column-padding">
            <input
              type="text"
              placeholder="(###)-###-####"
              value={phoneNumber}
              class="phone-number-box"
              onChange={onPhoneNumberChange}
            />
            <p class="label-text">(123)-456-7890</p>
          </div>
        </div>

        {/*Email */}
        <div class="row no-gutters emailSection">
          <div class="col-4 col-md-5">
            <h3 className="">Email</h3>
          </div>
          <div class="col-8 col-md-6 field-column-padding">
            <input
              type="text"
              placeholder="example@example.com"
              value={email}
              class="email-box"
              onChange={onEmailChange}
            />
            <p class="label-text">example@example.com</p>
          </div>
        </div>

        {/*Questions/Concerns */}
        <div class="row no-gutters concernsSection">
          <div class="col-4 col-md-5">
            <h3 className="">Comments</h3>
          </div>
          <div class="col-8 col-md-6 field-column-padding">
            <textarea
              type="text"
              placeholder="Feel free to ask us any questions or voice your concerns."
              value={concernsBox}
              class="concernBox"
              onChange={onConcernsBoxChange}
            />
          </div>
        </div>

        {/*submit button*/}
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
export default Volunteer_Events;
