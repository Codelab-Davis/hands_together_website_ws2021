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
                        <div class="col-12 col-md-5 col-lg-6 info-display">
                            <p> <b>Hands Together:</b> a center for children</p>
                            {/* <div className="space" /> */}
                            <br></br>
                            <p>If you wish to contact us through <br/> fax, phone or letter, please contact us at:<br/><br/><b>Hands Together</b><br/>201 Civic Center Drive East<br/>Santa Ana CA 92701 <br /><b> Phone: (714) 479-0294 </b> <br />  Fax: (714) 479-0297 <br/>Federal ID #33-0857087 </p>
                            <br/>
                            <p className="copyright-text">&#169; 2021 Hands Together. All Rights Reserved <br/> Built by <a href="https://codelabdavis.com/">CodeLab</a></p>
                        </div>
                        
                        <div className="col-md-1 sponsor-display" style={{borderRight: "white solid 2px"}} />                     
                        
                        <div class="col-md-6 col-lg-5 sponsor-display align-items-center" >
                            <h2 class="thank-you-text bold">Thank you to our sponsors!</h2>
                            
                            <div class="row no-gutters justify-content-center circles-row" style={{paddingRight:10}}>
                                <div className="col-12 col-md-1"></div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${p})`}} />
                                </div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${ingram_micro})`}} />
                                </div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${wells_fargo})`}} />
                                </div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${ueberroth})`}} />
                                </div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${hub})`}} />
                                </div>
                                
                                <div className="col-12 col-md-1"></div>
                                <div className="col-12 col-md-1"></div>
           
                                <div class="col-3 col-md-2 circle-container">   
                                    <div className="circle-footer" style={{backgroundImage: `url(${opus_bank})`}} />
                                </div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${pacific_life})`}} />
                                </div>
        
                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${allergen})`}} />
                                </div>

                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${cibola})`}} />
                                </div>
                                            
                                <div class="col-3 col-md-2 circle-container">
                                    <div className="circle-footer" style={{backgroundImage: `url(${anaheim})`}} />
                                </div>
                            
                                <div class="col-12 col-md-1"></div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}
    
export default Footer;