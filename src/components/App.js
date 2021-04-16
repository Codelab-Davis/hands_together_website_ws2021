import '../css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import home from "./home"
import shop from "./shop/shop"
import item_page from "./shop/item_page"
import add_item from "./shop_dashboard/add_item"
import admin_dashboard from "./shop_dashboard/admin_dashboard"
import edit_or_remove_item from "./shop_dashboard/edit_or_remove_item"
import login from "./shop_dashboard/login"
import donation from "./donation"
import order_summary from "./order_summary/order_summary"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react'; 
import GuardedRoute from './GuardedRoute';

function App() {

  const[loggedIn, setLoggedIn] = useState(false);

  return (
    <div id="content-container">
      <Router>
        <Route exact path="/" component={home} />
        <Route exact path="/shop" component={shop} />
        <Route exact path="/:id" component={item_page} />
        <Route exact path="/login" component={login} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Route exact path="/admin" component={admin_dashboard} />
        {/* <GuardedRoute path="/admin" component={admin_dashboard} auth={loggedIn} /> */}
        <Route exact path="/add" component={add_item} />
        <Route exact path="/edit" component={edit_or_remove_item} />
        <Route exact path="/order_summary/:transaction_id" component={order_summary} />
        <Route exact path="/donation" component={donation} />
      </Router>
    </div>
  );
}

export default App;
