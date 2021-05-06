import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { useHistory } from "react-router-dom";
import ht_logo from "../images/ht_logo.png";
import cart from "../images/cart.png";
import account_circle from "../images/account_circle.png";

function Navbar() {
  const history = useHistory();

  return (
    <div>
      <div className="row no-gutters">
        <div className="col-4 offset-4" align="center">
          <div align="center" style={{display: "inline-block"}}> 
            <h1 className="navbar-title-text" onClick={() => (window.location = "/")}>
              <img className = "imgSpacing" src={ht_logo} />
            </h1>
          </div>
        </div>
        <div className="col-4" align="right">
          <div align="right" style={{display: "inline-block"}}>
            <img onClick={() => (window.location = "/login")} class="buttonSpacing" src={account_circle} />
            <img class="buttonSpacing" src={cart} />
            <button className="btn checkOutButton">Check-Out</button>
          </div>
        </div>
      </div> 
      <div className="navbar-content" align="center">
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-2 offset-1">
              <h4 onClick={() => (window.location = "/about")}className="text">About</h4>
            </div>
            <div class="col-2">
              {/* Link to programs */}
              <h4 className="text">Programs</h4> 
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/volunteer_events")} className="text">
                Volunteer & Events
              </h4>
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/shop")} className="text">Shop</h4>
            </div>
            <div class="col-2">
              <h4 onClick={() => (window.location = "/donation")} className="text">Donate</h4>
            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
