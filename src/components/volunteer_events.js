import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import Rectangle_41 from "../images/Rectangle_41.png";
import Rectangle_40 from "../images/Rectangle_40.png";
import Rectangle_39 from "../images/Rectangle_39.png";
import Rectangle_38 from "../images/Rectangle_38.png";
// import { useHistory } from "react-router-dom";
//question to future self: how do we make the volunteer & events section a pointer cursor without doing it for the whole navbar?

function volunteer_events() {
  //   const history = useHistory();
  // BIG TO-DO FOR THIS WHOLE THING: FIGURE OUT PADDING AND SPACING T^T
  return (
    <div>
      {/* This is the big first image, to do: properly center it*/}
      <div align="center" class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col">
            <div className="rectangle_image" align="center">
              <img src={Rectangle_41} />
            </div>
            {/* This is the sign up button */}
            <div>
              {/* to do: overlap sign up button with image on top */}
              <button className="event_sign_up_button">
                <p>sign up to volunteer!</p>
              </button>
            </div>
          </div>
        </div>

        {/* This is the picture tiles section */}

        <div align="center" class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col" />
            <div class="col" className="event_tile" />
            <div class="col" />
            <div class="col" className="event_tile" />
            <div class="col" />
            <div class="col" className="event_tile" />
            <div class="col" />
          </div>
        </div>

        {/* Volunteering opportunities text */}
        <div align="left" class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-1" />
            <div class="col-9">
              <h1>Volunteering opportunities</h1>
              <p1>
                Description of volunteering opportunities and events available.
              </p1>
            </div>
            <div class="col-2" />
          </div>
        </div>

        {/* Event Name + Calendar */}
        <div align="center" class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col" className="event_tile2" />

            <div class="col">
              <p>calendar should be here</p>
            </div>
          </div>
        </div>

        {/* Volunteer Sign Up Form */}
        <div align="left" class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-1" />
            <div class="col-8">
              <h1>Volunteer Sign Up Form</h1>
              <p>the sign up form should go here</p>
            </div>
            <div class="col-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default volunteer_events;
