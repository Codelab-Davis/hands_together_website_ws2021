import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import React, { useState, useEffect } from "react";
import DatePicker from "./date_picker"; 
import 'react-day-picker/lib/style.css';
import EventTile1 from "../images/EventTile1.png";
import dream from "../images/dream.png"; 
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

  function onPhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  function onConcernsBoxChange(event) {
    setConcernsBox(event.target.value);
  }

  const [signUpMessage, setSignUpMessage] = useState("");


  function submit_sign_up_form() { 
  
    let volunteer = {
      "name": name,
      "age": age,
      "phone_number": phoneNumber,
      "email": email,
      "questions_concerns": concernsBox,
      "event_id": curDayEventData._id, 
    }
    console.log(volunteer); 
    //Right now, this message does not appear since the axios call fails, this needs to be triggered before sign up or some other logic should be added.
    console.log(curDayEventData._id)
    if (name.length == 0 || age.length == 0 || phoneNumber.length == 0 || email.length==0) { 
            setSignUpMessage("All fields must be filled out, please edit your response and try again."); 
            return; 
        }
    if (volunteer.questions_concerns.length == 0) 
      volunteer.questions_concerns = "N/A"; 
    axios.post('http://localhost:5000/volunteer/add_volunteer',volunteer)
      .then(res => {
        console.log(res)
        setSignUpMessage("successful upload!")
      })
      .catch(err => { 
        setSignUpMessage("Couldn't post to database.");
        console.log('err', err);
      })
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

    console.log(events); 

    //STEP 2: 
    for (let i = 0; i < events.length; i++) {
      //convert the thing from mongo into a recognaizable date object 

      //this is the current event object we are looking at
      let cur_event_date = new Date(events[i].date);
      //this is the date we want to compare all event objects to
      base_date = new Date(base_date);

      //slice the array to contain only future events, the first event that is in the future/present will trigger this 
      if (cur_event_date.getTime() >= base_date.getTime()) { 
        events = events.slice(i, events.length); 
      } 

      // if (events.length > 3) { 
      //   events = events.slice(0, 3); 
      // }
    } 

    setUpcomingEvents(events); 
  }

  function formatDate(date) { 
    let new_date = new Date(date); 
    let out_str = ""; 
    for (let i = 0; i <= 4; i++) { 
        out_str += new_date.toString().split(" ")[i] + " "; 
    } 
    return out_str; 
  } 

function determineImage(imgFile) { 
    if (imgFile != undefined) { 
        console.log("in if statement"); 
        return `url(${imgFile})`; 
    }
    else { 
        console.log("in else statement"); 
        return `url(${EventTile1})`; 
    }
} 

  function formatDate(date) { 
    let dateString = new Date(date).toLocaleString('en-US'); 
    dateString = dateString.substring(0, dateString.lastIndexOf(":")) + " " + dateString.substring(dateString.length - 2); 
    return dateString; 
}
    

  return (
    <div class="container-fluid p-0 left-space">
      {/* upcoming events title + description block */}
      <div>
        <h1 className="upcoming-events-text">Upcoming Events</h1>
      </div>

      <div className="row no-gutters">
      <div className="col-12" align="center">
        <img src={dream} className="top-banner-image" /> 
        <div className= "col-12 sign-up-background justify-content-center align-items-center">
          <h2>Sign up below to volunteer!</h2>
        </div>
      </div>
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
          class="row no-gutters event-tile-banner-space justify-content-center"
          align="center"
        >
          {/* If the upcoming events array is populated, we use the map function to iteratre through the first three elements in the array (event is the object, index is itis position in the array) and we display a customized tile with the object's infomration. */}
          {console.log(upcomingEvents)}
          { upcomingEvents.length > 0 ? 
            upcomingEvents.slice(0, 3).map((event, index) => 
              <div class="event-tile-container col-12 col-md-6 col-lg-4">
                <div>
                <div className="event-image" style={{backgroundImage: determineImage(event.image)}} />
                </div>
                <div className="event_tile_banner" align="left">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Time & Date:</strong> {formatDate(event.date)}</p>
                </div>
              </div>
            )
            :
            <h3>We currently don't have any planned upcoming events - check back soon!</h3> 
          }
        </div>
      </div>

      {/* Volunteering opportunities Section
      <div class="container-fluid p-0">
      
          <h1 className="volunteering-opportunities-text">
            Volunteering Opportunities
          </h1>
          <h3 className="description-text">
            Interested in volunteering to help host one of our upcoming events? Select a date to find an event and complete the sign up form - a Hands Together staff member will reach out to you soon.
          </h3>
      
      </div> */}

     
      

      {/* Event Name + Calendar
      <div class="container-fluid p-0">
        <div class="row no-gutters" align="center">
          <div class="event-tile-banner-space col-12 col-md-6 d-flex align-items-center">
            {curDayEventData != undefined && curDayEventData._id != undefined ? 
            <div class="event-tile-container col-12 col-md-4">
              <div>
              <div className="event-image" style={{backgroundImage: determineImage(curDayEventData.image)}} />
              </div>
              <div className="event_tile_banner" align="left">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Time & Date:</strong> {formatDate(event.date)}</p>
              </div>
            </div>
            :
              <div className="volunteer-event-tile">
                <div>
                  <img className="sign-up-tile" src={SignUpTile} />
                </div>
                <div className="sign-up-banner" align="left">
                  <h3 className="sign-up-banner-h3">We currently don't have any events planned for this day - check out another day instead!</h3>
                </div>
              </div>
            }
          </div>

          <div class="col-12 col-md-6 calendar-mobile-vertical">
            <DatePicker class="Date-Picker" setSelectedDays={setSelectedDays} />
          </div>
        </div>
      </div> */}

      {/* Volunteer Sign Up Form To Do: appear and disapper on click*/}
      <div id="sign-up-form" align="left" class="container-fluid p-0">
        {/*Form title + Description */}
        <h1 className="form-title">Volunteer Sign Up Form</h1>
        <h3 className="description-text">
          Interested in volunteering to help Hands Together, either with day-to-day operations or one of our events? Please fill out the form below to sign up. 
        </h3>

        {/* First Name + Last Name  */}
        <div class="row no-gutters nameSection">
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
          <div class="col-8 col-md-2 field-column-padding">
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

        {/*Phone number */}
        <div class="row no-gutters phoneSection">
          <div class="col-4 col-md-5">
            <h3 className="">Phone Number</h3>
          </div>
          <div class="col-8 col-md-2 field-column-padding">
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
        <div class="submit-button-container" align="center">
          <div class="col justify-content-around" style={{marginBottom: "3rem"}}> 
            <button className="donate-button" onClick={submit_sign_up_form} style={{marginTop: "3rem", marginBottom: "1rem"}}>Submit</button>
            <p>{signUpMessage}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Volunteer_Events;
