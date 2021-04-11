import "bootstrap/dist/css/bootstrap.min.css";
import "../css/volunteer_events.css";
import Rectangle_41 from "../images/Rectangle_41.png";
// import { useHistory } from "react-router-dom";
//question to future self: how do we make the volunteer & events section a pointer cursor without doing it for the whole navbar?

function volunteer_events() {
  //   const history = useHistory();
  return (
    <div>
      {/* This is the big first image, to do: properly center it*/}
      <div className="rectangle_image" align="center">
        <img src={Rectangle_41} />
      </div>
      <div>
        <button className="event_sign_up_button">
          <p>sign up to volunteer!</p>
        </button>
      </div>
    </div>
  );
}
export default volunteer_events;
