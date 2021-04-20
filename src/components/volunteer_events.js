import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import Rectangle_41 from "../images/Rectangle_41.png";
import Rectangle_40 from "../images/Rectangle_40.png";
import Rectangle_39 from "../images/Rectangle_39.png";
import Rectangle_38 from "../images/Rectangle_38.png";
// import { useHistory } from "react-router-dom";
//question to future self: how do we make the volunteer & events section a pointer cursor without doing it for the whole navbar?

function volunteer_events() {
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
        <div class="row no-gutters event-tile-banner-space event-tile-container">
          <div className="event_tile" />
          <div className="event_tile" />
          <div className="event_tile" />
        </div>
      </div>

      {/* Volunteering opportunities text */}
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-1" />
          <div class="col-9">
            <h1> Volunteering Opportunities</h1>
            <h3 className="description-text">
              Description of volunteering opportunities and events available.
            </h3>
          </div>
          <div class="col-2" />
        </div>
      </div>

      {/* Event Name + Calendar */}
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col" className="event_tile2" />
          <div class="col" className="calendar" />
          <div class="col" />
          <div class="col"></div>
        </div>
      </div>

      {/* Volunteer Sign Up Form */}
      <div align="left" class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-1" />
          <div class="col-8">
            <h1>Volunteer Sign Up Form</h1>
            <h3 className="description-text">
              Please fill in the information below to sign up for this
              volunteering
            </h3>
          </div>
          <div class="col-4" />
        </div>
      </div>
    </div>
  );
}
export default volunteer_events;
