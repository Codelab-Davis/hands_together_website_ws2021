import react, { useState, useEffect } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css";
import { useHistory } from "react-router-dom"; 
import aboutUsImage from "../images/about.png";
import school from "../images/school.png";
import kid from "../images/kid.png";
import main from "../images/main.png"; 
import mainNoGradient from "../images/main_no_gradient.png"; 
import middle from "../images/middle.png";
import team from "../images/team.png";
const axios = require('axios');

function Home() {

    const [curAnnouncement, setCurAnnouncement] = useState(""); 
    const [isBannerVisible, setIsBannerVisible] = useState(false); 

    useEffect(() => { 
        axios.get('https://db.handstogether-sa.org/announcements/get_announcement')
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
            <div className="col-12 large-overlay" style={{padding: "0"}}> 
                {isBannerVisible ? 
                <div className="banner"> 
                    <h2 className="announcement-text" align="center">{curAnnouncement}</h2> 
                </div> 
                : 
                <></> 
                }
                <img src={main} className="landing-overlay-image"/> 
                <h1 className="container-padding landing-overlay-text" style={{fontWeight: "700"}}>We promote academic excellence among preschoolers and prepare them for elementary school.</h1> 
                <button className="container-padding lg-button landing-overlay-button" style={{backgroundColor: "var(--darkred)"}}> 
                    <a href="/donation">Donate</a> 
                </button> 
            </div> 

            <div className="row no-gutters align-items-center about-us-spacing"> 
                <div className="col-12 about-us-title-spacing" align="center">
                    <h1>About Us</h1>
                </div>
                <div className="col-md-6" align="center"> 
                    <img src={aboutUsImage} className="about-us-image" />
                </div>
                <div className="col-md-6"> 
                    <div className="about-us-text-width">
                        <div className="infoblurb">Hands Together has been recognized at a state and national level for preparing young children for kindergarten. We offer advanced early education to over 165 at risk children each day. We do more than preschool preparation–the facility  works with working parents to enrich their lives, preparing them for the work place.</div>
                        <button className="lg-button lg-button-font-sizing large-screen-button" onClick={() => window.location = "/programs"} style={{backgroundColor: "var(--darkyellow)"}}>Learn More</button>
                        <button className="lg-button lg-button-font-sizing small-screen-button" style={{backgroundColor: "var(--darkred)"}}> 
                            <a href="/donation">Donate</a> 
                        </button> 
                    </div> 
                </div> 
            </div> 
    
            <div class="row no-gutters blue-container">
                <div class="col-12 our-programs-spacing" align="center">
                    <h1>Our Programs</h1>              
                </div>     
                <div class="col-12 col-md-6" align="center">
                    <div className="program-container-padding" align="left">
                        <img src={school} className="program-image" /> 
                        <h2 className="sub-title-padding">Preschool</h2>
                        <p>Hands Together is a licensed, award-winning preschool and childcare program serving children ages 6 weeks to 5 years. Our preschool is designed to meet the academic and social needs of the predominantly Latino community in Santa Ana, and our goal is to prepare every student for successful entry into kindergarten.<br/><br/></p>
                        <button onClick={() => (window.location = "/programs")} className="sm-button programs-button-spacing" style={{backgroundColor: "var(--darkyellow)"}}> 
                            Learn More
                        </button>
                    </div> 
                </div>
                <div class="col-12 col-md-6" align="center">
                    <div className="program-container-padding" align="left"> 
                        <img src={kid} className="program-image"/> 
                        <h2 className="sub-title-padding">Morning Garden</h2>               
                        <p>Morning Garden is a unique preschool and workforce development program for housing-insecure families and families in transition. We offer developmentally appropriate, structured activities that help young children learn how to play welltogether, share resources, and respect others. These skills prepare them for success in kindergarten, and create a foundation for their future educational achievements.</p>
                        <button onClick={() => (window.location = "/programs")} className="sm-button programs-button-spacing" style={{backgroundColor: "var(--darkyellow)"}}> 
                            Learn More 
                        </button> 
                    </div> 
                </div> 
            </div> 

            <div className="container-padding shop-spacing align-items-center">
                <div className="col-12 about-us-title-spacing" align="center">
                    <h1>Our Shop</h1>
                </div>
                <div className="row no-gutters">
                    <div className="col-lg-6" style={{padding: "0"}}> 
                        <div className="infoblurb">Our handcrafted gifts for good are made by the parents in the Morning Garden Program. The Morning Garden Program provides the highest quality education to the children of working families.<br/><br/>Each artisan can express their unique style in the creation of these hand-crafted goods. The embroidery styles are inspired by traditional techniques of various Latin American regions. </div> 
                        <button className="lg-button lg-button-font-sizing" onClick={() => window.location = "/shop"} style={{backgroundColor: "var(--darkyellow)"}}>Shop now!</button>
                    </div> 
                    <div className="col-lg-6 img-container" style={{padding: "0"}} align="center">
                        <img src={middle} className="about-img"/>
                    </div>
                </div>
            </div> 
    
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div className="container-light" style={{opacity: 0.5}}>
                        </div>
                        <div class="col-4 col-md-4"/>
                        <div class="col-4 col-md-4" align="center">
                            <h1 onClick={() => (window.location = "/our_team")} className="team">Our Team</h1>        
                        </div>     
                        <div class="col-4 col-md-4"/>
                    </div> 
                </div> 
        </div> 
    
        
        );
    }
    
export default Home;