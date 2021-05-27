import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import "../../css/admin_dashboard.css";
import kid from "../../images/kid.png";  
import { propTypes } from "react-bootstrap/esm/Image";
import { useHistory } from "react-router-dom";
const axios = require('axios');

//https://react-bootstrap.github.io/components/modal/#modal-dialog-props
//https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

function Admin_Dashboard(props) {
  let history = useHistory();
  const [curAnnouncement, setCurAnnouncement] = useState({}); 
  const [curAnnouncementText, setCurAnnouncementText] = useState(""); 
  const [newAnnouncement, setNewAnnouncement] = useState(""); 
  const [statusMessage, setStatusMessage] = useState(""); 

  function logout() {
    axios.delete('https://db.handstogether-sa.org/jwt/deleteRefreshToken', { withCredentials: true })
     .then(() => window.location.assign('https://handstogether-sa.org'))
  }

  useEffect(() => { 
    axios.get('https://db.handstogether-sa.org/announcements/get_announcement', { withCredentials: true })
      .then((res) => {
        // console.log(res.data); 
        // console.log(res.data[0]); 
        setCurAnnouncement(res.data[0]); 
        setCurAnnouncementText(res.data[0].text); 
      }) 
      .catch((error) => console.log("Error getting announcement:", error)); 
  }, []);

  function onNewAnnouncementChange(event) { 
    setNewAnnouncement(event.target.value); 
  }

  function deleteCurrentAnnouncement() { 
    if (curAnnouncement != undefined && curAnnouncement._id != undefined && curAnnouncement._id != "") { 
      axios.delete(`https://db.handstogether-sa.org/announcements/delete_announcement/${curAnnouncement._id}`, { withCredentials: true })
        .then(() => { 
          setCurAnnouncement({});
          setCurAnnouncementText("");
          setStatusMessage("Announcement successfully deleted");
        })
        .catch((error) => {
          console.log("Error Deleting Announcement:", error)
          setStatusMessage("You cannot delete this announcement right now. This might be because there is no announcement right now, or you need to refresh the page."); 
        });
    } 
    else { 
      setStatusMessage("You cannot delete this announcement right now. This might be because there is no announcement right now, or you need to refresh the page."); 
    }
  }
  
  function addAnnouncement() {
    if (newAnnouncement.length == 0) {
      setStatusMessage("Please enter an announcement."); 
      return; 
    } 

    const new_announcement = { 
      "text": newAnnouncement,
    }
    
    // console.log(curAnnouncement); 
    if (curAnnouncement != undefined && curAnnouncement._id != undefined && curAnnouncement._id != "") { 
      axios.delete(`https://db.handstogether-sa.org/announcements/delete_announcement/${curAnnouncement._id}`, { withCredentials: true })
        .then(() => add(new_announcement))
        .catch((error) => console.log("Error deleting announcement", error));
    } 
    else { 
      axios.get('https://db.handstogether-sa.org/announcements/get_announcement')
      .then((res) => {
        if (res.data.length == 0) { 
          add(new_announcement); 
        }
        else { 
          setStatusMessage("To modify your current announcement, please refresh the page."); 
        }
      }) 
      .catch((error) => { 
        console.log("Error getting announcement:", error); 
        setStatusMessage("There was an error updating your announcement."); 
      }); 
    } 
  }
  
  function add(new_announcement) { 
    if (new_announcement.length > 90) { 
      setStatusMessage("There is a max limit of 90 characters."); 
      return; 
    } 

    axios.post('https://db.handstogether-sa.org/announcements/add_announcement', new_announcement, { withCredentials: true }) 
      .then(() => { 
        setCurAnnouncementText(new_announcement.text);
        setCurAnnouncement({});
        setNewAnnouncement(""); 
        setStatusMessage("Announcement successfully updated. To modify this same announcement, please refresh the page."); 
      })
      .catch((error) => { 
        console.log("Error adding new announcement:", error); 
        setStatusMessage("There was an error updating your announcement."); 
      })
  }
  
  return ( 
    <div className="container-fluid p-0"> 
      <div className="row no-gutters"> 
        <div className="col-8"> 
          <h1 className="title-text">Welcome to your admin dashboard!</h1>
        </div> 
        <div className="col-4" align="right">
          <button className="submit-button" onClick={logout}>Log Out</button>
        </div>
        <a className="col-5 admin-box" onClick={() => history.push("add_shop_item")}>
          <h2 className="text-padding">Add Shop Items</h2> 
          <p className="text-padding">Click here to add a new item to your shop!</p>  
        </a> 
        <a className="col-5 admin-box" onClick={() => history.push("add_event")}>
          <h2 className="text-padding">Add an event</h2> 
          <p className="text-padding">Click here to create a new event!</p>  
        </a> 
        <a className="col-5 admin-box" onClick={() => history.push("view_shop_items")}>
          <h2 className="text-padding">View Listed and Sold Shop Items</h2> 
          <p className="text-padding">Click here to view your active shop listings and all sold shop items.</p>  
        </a> 
        <a className="col-5 admin-box" onClick={() => history.push("view_events")}>
          <h2 className="text-padding">View Listed Events and Volunteers</h2> 
          <p className="text-padding">Click here to view your listed events and the volunteers signed up for each one.</p>  
        </a>
        <div className="admin-box" style={{cursor: "default", paddingLeft: "1rem"}}>
          <h2 style={{marginTop: "1rem"}}>Edit Announcement</h2>
          <p>Current Announcement: <strong>{curAnnouncementText}</strong></p>
          <button className="submit-button" style={{marginBottom: "0.5rem", width: "18rem"}} onClick={deleteCurrentAnnouncement}>Delete Current Announcement</button>
          <div className="row no-gutters listing-input"> 
            <p style={{marginTop: "1rem", marginRight: "1rem"}}>New Announcement:</p>
              <div className="col-10 col-md-6">
                  <input type="text" placeholder="New Announcement" value={newAnnouncement} onChange={onNewAnnouncementChange} /> 
              </div>
              <p>Max 90 characters</p>
          </div>
          <button className="submit-button" style={{marginBottom: "0.5rem", width: "16rem"}} onClick={addAnnouncement}>Create New Announcement</button>
          <p style={{marginBottom: "2rem"}}>{statusMessage}</p>
        </div>  
      </div>
    </div>
  );
}

export default Admin_Dashboard;
