import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/mobile_drawer.css";

function MobileDrawer() { 

    const [drawerState, setDrawerState] = useState(false);

    function handleDrawerState() {
        let newState = !drawerState;
        setDrawerState(newState);
    }

    return ( 
        <div>
            <img onClick={handleDrawerState} src="https://img.icons8.com/ios/36/000000/menu--v6.png"/>
            {!drawerState ? 
            <></>
            :
            <div class="container-fluid fade-animation p-0">
                <div class="row no-gutters">
                    <div class="col-12">
                    <p onClick={() => (window.location = "/about")} className="text">About</p>
                    </div>
                    <div class="col-12">
                    {/* Link to programs */}
                    <p>Programs</p> 
                    </div>
                    <div class="col-12">
                    <p onClick={() => (window.location = "/volunteer_events")}>
                        Volunteer & Events
                    </p>
                    </div>
                    <div class="col-12">
                    <p onClick={() => (window.location = "/shop")}>Shop</p>
                    </div>
                    <div class="col-12">
                    <p onClick={() => (window.location = "/donation")}>Donate</p>
                    </div>
                </div>
            </div>
        }
        </div> 
    );
}

export default MobileDrawer; 