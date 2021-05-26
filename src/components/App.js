import "../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import home from "./home";
import about from "./about"; 
import ourTeam from "./our_team"; 
import Shop from "./shop/shop";
import ItemPage from "./shop/item_page";
import add_shop_item from "./shop_dashboard/add_shop_item";
import view_shop_items from "./shop_dashboard/view_shop_items"; 
import add_event from "./shop_dashboard/add_event";
import view_events from "./shop_dashboard/view_events";  
import admin_dashboard from "./shop_dashboard/admin_dashboard";
import sold_items_test_routes from "./shop_dashboard/sold_items_test_routes"; 
import Login from "./shop_dashboard/login";
import donation from "./donation";
import thank_you from "./transaction_pages/thank_you";
import cancel_donation from "./transaction_pages/cancel_donation";
import volunteer_events from "./volunteer_events";
import programs from "./programs"
import Navbar from "./navbar";
import Footer from "./footer"; 
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react'; 
import GuardedRoute from './GuardedRoute';
import {Switch} from 'react-router'
import email from "./email";;
const axios = require('axios'); 

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(0);

  useEffect(() => { 
    axios.get('https://db.handstogether-sa.org/announcements/get_announcement_c', { withCredentials: true }) 
        .then(() => setLoggedIn(true)) 
        .catch(); 
  }); 

  return (
    <div id="content-container">
      <Navbar cartUpdate={cartUpdate}/>
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/about" component={about} />
          <Route exact path="/our_team" component={ourTeam} />
          <Route exact path="/shop" render={(props) => (<Shop {...props} cartUpdate={cartUpdate} setCartUpdate={setCartUpdate}/>)} />
          <Route exact path="/item/:id" render={(props) => (<ItemPage {...props} />)} /> 
          <Route exact path="/shop/:id" render={(props) => (<ItemPage {...props} cartUpdate={cartUpdate} setCartUpdate={setCartUpdate}/>)} />
          <Route exact path="/login" render={(props) => !loggedIn ? (<Login {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />) : <Redirect to="/admin" />} />
          <Route exact path="/sold_items_test_routes" component={sold_items_test_routes} /> 
          <GuardedRoute path="/admin" component={admin_dashboard} auth={loggedIn} />
          <GuardedRoute exact path="/add_shop_item" component={add_shop_item} auth={loggedIn} />
          <GuardedRoute exact path="/view_shop_items" component={view_shop_items} auth={loggedIn} />
          <GuardedRoute exact path="/add_event" component={add_event} auth={loggedIn} />
          <GuardedRoute exact path="/view_events" component={view_events} auth={loggedIn} />
          <Route exact path="/thank_you" component={thank_you} />
          <Route exact path="/cancel_donation/:id" component={cancel_donation} />
          <Route exact path="/donation" component={donation} />
          <Route exact path="/volunteer_events" component={volunteer_events} />
          <Route exact path="/email" component={email} />
          <Route exact path="/programs" component={programs} />
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;