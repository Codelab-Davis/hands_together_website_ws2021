import "bootstrap/dist/css/bootstrap.min.css";
import "../css/home.css"
import { useHistory } from "react-router-dom"; 

function Home() {
    return (
    <div>
        <div className="f_space">Banner to advertise upcoming features</div>

        <div className="container-content" align="center">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1"/>
                    <div class="col-11">
                        <h1 className="text">Lorem ipsum dolor</h1>                
                    </div>
                    <div class="col-1"/>
                    <div class="col-11">
                        <h1 className="text">sit amet.</h1>
                    </div>
                    <div class="col-1"/>
                    <div class="col-1" className="f_space">
                        <button className="wbutton hands-together-button" >
                            <p>Donate</p>
                        </button>
                    </div>
                    <div class="col-10"/>
                    </div>
                <div class="row no-gutters">
                    <div class="col-1" />
                    <div class="col-2" className="s_space">
                        <p className="text">Or check out our shop!</p>
                    </div>
                    <div class="col-9" />
                </div>
            </div>
        </div>

        <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-1"/>
                <div class="col-11">
                    <h1 className="sub-title">Our Programs</h1>
                </div>
            </div>
        </div>
    
        <div className="f_space" />
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1"/>
                    <div class="col-5">
                        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel blandit proin curabitur ullamcorper turpis et. Diam ridiculus amet quam sed fusce nullam. Vehicula placerat enim, bibendum sagittis posuere. Diam sed dui et magna.</p>
                    </div>
                    <div class="col-6" />
                </div>
            </div>        

            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1" />
                    <div class="col-2" >
                        <div className="container-small" />
                    </div>
                    <div class="col-2" />
                    <div class="col-2">
                        <div className="container-small" />
                    </div>
                    <div class="col-2" />
                    <div class="col-2" >
                        <div className="container-small" />
                    </div>
                    <div class="col-1" />
            </div>
        </div>

        <div className="s_space" />
        <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1" />
                    <div class="col-2" >
                        <h4 className="ss-title">Program title</h4>
                    </div>
                    <div class="col-2" />
                    <div class="col-2">
                        <h4 className="ss-title">Program title</h4>
                    </div>
                    <div class="col-2" />
                    <div class="col-2" >
                        <h4 className="ss-title">Program title</h4>
                    </div>
                    <div class="col-1" />
            </div>
        </div>

        <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div class="col-1" />
                    <div class="col-2" >
                        <p className="word">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cras amet, purus felis. Tortor, fringilla lectus mauris adipiscing eu ut suspendisse. Sapien amet egestas at maecenas laoreet ipsum donec. Imperdiet sem in risus pharetra magna sed. Ac dolor, non vitae, suspendisse elementum tellus tristique. Convallis </p>
                    </div>
                    <div class="col-2" />
                    <div class="col-2">
                        <p className="word">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cras amet, purus felis. Tortor, fringilla lectus mauris adipiscing eu ut suspendisse. Sapien amet egestas at maecenas laoreet ipsum donec. Imperdiet sem in risus pharetra magna sed. Ac dolor, non vitae, suspendisse elementum tellus tristique. Convallis </p>
                    </div>
                    <div class="col-2" />
                    <div class="col-2" >
                        <p className="word">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cras amet, purus felis. Tortor, fringilla lectus mauris adipiscing eu ut suspendisse. Sapien amet egestas at maecenas laoreet ipsum donec. Imperdiet sem in risus pharetra magna sed. Ac dolor, non vitae, suspendisse elementum tellus tristique. Convallis </p>
                    </div>
                    <div class="col-1" />
            </div>
        </div>

        <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-1"/>
                <div class="col-11">
                    <h1 className="sub">Meet Our Team</h1> 
                </div>
                </div>
            <div class="row no-gutters">
                <div class="col-1" />
                <div class="col-8">
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales dignissim ut eros dui aliquet. Ultrices posuere et aenean tempus. Iaculis viverra purus risus elit. Fermentum, sit adipiscing sit convallis sed a nunc. Habitant nulla non ligula vehicula mauris lectus leo mauris, eu. Faucibus ut dictum nam cras blandit eget.</p>
                </div>
                <div class="col-3" />
            </div>
        </div>
    
    <div className="f_space" />
    <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-1"/>
                <div class="col-1" className="circle" />
                <div class="col-1"/>
                <div class="col-1" className="circle" />
                <div class="col-1"/>
                <div class="col-1" className="circle" />
                <div class="col-1"/>
                <div class="col-1" className="circle" />
                <div class="col-1"/>
                <div class="col-1" className="circle" />
                <div class="col-1"/>
            </div>
        </div>

    <div className="f_space" />
    <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-1"/>
                <div class="col-11">
                    <h1 className="sub">Visit Our Shop</h1>
                </div>
            </div>
        </div>

    <div className="f_space" />
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