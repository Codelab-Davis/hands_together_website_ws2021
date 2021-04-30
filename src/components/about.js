import "bootstrap/dist/css/bootstrap.min.css";
import "../css/about.css";
import about_us from  "../images/about_us.png";
import preschool from  "../images/preschool.png";
import morning from  "../images/morning.png";


function About() {
    return (
        <div>
        <div class="container-fluid p-0">
            
            <div className="vertical_space" />

            {/* Display About Us text left with an Image on right */}
            <div class="container-fluid p-5">
                    <div class="row no-gutters">
                        <div class="col-6">
                            <h1 className="sub">About Us</h1>
                            <p> 
                            Hands Together has been recognized at a state and national level for preparing young children for kindergarten. <br /><br />
                            We offer advanced early education to over 165 at risk children each day. <br /><br />
                            We do more than preschool preparation–the facility  works with working poor parents to enrich their lives, preparing them for the work place.
                            </p>
                        </div>
                        <div class="col-1" />
                        <div class="col-5" >
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
            <div class="container-fluid p-0 bg-primary">
                <div class="row align-items-center preschoolFormat">
                    <div class="col-4 p-5" > 
                        <img class = "imgFormat" src={preschool}/>
                    </div>

                    <div class="col-2" />
                    <div class="col-5"> 
                        <h3>Preschool</h3>
                        <p> Hands Together is a licensed, award-winning preschool and childcare program serving children ages 6 weeks to 5 years. 
                            Our preschool is designed to meet the academic and social needs of the predominantly Latino community in Santa Ana, 
                            and our goal is to prepare every student for successful entry into kindergarten.</p>
                        <button className="btn preschoolButton">Learn More</button>
                    </div>
                    
                </div>
            </div>

            <div class="container-fluid p-0 bg-warning">
                <div class="row align-items-center">
                    <div class="col-1" />
                    <div class="col-5"> 
                        <h3>Morning Garden</h3>
                        <p> Morning Garden is a unique preschool and workforce development program for housing-insecure families and families in transition. 
                            We offer developmentally appropriate, structured activities that help young children learn how to play well together, share resources, 
                            and respect others.</p>
                            <button className="btn morningButton">Learn More</button>
                    </div>
                    <div class="col-4 p-5" > 
                        <img class = "imgFormat" src={morning}/>
                    </div>
                    
                </div>
            </div>
            {/* Members Name + Bio */}
            {/* unfortunately the meet our team picture circles 
            keep mashing together and I don't know how to prevent that  */}
            <div align="center">
                <div class="container-fluid p-5">
                    <div>
                        <h2>Meet Our Team</h2> 
                    </div>
                    
                </div>
                <div class="container-fluid p-0">
                        <div class="row no-gutters">
                            <div class="col-2"/>
                            <div class="col-2 p-3">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>

                            <div class="col-2 p-3">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>

                            <div class="col-3" />
                            <div class="col-2">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>

                            <div class="col-2">
                                <div className="circle">
                                    {/* Insert Image here */}
                                </div>
                                <div>
                                    <p>FirstName LastName</p>
                                    <p>Bio</p>
                                </div>
                            </div>
                            

                        </div>
                    </div>
            </div>

                     
        </div>

        <div className="vertical_space" />
        <div className="vertical_space" />
            
        </div>
        
    );
}

export default About;