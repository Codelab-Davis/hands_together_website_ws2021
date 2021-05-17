import "bootstrap/dist/css/bootstrap.min.css";
import "../css/about.css";
import about_us from  "../images/about_us.png";
import preschool from  "../images/preschool.png";
import morning from  "../images/morning.png";
import team from  "../images/ourteam.png";
{/* TODO: Insert redirection link to "our team" page */}
{/* TODO: Images of Preschool and Morning Garden resize for smaller screens, 
        but it stays a certain size after a point and does not resize further */}

function About() {
    return (
    <div>
        <div class="container-fluid p-0">
            {/* Added <br>'s occasionally to add space between text while on small screens */}
            {/* classname abttxt gave margins to a bunch of text */}
            <div className="vertical_space" />

            {/* Display About Us text left with an Image on right */}
            <div class="container-fluid p-1">
                    <div class="row no-gutters">
                        {/* Adding md makes it so that the cols stack up on top of each other when scren size < 768 */}
                        <div class="col-md-6">
                            <h1 className="abttxt">About Us</h1>
                            <p className="abttxt"> 
                            Hands Together has been recognized at a state and national level for preparing young children for kindergarten. <br /><br />
                            We offer advanced early education to over 165 at risk children each day. <br /><br />
                            We do more than preschool preparation–the facility  works with working poor parents to enrich their lives, preparing them for the work place.
                            <br /><br />
                            </p>
                        </div>
                        <div class="col-1" />
                        <div class="col-5" >
                            <br />
                            <img class = "aboutImgFormat" align = "center" src={about_us}/>
                        </div>
                    </div>
                        
            
            </div>

            <div className="vertical_space" />

            {/* Display Programs followed by Preschool and Morning Garden divs */}

            <div class="container-fluid p-3">
                <h1 align="center">Our Programs</h1> 
            </div>
            
            <div className="vertical_space" />
            <div class="container-fluid p-0">
                <div class="row align-items-center preschoolFormat">
                    <div class="col-md-4 p-5" > 
                        <img class = "imgFormat" src={preschool}/>
                    </div>

                    <div class="col-2" />
                    <div class="col-md-5"> 
                    <br /> <br />
                        <h3 className = "abttxt">Preschool</h3>
                        <p className = "abttxt"> Hands Together is a licensed, award-winning preschool and childcare program serving children ages 6 weeks to 5 years. 
                            Our preschool is designed to meet the academic and social needs of the predominantly Latino community in Santa Ana, 
                            and our goal is to prepare every student for successful entry into kindergarten.<br /><br /></p>
                        <button className="btn preschoolButton abttxt">Learn More</button>
                        <br /> <br /> <br /> <br />
                    </div>
                    
                </div>
            </div>

            <div class="container-fluid p-0">
                <div class="row align-items-center morningFormat">
                    <div class="col-1" />
                    <div class="col-md-5"> 
                    <br /><br />
                        <h3 className="smallScreenTextShift">Morning Garden</h3>
                        <p className="smallScreenTextShift"> Morning Garden is a unique preschool and workforce development program for housing-insecure families and families in transition. 
                            We offer developmentally appropriate, structured activities that help young children learn how to play well together, share resources, 
                            and respect others.<br /><br /></p>
                            <button className="btn morningButton smallScreenTextShift">Learn More</button>
                    </div>
                    <div class="col-md-4 p-5" > 
                        <img class = "imgFormat" src={morning}/>
                    </div>
                    
                </div>
            </div>
            {/* Our Team Link */}
            {/* TODO: Insert redirection link to "our team" page */}
            
            <div class = "teamdiv">
                <h1 onClick={() => (window.location = "/about")}class="teamlink">Our Team</h1>
            </div>
           
            
            
        </div> 
    </div>
        
    );
}

export default About;