import react, { useState, useEffect } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import { useHistory } from "react-router-dom"; 
import about from "../images/about.png";
import school from "../images/school.png";
import kid from "../images/kid.png";
import main from "../images/main.png";
import middle from "../images/middle.png";
import team from "../images/team.png";
const axios = require('axios');

function Home() {

    const [curAnnouncement, setCurAnnouncement] = useState(""); 
    const [isBannerVisible, setIsBannerVisible] = useState(false); 

    useEffect(() => { 
        axios.get('http://localhost:5000/announcements/get_announcement')
        .then((res) => {
            setCurAnnouncement(res.data[0].text); 
        }) 
        .catch((error) => console.log("Error getting announcement:", error)); 
    }, []);

    useEffect(() => { 
        if (curAnnouncement != undefined && curAnnouncement.length > 0) 
            setIsBannerVisible("block"); 
        else 
            setIsBannerVisible("none"); 
    }, [curAnnouncement]); 

    return (
    <div>
        <div margin-top="20px" align="center">
        <div class="container-fluid p-0" style={{display: isBannerVisible}}> 
                <div class="row no-gutters">
                <div class="col-4 col-md-4"/>
                <div class="col-4 col-md-4">
                <div class="d-flex justify-content-center">
                <h5 className="text"><b>{curAnnouncement}</b></h5>
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
        <div class="col-12">
        <div className="text-opacity">We promote academic excellence among preschoolers and prepare them for elementary school.</div>                
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
                    <div class="col-12 col-md-6 box" style={{marginTop: 40, marginBottom: 30}}>
                    </div>
                    <div class="col-12 col-md-6" align="left" style={{paddingLeft: 80}}>
                        <div className="phrase">Hands Together has been recognized at a state and national level for preparing young children for kindergarten. We offer advanced early education to over 165 at risk children each day. We do more than preschool preparation–the facility works with working poor parents to enrich their lives, preparing them for the work place.</div>
                        <button className="ybutton hands-together-button">
                            <div className="button-text">Learn More</div>
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
                        <div className="pre-text" align="left" style={{paddingRight: 40}}> Hands Together is a licensed, award-winning preschool and childcare program serving children ages 6 weeks to 5 years. Our preschool is designed to meet the academic and social needs of the predominantly Latino community in Santa Ana, and our goal is to prepare every student for successful entry into kindergarten.</div>
                        <button style={{marginRight: 350, marginTop: 80}} className="smbutton hands-together-button">
                            <div className="button-text">Learn More</div>
                        </button>
                    </div>
                    <div class="col-12 col-md-6" style={{paddingTop: 30}}>
                        <div className="opkid" />
                        <div className="pre-sub">Morning Garden</div>                
                        <div className="pre-text" align="left" style={{paddingRight: 40}}>Morning Garden is a unique preschool and workforce development program for housing-insecure families and families in transition. We offer developmentally appropriate, structured activities that help young children learn how to play welltogether, share resources, and respect others. These skills prepare them for success in kindergarten, and create a foundation for their <br></br>future educational achievements.</div>
                        <button style={{marginRight: 350, marginTop: 50}} className="smbutton hands-together-button">
                            <div className="button-text">Learn More</div>
                        </button>
                    </div>
                 </div>
            </div>
        </div>

            <div class="container-fluid p-0">
                <div class="row no-gutters" >
                <div class="row no-gutters" >
                    <div class="col-md-4"/>
                    <div class="col-12 col-md-4" style={{paddingTop: 20}}>
                        <div className="ostext">Our Shop</div>     
                    </div>
                    <div class="col-md-4"/>
                    <div class="col-12 col-md-6">
                        <div className="ourtext" >Our handcrafted gifts for good are made by the parents in the Morning Garden Program. The Morning Garden Program provides the highest quality education to the children of working families. </div>
                        <div className="ourtext">Each artisan can express their unique style in the creation of these hand-crafted goods. The embroidery styles are inspired by traditional techniques of various Latin American regions. </div>
                        <button className="nbutton hands-together-button">
                            <div className="button-text">Shop now!</div>
                        </button>
                    </div>
                    <div class="col-12 col-md-5" style={{paddingTop:30}}>
                        <div className="osbox"/>
                    </div>
                    <div class="col-md-1"/>
                </div>
            </div>
        </div>

            <div class="container-fluid p-0"style={{marginTop: 100}}>
                <div class="row no-gutters">
                    <div className="container-light" style={{opacity: 0.5}}>
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
                <div align="right" style={{marginTop: 30, marginBottom: 30}} >
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