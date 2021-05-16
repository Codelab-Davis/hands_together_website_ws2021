import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import React, { useState, useEffect } from "react";
import DatePicker from "./date_picker"; 
import 'react-day-picker/lib/style.css';
import EventTile1 from "../images/EventTile1.png";
import EventTile2 from "../images/EventTile2.png";
import EventTile3 from "../images/EventTile3.png";
import SignUpTile from "../images/SignUpTile.png";
const axios = require('axios');

// import { useHistory } from "react-router-dom";
//question to future self: how do we make the volunteer & events section a pointer cursor without doing it for the whole navbar?

function Volunteer_Events() {
  const [selectedDays, setSelectedDays] = useState(); 
  // States to track upcoming events to display 
  const [upcomingEvents, setUpcomingEvents] = useState([]); 
  const [curDayEventData, setCurDayEventData] = useState(); 

  useEffect(() => {
    if (selectedDays != undefined && selectedDays.length != 0) {  
      let start_of_day = new Date(selectedDays.selectedDays).setHours(0,0,0,0); 
      let end_of_day = new Date(selectedDays.selectedDays).setHours(23,59,59,99);
      for (let i = 0; upcomingEvents != undefined && i < upcomingEvents.length; i++) { 
        if (new Date(upcomingEvents[i].date).getTime() >= start_of_day && new Date(upcomingEvents[i].date).getTime() <= end_of_day) { 
          console.log("in the inner if statement"); 
          setCurDayEventData(upcomingEvents[i]); 
          return; 
        } 
      } 
      setCurDayEventData({}); 
    }
    else { 
      console.log("in the else statement"); 
      setCurDayEventData({}); 
    }
  }, [selectedDays]); 

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
  }

  useEffect(() => {
    // call axios's GET request on /event/get_all_events
    // you would have returned an array of event objects
    // parse out the next 3 upcoming events

    //to do: update address when relevant!
    //.then forces the get request to complete before rendering the content of the page. 
    axios.get('http://localhost:5000/event/get_all_events')
    .then((res) => { 
      let today = new Date(); //translates time to a workable date
      
      // Learn more about the date object here: 
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      // loop through all of the events returned
      // get the 3 events with a date field closest to today
      filterThreeSoonestDates(today, res.data);
    })
    .catch((error) => { 
      console.log("error in get_all_events", error); 
    });
  }, []);

  
  function filterThreeSoonestDates(base_date, events) {
    
    //STEP 1: compare every pair of elements in the array to sort ALL dates in ascending order 
    events.sort(function (a, b) {
      //when you get date objects from MongoDB, it will no longer recognize them as date objects, that's why we make a_date and b_date as new date objects
      let a_date = new Date(a.date);
      let b_date = new Date(b.date);
      //we convert is back to milisecond value, then we return the difference. Works like sort in C++, positive value will put a first, negative will put b first. 
      return (a_date.getTime() - b_date.getTime());
    })

    //STEP 2: 
    for (let i = 0; i < events.length; i++) {
      //convert the thing from mongo into a recognaizable date object 

      //this is the current event object we are looking at
      let cur_event_date = new Date(events[i].date);
      //this is the date we want to compare all event objects to
      base_date = new Date(base_date);

      //slice the array to contain only future events, the first event that is in the future/present will trigger this 
      if (cur_event_date.getTime() >= base_date.getTime()) { 
        
        //if the first event is already in the future, we don't need to do anything
        if (i == 0) { 
          break;
        }
        
        // slices the array to contain only elements from this event to future events
        else { 
          events = events.slice(i-1, events.length - 1);
          break;
        }
      }
      //if none of the events trigger the above statement, all events are in the past, we set our events array to be empty 
      else if (i == events.length - 1) { 
        events = []; 
        
      }
    } 

    setUpcomingEvents(events); 
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
          {/* If the upcoming events array is populated, we use the map function to iteratre through the first three elements in the array (event is the object, index is itis position in the array) and we display a customized tile with the object's infomration. */}

          { upcomingEvents.length > 0 ? 
            upcomingEvents.slice(0, 3).map((event, index) => 
              <div class="col-12 col-md-4">
                <div>
                  <img className="event_tile" src={EventTile1} />
                </div>
                <div className="event_tile_banner" align="left">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            )
            :
            <h3>We currently don't have any upcoming planned events - check back soon!</h3> 
          }
        </div>
      </div>

      {/* Volunteering opportunities Section */}
      <div class="container-fluid p-0">
      
          <h1 className="volunteering-opportunities-text">
            Volunteering Opportunities
          </h1>
          <h3 className="description-text">
            Interested in volunteering to help host one of our upcoming events? Select a date to find an event and complete the sign up form - a Hands Together staff member will reach out to you soon.
          </h3>
      
      </div>

      {/* Event Name + Calendar */}
      <div class="container-fluid p-0">
        <div class="row no-gutters event-tile-banner-space" align="center">
          {console.log(curDayEventData)}
          <div class="col-6">
            {curDayEventData != undefined && curDayEventData._id != undefined ? 
            <div>
              <div>
                <img className="sign-up-tile"src={SignUpTile} />
              </div>
              <div className="sign-up-banner" align="left">
                <h3 className="sign-up-banner-h3">{curDayEventData.name}</h3>
                <p className="sign-up-banner-p">{curDayEventData.description}</p>
              </div>
            
              <div className="sign-up-button">Sign Up</div>
            </div>
            :
              <div>
                <div>
                  <img className="sign-up-tile"src={SignUpTile} />
                </div>
                <div className="sign-up-banner" align="left">
                  <h3 className="sign-up-banner-h3">We currently don't have any events planned for this day - check out another day instead!</h3>
                </div>
              </div>
            }
          </div>

          <div class="col-6">
            <DatePicker setSelectedDays={setSelectedDays} />
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
