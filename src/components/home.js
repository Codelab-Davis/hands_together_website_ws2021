import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css"
import { useHistory } from "react-router-dom"; 
import about from "../images/about.png";
import preschool from "../images/preschool.png";
import kid from "../images/kid.png";
import main from "../images/main.png";
import middle from "../images/middle.png";
import team from "../images/team.png"

function Home() {
    return (
    <div>
        <div margin-top="20px" align="center">
        <div class="container-fluid p-0">
                <div class="row no-gutters">
                <div class="col-4 col-md-4"/>
                <div class="col-4 col-md-4">
                <div class="d-flex justify-content-center">
                <h5 className="text"><b>Banner to advertise upcoming features</b></h5>
                </div>
                </div>
                <div class="col-4 col-md-4"/>
            </div>
        </div>
        </div>

        <div className="my-div">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1 col-md-1"/>
                    <div class="col-11 col-md-11">
                        </div>
                </div>
             </div>
        </div>
        <div class="col-12" >
        <div className="text-opacity" style={{paddingLeft: 50, paddingBottom: 10}}>We promote academic excellence among preschoolers <br></br> and prepare them for elementary school.</div>                
         <button className="wbutton hands-together-button">
            <div className="vocab">Donate</div>
        </button>
        </div>

            <div class="container-fluid p-0">
                <div class="row no-gutters" align="center">
                    <div class=" col-md-4"/>
                    <div class="col-12 col-md-4">
                        <div className="word">About Us</div>              
                    </div>
                    <div class="col-md-4"/>
                    <div class="col-12 col-md-6 box" style={{marginTop: 50, marginBottom: 30}}>
                    </div>
                    <div class="col-12 col-md-6" align="left" style={{paddingLeft: 80}}>
                        <div className="phrase">Hands Together has been recognized at a state and national <br></br> level for preparing young children for kindergarten. We offer <br></br>advanced early education to over 165 at risk children each <br></br>day. We do more than preschool preparation–the facility<br></br> works with working poor parents to enrich their lives, <br></br>preparing them for the work place.</div>
                        <button className="ybutton hands-together-button">
                            <div className="vocab-au">Learn more</div>
                        </button>
                    </div>
             </div>
        </div>

        <div className="container-blue">
            <div class="container-fluid p-0">
                <div class="row no-gutters" align="center">
                    <div class="col-md-4"/>
                    <div class="col-12 col-md-4">
                        <div className="optext">Our Programs</div>              
                    </div>     
                    <div class="col-md-4"/>
                    <div class="col-12 col-md-6" style={{paddingTop: 30}}>
                        <div className="opbox"/>
                        <div className="pre-sub">Preschool</div>
                        <div className="pre-text" align="left">Hands Together is a licensed, award-winning preschool and <br></br>childcare program serving children ages 6 weeks to 5 years. <br></br> Our preschool is designed to meet the academic and social <br></br> needs of the predominantly Latino community in Santa Ana, <br></br>and our goal is to prepare every student for successful entry <br></br>into kindergarten.</div>
                        <button style={{marginRight: 350, marginTop: 70}} className="smbutton hands-together-button">
                            <div className="button-text">Learn More</div>
                        </button>
                    </div>
                    <div class="col-12 col-md-6" style={{paddingTop: 30}}>
                        <div className="opkid" />
                        <div className="pre-sub">Morning Garden</div>                
                        <div className="pre-text" align="left">Morning Garden is a unique preschool and workforce <br></br> development program for housing-insecure families and families <br></br> in transition. We offer developmentally appropriate, structured <br></br>activities that help young children learn how to play welltogether, <br></br>share resources, and respect others. These skills prepare them <br></br>for success in kindergarten, and create a foundation for their <br></br>future educational achievements.</div>
                        <button style={{marginRight: 350, marginTop: 50}} className="smbutton hands-together-button">
                            <div className="button-text">Learn More</div>
                        </button>
                    </div>
                 </div>
            </div>
        </div>

            <div class="container-fluid p-0">
                <div class="row no-gutters" align="center">
                <div class="row no-gutters" align="center">
                    <div class="col-md-4"/>
                    <div class="col-12 col-md-4">
                        <h1 style={{paddingTop:20}}>Our Shop</h1>     
                    </div>
                    <div class="col-md-4"/>

                    <div class="col-6 col-md-6" align="left" style={{paddingLeft: 110, paddingTop:20}}>
                        <p style={{paddingTop:  30}} >Our handcrafted gifts for good are made by the parents in the <br></br>Morning Garden Program. The Morning Garden Program <br></br>provides the highest quality education to the children of working <br></br>families. </p>
                        <p style={{paddingTop: 30}}>Each artisan can express their unique style in the creation of <br></br>these hand-crafted goods. The embroidery styles are inspired <br></br>by traditional techniques of various Latin American regions. </p>
                        <div className="general_space" />
                        <button className="nbutton hands-together-button">
                            <h3>Shop now!</h3>
                        </button>
                    </div>
                    <div class="col-5 col-md-5" style={{paddingLeft:20, paddingTop:60}}>
                        <img className="osbox" src={middle}></img>
                    </div>
                    <div class="col-1 col-md-1"/>
                </div>
            </div>
        </div>

            <div class="container-fluid p-0"style={{marginTop: 100}}>
                <div class="row no-gutters">
                    <div className="container-light" style={{opacity: 0.5}}>
                        <img src={team} />
                    </div>
                    <div class="col-4 col-md-4"/>
                    <div class="col-4 col-md-4" align="center">
                        <h1 className="team">Our Team</h1>        
                    </div>     
                    <div class="col-4 col-md-4"/>
                </div>     
            </div>     

    <div class="container-fluid p-0" style={{marginTop: 50}}>
            <div class="row no-gutters">
            <div class="col-4 col-md-4" />
            <div class="col-4 col-md-4" >
               <h1>Upcoming Events</h1>
               </div>
            <div class="col-4 col-md-4" />
            </div>            
            <div class="row no-gutters" style={{marginTop: 50}}>
            <div class="col- col-md-6" />
            <div class="col-6 col-md-6" style={{paddingLeft:40}}>
            <h4>Event title</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing non vitae <br></br> curabitur porta fusce quam. Et facilisis at laoreet auctor id etiam netus erat eu.</p>
                <h4 style={{marginTop: 60}}>Event title</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing non vitae <br></br> curabitur porta fusce quam. Et facilisis at laoreet auctor id etiam netus erat eu.</p>
                <div align="right" style={{marginTop: 30}} >
                    <button className="wbutton hands-together-button">
                        <h4>View all</h4>
                    </button>
                </div>
            </div>
            </div>
        </div>
        <div className="space" />

    </div>

    
    );
}

export default Home;