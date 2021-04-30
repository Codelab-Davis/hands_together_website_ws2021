import "bootstrap/dist/css/bootstrap.min.css";
import "../css/footer.css";
import Rectangle_38 from "../images/Rectangle_38.png";
import { useHistory } from "react-router-dom";

function Footer() {
    const history = useHistory();
  
    return (
        <div>
            <div className="footer-content">
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        {/* <div className="space" /> */}
                        <div class="col-5 border" align="left">
                            <p> <b>Hands Together:</b> a center for children</p>
                            <div className="space" />
                            <p>If you wish to contact us through fax, phone or letter, please contact us at:</p>
                        </div>
                           <div className="vertical-line" />
                         
                        <div class="col-4 border">
                                <p>blah blah</p>
                        </div>
                    </div>
                </div>
           </div> 
        </div>
        );
    }
    
export default Footer;