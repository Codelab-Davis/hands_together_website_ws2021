import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css"
import { useHistory } from "react-router-dom"; 

function Navbar() {
    const history = useHistory(); 

    return (
        <div>
            <div align="right">
                <button className="hands-together-button">
                    <p className="caption">Check Out</p>
                </button>
            </div>
            <div align="center">
                <h1 className="title-text" onClick={() => window.location="/"}>Hands Together</h1>
            </div>
            <div className="navbar-content" align="center">
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div class="col-2 offset-1">
                            <h4 className="text">About</h4>
                        </div>
                        <div class="col-2">
                            <h4>About</h4>
                        </div>
                        <div class="col-2">
                            <h4>About</h4>
                        </div>
                        <div class="col-2">
                            <h4 onClick={() => window.location="/shop"}>Shop</h4>
                        </div>
                        <div class="col-2">
                            <h4>About</h4>
                        </div>
                        <div class="col-1" />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Navbar;