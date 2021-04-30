import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import React, { useState } from "react";

import Rectangle_41 from "../images/Rectangle_41.png";
import Rectangle_40 from "../images/Rectangle_40.png";
import Rectangle_39 from "../images/Rectangle_39.png";
import Rectangle_38 from "../images/Rectangle_38.png";
// import { useHistory } from "react-router-dom";
//question to future self: how do we make the volunteer & events section a pointer cursor without doing it for the whole navbar?

function Volunteer_Events() {
  // States to track what is in the input fields

  //name fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //email field
  const [email, setEmail] = useState("");

  //age field
  const [age, setAge] = useState("");

  //gender field
  const [gender, setGender] = useState("");

  //phone number field
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //Questions/Concerns field
  const [concernsBox, setConcernsBox] = useState("");

  // Functions to track typing changes in the input fields
  function onFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function onLastNameChange(event) {
    setLastName(event.target.value);
  }
  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onAgeChange(event) {
    setAge(event.target.value);
  }

  function onGenderChange(event) {
    setGender(event.target.value);
  }

  function onAreaCodeChange(event) {
    setAreaCode(event.target.value);
  }
  function onPhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  function onConcernsBoxChange(event) {
    setConcernsBox(event.target.value);
  }

  return (
    <div class="container-fluid p-0 left-space">
      {/* upcoming events title + description block */}
      <div>
        <h1 className="upcoming-events-text">Upcoming Events</h1>
        <h3 className="description-text">Description of upcoming events.</h3>
      </div>

      {/* This is the big first image */}
      <div className="banner_image ">
        <img src={Rectangle_41} />
      </div>
      {/* This is the sign up button */}
      <div>
        {/* to do: overlap sign up button with image on top */}

        {/* <button className="event_sign_up_button">
                <p>sign up to volunteer!</p>
              </button> */}
      </div>

      {/* This is the picture tiles section */}

      <div class="container-fluid p-0">
        <div class="row no-gutters event-tile-banner-space">
          <div class="col-3">
            <div className="event_tile" />
            <div className="event_tile_text">
              <h3> Event Name</h3>
            </div>
            <div className="event_banner"></div>
          </div>
          <div class="col-3 offset-1">
            <div className="event_tile" />
          </div>
          <div class="col-3 offset-1">
            <div className="event_tile" />
          </div>
        </div>
        {/* <div class="row event-tile-banner-space align-items-start justify-content-around">
          <div className="col event_tile" />
          <div className="col event_tile" />
          <div className="col event_tile" />
        </div> */}
      </div>

      {/* Volunteering opportunities text */}
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <h1 className="volunteering-opportunities-text">
            Volunteering Opportunities
          </h1>
          <h3 className="description-text">
            Description of volunteering opportunities and events available.
          </h3>
        </div>
      </div>

      {/* Event Name + Calendar */}
      <div class="container-fluid p-0">
        <div class="row no-gutters event-tile-banner-space">
          <div class="col-1" />
          <div class="col-5" className="event_tile2" />
          <div class="col-1" />
          <div class="col-4" className="calendar" />
          <div class="col-1" />
        </div>
      </div>

      {/* Volunteer Sign Up Form */}
      <div align="left" class="container-fluid p-0">
        {/*Form title + Description */}
        <div class="row no-gutters">
          <h1 className="form-title">Volunteer Sign Up Form</h1>
          <h3 className="description-text">
            Please fill in the information below to sign up for this
            volunteering
          </h3>
        </div>

        {/* First Name + Last Name  */}
        <div class="row no-gutters name-top-space">
          <div class="col-6">
            <h3 className="">Name</h3>
          </div>
          <div class="col-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              class="first-name-box"
              onChange={onFirstNameChange}
            />
          </div>
          <div class="col-3">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              class="last-name-box"
              onChange={onLastNameChange}
            />
          </div>
        </div>

        {/* Age  */}
        <div class="row no-gutters ageSection">
          <div class="col-6">
            <h3 className="">Age</h3>
          </div>
          <div class="col-3">
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={onAgeChange}
            />
          </div>
        </div>

        {/* Gender */}
        <div class="row no-gutters genderSection">
          <div class="col-6">
            <h3 className="">Gender</h3>
          </div>
          <div class="col-6">
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
              check={gender === "Female"}
              value="Female"
              onChange={onGenderChange}
            />
            <label class="gender-label">Female</label>
            <br />

            <input
              type="radio"
              checked={gender === "Non-binary"}
              value="Non-binary"
              onChange={onGenderChange}
            />
            <label class="gender-label">Non-binary</label>
            <br />

            <input
              type="radio"
              checked={gender === "Prefer not to say"}
              value="Prefer not to say"
              onChange={onGenderChange}
            />
            <label class="gender-label">Prefer not to say</label>
          </div>
        </div>

        {/*Phone number */}
        <div class="row no-gutters phoneSection">
          <div class="col-6">
            <h3 className="">Phone Number</h3>
          </div>
          <div class="col-1">
            <input
              type="text"
              placeholder="123"
              value={areaCode}
              onChange={onAreaCodeChange}
            />
          </div>

          {/* NEED TO FIGURE OUT HOW TO ALIGN THIS */}
          <div>
            <h1>-</h1>
          </div>

          <div class="col-3">
            <input
              type="text"
              placeholder="4567890"
              value={phoneNumber}
              onChange={onPhoneNumberChange}
            />
          </div>
        </div>

        {/*Email */}
        <div class="row no-gutters emailSection">
          <div class="col-6">
            <h3 className="">Email</h3>
          </div>
          <div class="col-6">
            <input
              type="text"
              placeholder="alovelyhuman@gmail.com"
              value={email}
              onChange={onEmailChange}
            />
          </div>
        </div>

        {/*Questions/Concerns */}
        <div class="row no-gutters concernsSection">
          <div class="col-6">
            <h3 className="">Questions/Concerns</h3>
          </div>
          <div class="col-6">
            <input
              type="text"
              placeholder="Feel free to ask us any questions or voice your concerns."
              value={concernsBox}
              class="concernBox"
              onChange={onConcernsBoxChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Volunteer_Events;
