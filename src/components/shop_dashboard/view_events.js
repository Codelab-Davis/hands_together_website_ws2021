import react, { useState, useEffect } from "react"; 
import "../../css/view_shop_items.css";
import EventTile1 from "../../images/EventTile1.png";
import Modal from 'react-modal';
import ViewPastEvents from "./view_past_events";
import modal_x from "../../images/modal_x.png";   
const axios = require('axios');

function ViewEvents() { 
    // MODAL STATES, FUNCTIONS, AND STYLING START BELOW 
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [volunteerModalIsOpen, setVolunteerModalIsOpen] = useState(false); 
    const [curEvent, setCurEvent] = useState(); 
    const [curEventVolunteers, setCurEventVolunteers] = useState(); 

    function openModal(cur_event) { 
        setCurEvent(cur_event); 
        setModalIsOpen(true); 
    } 

    function openVolunteerModal(cur_event) { 
        setCurEvent(cur_event); 
        setVolunteerModalIsOpen(true); 
    } 

    function closeVolunteerModal() { 
        setVolunteerModalIsOpen(false); 
    } 
    
    function closeModal(){ 
        setModalIsOpen(false); 
    } 

    const customModalStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            width                 : '50%',
            transform             : 'translate(-50%, -50%)'
        }
    };


    // LOADING ALL ITEMS AND PAGINATION STARTS BELOW 
    const [itemArray, update] = useState({data: []});
    // initialize an empty array using UseState. Next value assignment, use setCurItems
    const [items, setCurItems] = useState([]);
    // intialize an integer that holds the value of the next index after slicing. 
    const [nextIndex, setNextIndex] = useState(0);
    const [curPage, setCurPage] = useState(1);

    // triggered on the "next" button click 
    function next() {
        if (itemArray.data[nextIndex] != undefined) { // there are more items to see 
        //slice the next 6 items in the data array. 
        setCurItems(itemArray.data.slice(nextIndex, nextIndex + 6));
        //set the next index to the first in the next set of 6 objects
        setNextIndex(nextIndex + 6);
        setCurPage(curPage + 1);
        }
    }
    // triggered on the "back" button click 
    function back() {
        if (itemArray.data[nextIndex - 13] != undefined) { // there are previous items to go back to
        setCurItems(itemArray.data.slice(nextIndex - 12, nextIndex - 6));
        setNextIndex(nextIndex - 6);
        setCurPage(curPage - 1);
        }
    }
    function handlePageClick(event) {
        setCurPage(event.target.id);
        setNextIndex(((event.target.id - 1) * 6) + 6);
        setCurItems(itemArray.data.slice((event.target.id - 1) * 6, ((event.target.id - 1) * 6) + 6));
    }

    function formatDate(date) { 
        let new_date = new Date(date); 
        let out_str = ""; 
        for (let i = 0; i <= 4; i++) { 
            out_str += new_date.toString().split(" ")[i] + " "; 
        }
        return out_str; 
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/event/get_all_events')
        .then( res => {
        console.log(res);
        // assign json data to itemArray 
        let today = new Date().setHours(0,0,0,0); 
        let new_data = []; 
        for (let i = 0; i < res.data.length; i++) { 
            if (new Date(res.data[i].date).getTime() > today) 
                new_data.push(res.data[i]); 
        } 
        update({data: new_data});
        })
        .catch ( err => {console.log(err)})
    }, []) 

    useEffect(()=>{
        setNextIndex(((curPage - 1) * 6) + 6);
        setCurItems(itemArray.data.slice((curPage - 1) * 6, ((curPage - 1) * 6) + 6));
    }, [itemArray]) 

    useEffect(() => { 
        if (curEvent == undefined) 
            return; 

        axios.get('http://localhost:5000/volunteer/get_by_event', { params: { event_id: curEvent._id.toString()}}) 
            .then((res) => { 
                console.log(res.data); 
                setCurEventVolunteers(res.data); 
            }) 
            .catch((error) => { 
                console.log("Error getting volunteers", error); 
            })
    }, [curEvent]); 

    function deleteCurEvent() { 
        axios.delete(`http://localhost:5000/event/delete_event/${curEvent._id}`) 
            .then(() => {
                let new_items = [];  
                for (let i = 0; i < items.length; i++) { 
                    if (items[i]._id != curEvent._id) 
                        new_items.push(items[i]); 
                } 
                setCurItems(new_items); 
                closeModal(); 
            }) 
            .catch((error) => { 
                console.log("Error deleting event", error); 
            }) 
    } 

    function determineImage(imgFile) { 
        if (imgFile != undefined) { 
            console.log("in if statement"); 
            return `url(${imgFile})`; 
        }
        else { 
            console.log("in else statement"); 
            return `url(${EventTile1})`; 
        }
    } 

    return ( 
        <div className="container-fluid p-0">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Modal"
                style={customModalStyles}
            >
                <div className="col-12" align="right">
                    <img src={modal_x} onClick={closeModal} style={{cursor: "pointer"}} /> 
                </div>
                <h1>Are you sure that you want to permenantly delete this event?</h1> 
                <button className="decline-button" onClick={closeModal}>Cancel</button>
                <button className="confirm-button" onClick={deleteCurEvent}>Confirm</button>
            </Modal>
            <Modal
                isOpen={volunteerModalIsOpen}
                onRequestClose={closeVolunteerModal}
                contentLabel="Volunteers"
                style={customModalStyles}
            >
                <div className="col-12" align="right">
                    <img src={modal_x} onClick={closeVolunteerModal} style={{cursor: "pointer"}} /> 
                </div>
                {curEventVolunteers != undefined && curEventVolunteers.length > 0 ? 
                    <div className="row no-gutters">
                        <div className="col" /> 
                        { curEventVolunteers.map((itemIter, index) => 
                            <div className="col-12 col-md-4"> 
                                <h1>{itemIter.name}</h1>
                                <p><strong>Age:</strong> {itemIter.age}</p>
                                <p><strong>Gender:</strong> {itemIter.gender}</p>
                                <p><strong>Phone Number</strong> {itemIter.phone_number}</p>
                                <p><strong>Email</strong> {itemIter.email}</p>
                                <p><strong>Questions/Concerns:</strong> {itemIter.questions_concerns}</p>
                            </div> 
                        )}
                        <div className="col" /> 
                    </div>
                : 
                    <h1>There are currently no volunteers for this event.</h1>
                }
            </Modal> 
            <div className="row no-gutters view-container"> 
                <h1 className="title-text" style={{paddingLeft: "0"}}>Upcoming Events</h1>
                <p className="title-text"><br/>{
                    "Showing " + (6 * (curPage - 1) + 1) + "-" 
                    + Math.min((6 * curPage), itemArray.data.length) 
                    + " of " + itemArray.data.length + " results"
                }</p> 
                <div className="col-12">
                    <div className="row">
                        { items && items.length > 0 ?
                            items.map((itemIter, index) =>
                            <div class="event-tile-container col-12 col-md-4" style={{marginBottom: "3rem"}}>
                            <div className="event-image" style={{backgroundImage: determineImage(itemIter.image)}} />
                                <div className="event_tile_banner" align="left">
                                    <h3>{itemIter.name}</h3>
                                    <p>{itemIter.description}</p>
                                    <p><strong>Location:</strong> {itemIter.location}</p>
                                    <p><strong>Date:</strong> {formatDate(itemIter.date)}</p>
                                </div>
                                <div className="row no-gutters" style={{marginTop: "1rem", width: "85%"}}> 
                                    <div className="col-4"> 
                                        <p>Volunteers: {itemIter.volunteer_amount}</p>
                                    </div>
                                    <div className="col-4">
                                        <button onClick={() => openModal(itemIter)}>Delete Event</button> 
                                    </div> 
                                    <div className="col-4" style={{paddingLeft: "1.25rem"}}>
                                        <button onClick={() => openVolunteerModal(itemIter)}>View volunteers</button>
                                    </div> 
                                </div> 
                            </div>
                            )
                            : <p style={{marginTop: "5rem"}}>There are no upcoming events.</p>
                        }
                        <div className="col-12" /> 
                    </div>
                </div>

                <nav aria-label="pages" style={{marginBottom: "3rem"}}> 
                {items.length > 0 ? <button className="back-button" tabIndex="-1" onClick={back}>Back</button> : <></>} 
                {(() => {
                    // Generate one button for each page
                    let pageList = [];
                    for (let i = 0; i < Math.ceil(parseFloat(itemArray.data.length) / 6); i++) {
                    pageList.push(
                        <button className="page-num-button" key={i} id={i + 1} onClick={handlePageClick}>{i + 1}</button>
                    )
                    }
                    return pageList;
                })()}
                {items.length > 0 ? <button className="next-button" tabIndex="-2" onClick={next}>Next</button> : <></>} 
                </nav>
            </div>
            <ViewPastEvents /> 
        </div>
    );
}

export default ViewEvents; 