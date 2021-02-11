import '../css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import shop from "./shop/shop"
import item_page from "./shop/item_page"
import add_item from "./shop_dashboard/add_item"
import admin_dashboard from "./shop_dashboard/admin_dashboard"
import edit_or_remove_item from "./shop_dashboard/edit_or_remove_item"
import login from "./shop_dashboard/login"
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/shop" component={shop} />
      <Route path="/:id" component={item_page} />
      <Route path="/login" component={login} />
      <Route path="/admin" component={admin_dashboard} />
      <Route path="/add" component={add_item} />
      <Route path="/edit" component={edit_or_remove_item} />
    </Router>
  );
}

export default App;
