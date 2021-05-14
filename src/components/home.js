import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css"
import { useHistory } from "react-router-dom"; 
import about from "../images/about.png";
import preschool from "../images/preschool.png";
import kid from "../images/kid.png";
import middle from "../images/middle.png";
import p1 from "../images/p1.png";
import p2 from "../images/p2.png";
import p3 from "../images/p3.png";
import p4 from "../images/p4.png";
import p5 from "../images/p5.png";
import p6 from "../images/p6.png";
import p7 from "../images/p7.png";

function Home() {
    return (
    <div>
        <div margin-top="20px" align="center">
        <div class="container-fluid p-0">
                <div class="row no-gutters">
                <div class="col-4"/>
                <div class="col-4">
                <div class="d-flex justify-content-center">
                <h5 className="text">Banner to advertise upcoming features</h5>
                </div>
                </div>
                <div class="col-4"/>
            </div>
        </div>
        </div>

        <div className="my-div">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1"/>
                    <div class="col-11">
                        </div>
                        <h3 className="text-opacity">We promote academic excellence among preschoolers and prepare them for elementary school.</h3>                
                    <div class="col-1"/>
                    <div class="col-11" className="general_space">
                        <button className="wbutton hands-together-button">
                            <h4>Donate</h4>
                        </button>
                    </div>
                </div>
             </div>
        </div>

            <div class="container-fluid p-0">
                <div class="row no-gutters" align="center">
                    <div class="col-4"/>
                    <div class="col-4">
                    <div class="d-flex justify-content-center">
                        <h1 className="insert_space">About Us</h1>              
                    </div>
                    </div>
                    <div class="col-4"/>
                    <div class="col-6">
                        <img className="general_space" src={about}></img>
                    </div>
                    <div class="col-5" align="left">
                        <p className="down">Hands Together has been recognized at a state and national level for preparing young children for kindergarten. We offer advanced early education to over 165 at risk children each day. We do more than preschool preparation–the facility  works with working poor parents to enrich their lives, preparing them for the work place.</p>
                        <button className="ybutton hands-together-button">
                            <h4>Learn More</h4>
                        </button>
                    </div>
             </div>
        </div>

        <div className="space" />
        <div className="container-blue">
            <div class="container-fluid p-0">
                <div class="row no-gutters" align="center">
                    <div class="col-4"/>
                    <div class="col-4">
                        <h1 className="general_space">Our Programs</h1>              
                    </div>              
                    <div class="col-4"/>
                    <div class="col-5" >
                        <img className="general_space" src={preschool}></img>
                    </div>
                    <div class="col-7" align="left">
                        <h3 className="general_space">Preschool</h3>
                        <p className="general_space">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cras amet, purus felis. Tortor, fringilla lectus mauris adipiscing eu ut suspendisse. Sapien amet egestas at maecenas laoreet ipsum donec. Imperdiet sem in risus pharetra magna sed. Ac dolor, non vitae, suspendisse elementum tellus tristique. Convallis orci pharetra.</p>
                    </div>
                    <div class="col-6" align="left" style={{marginLeft:70, paddingTop: 70}}>
                        <h3 className="general_space">Morning Garden</h3>                
                        <p className="general_space">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cras amet, purus felis. Tortor, fringilla lectus mauris adipiscing eu ut suspendisse. Sapien amet egestas at maecenas laoreet ipsum donec. Imperdiet sem in risus pharetra magna sed. Ac dolor, non vitae, suspendisse elementum tellus tristique. Convallis orci pharetra.</p>
                    </div>
                    <div class="col-5" className="shift">
                        <img className="general_space" src={kid}></img>
                    </div>
                 </div>
            </div>
        </div>

            <div class="container-fluid p-0">
                <div class="row no-gutters" align="center">
                <div class="row no-gutters" align="center">
                    <div class="col-4"/>
                    <div class="col-4">
                        <h1 className="general_space">Our Shop</h1>     
                    </div>
                    <div class="col-4"/>
                    <div class="col-6" align="left" style={{marginLeft:40}}>
                        <p className="general_space" >Our handcrafted gifts for good are made by the parents in the Morning Garden Program. The Morning Garden Program provides the highest quality education to the children of working families. </p>
                        <p className="space-text">Each artisan can express their unique style in the creation of these hand-crafted goods. The embroidery styles are inspired by traditional techniques of various Latin American regions. </p>
                        <div className="general_space" />
                        <button className="nbutton hands-together-button">
                            <h3>Shop now!</h3>
                        </button>
                    </div>
                    <div class="col-5" style={{marginLeft:70}}>
                        <img className="general_space" src={middle}></img>
                    </div>
                    <div class="col-1"/>
                </div>
            </div>
        </div>

        <div className="space" />
        <div className="container-light">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-4"/>
                    <div class="col-4" align="center">
                        <h1 className="general_space">Our Team</h1>              
                    </div>     
            <div className="space" />         
                    <div className="col-4" />
                    <div class="col-2" />
                    <div class="col-2" >
                        <img className="general_space" src={p1} style={{marginRight:20}} />
                    </div>
                    <div class="col-2">
                        <img src={p2} className="general_space" style={{marginLeft:20}}/>
                    </div>
                    <div class="col-2">
                        <img src={p3} className="general_space" style={{marginLeft:40}}/>
                    </div>
                    <div class="col-2">
                        <img src={p4} className="general_space" style={{marginLeft:60}}/>
                    </div>
                    <div class="col-2" />

                    <div class="col-3" />
                    <div class="col-2">
                        <img className="general_space" src={p5} style={{marginTop:50}}/>
                    </div>
                    <div class="col-2">
                        <img className="general_space" src={p6} style={{marginLeft:40, marginTop:50}}/>
                    </div>
                    <div class="col-2">
                        <img className="general_space" src={p7} style={{marginLeft:60,marginTop:50}}/>
                    </div>
                    <div class="col-3" />
                </div>
            </div>
    </div>

    <div className="general_space" />
    <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-1"/>
                <div class="col-11">
                    <h1 className="sub">Visit Our Shop</h1>
                </div>
            </div>
        </div>

    <div className="general_space" />
    <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-1" />
                <div class="col-5">
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales dignissim ut eros dui aliquet. Ultrices posuere et aenean tempus. Iaculis viverra purus risus elit. Fermentum, sit adipiscing sit convallis sed a nunc. Habitant nulla non ligula vehicula mauris lectus leo mauris, eu. Faucibus ut dictum nam cras blandit eget.</p>
                </div>
                <div class="col-1" />
                <div class="col-4" className="box" />
                <div class="col-1" />
            </div>
        </div>

    <div className="space" />

    <div className="rec" align="center">
    <div class="container-fluid p-0">
        <div class="row no-gutters">
                <div class="col-1" />
                <div class="col-4">
                    <h1 className="text" >Upcoming Events</h1>
                </div>
            </div>
        </div>
    </div>

    <div className="h_space" />
    
    </div>
    );
}

export default Home;