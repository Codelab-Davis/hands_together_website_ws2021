import "bootstrap/dist/css/bootstrap.min.css";
import "../css/footer.css";
import Rectangle_38 from "../images/Rectangle_38.png";
import { useHistory } from "react-router-dom";
import p from "../images/footer_images/p.png"; 
import ingram_micro from "../images/footer_images/ingram_micro.png"; 
import wells_fargo from "../images/footer_images/wells_fargo.png"; 
import ueberroth from "../images/footer_images/ueberroth.png"; 
import hub from "../images/footer_images/hub.png"; 
import opus_bank from "../images/footer_images/opus_bank.png"; 
import pacific_life from "../images/footer_images/pacific_life.png"; 
import allergen from "../images/footer_images/allergen.png"; 
import cibola from "../images/footer_images/cibola.png"; 
import anaheim from "../images/footer_images/anaheim.png"; 

function Footer() {
    const history = useHistory();
  
    return (
        <div>
            <div className="footer-content">
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        {/* <div className="space" /> */}
                        <div class="col-7" align="left">
                            <p> <b>Hands Together:</b> a center for children</p>
                            {/* <div className="space" /> */}
                            <br></br>
                            <p>If you wish to contact us through <br/> fax, phone or letter, please contact us at:<br/><br/><b>Hands Together</b><br/>201 Civic Center Drive East<br/>Santa Ana CA 92701 <br /><b> Phone: (714) 479-0294 </b> <br />  Fax: (714) 479-0297 <br/>Federal ID #33-0857087 </p>
                            <br/>
                            <p className="copyright-text">&#169; 2021 Hands Together. All Rights Reserved</p>
                            
                        </div>
                        
                        <div className="vertical-line" />
                        
                        <div class="col-5">
                        <h3 class="thank-you-text"> Thank you to our sponsors!</h3>
                        
                        <div class="container-fluid p-0 circle-row-space" >
                            {/* First row of circles */}
                        <div class="row no-gutters">
                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={p} /> 
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={ingram_micro} /> 
                                </div>
                            </div>
                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={wells_fargo} /> 
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={ueberroth} /> 
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={hub} /> 
                                </div>
                            </div>
                            <div class="col-2" />
                                    {/* bottom row of cicrles  */}

                            <div class="container-fluid p-0 circle-row-space" >
                            <div class="row no-gutters">
                                        
                                <div class="col-2">   
                                <div className="circle-footer">
                                    <img src={opus_bank} /> 
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={pacific_life} />
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={allergen} />
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={cibola} />
                                </div>
                            </div>
                                        
                            <div class="col-2">
                                <div className="circle-footer">
                                    <img src={anaheim} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                     </div>
                    </div>
                    </div>
           </div> 
        </div>
    );
}
    
export default Footer;