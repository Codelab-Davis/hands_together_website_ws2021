import react, { useState, useEffect } from "react"; 
import "../../css/view_shop_items.css";
import EventTile1 from "../../images/EventTile1.png";
import Modal from 'react-modal';
import modal_x from "../../images/modal_x.png";   
const axios = require('axios'); 

function ViewVolunteers() { 
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
        if (itemArray.data[nextIndex - 7] != undefined) { // there are previous items to go back to
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
        axios.get('http://localhost:5000/volunteer/get_volunteers')
            .then( res => {
                let res_data = res.data; 
                res_data.sort(function (b, a) {
                    //when you get date objects from MongoDB, it will no longer recognize them as date objects, that's why we make a_date and b_date as new date objects
                    let a_date = new Date(a.createdAt);
                    let b_date = new Date(b.createdAt);
                    //we convert is back to milisecond value, then we return the difference. Works like sort in C++, positive value will put a first, negative will put b first. 
                    return (a_date.getTime() - b_date.getTime());
                }) 
                update({data: res_data});
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

    function formatDate(date) { 
        let dateString = new Date(date).toLocaleString('en-US'); 
        dateString = dateString.substring(0, dateString.lastIndexOf(":")) + " " + dateString.substring(dateString.length - 2); 
        return dateString; 
    }

    return ( 
        <div className="container-fluid p-0">
            <div className="row no-gutters view-container"> 
                <h1 className="title-text" style={{paddingLeft: "0"}}>Volunteer Sign-Ups</h1>
                <p className="title-text"><br/>{
                    "Showing " + (6 * (curPage - 1) + 1) + "-" 
                    + Math.min((6 * curPage), itemArray.data.length) 
                    + " of " + itemArray.data.length + " results"
                }</p> 
                <div className="col-12">
                    <div className="row">
                        { items && items.length > 0 ?
                            items.map((itemIter, index) =>
                            <div className="col-12 col-md-4" style={{marginBottom: "3rem"}}> 
                                <h1>{itemIter.name}</h1>
                                <p><strong>Date Signed Up:</strong> {formatDate(itemIter.createdAt)}</p>
                                <p><strong>Age:</strong> {itemIter.age}</p>
                                <p><strong>Phone Number</strong> {itemIter.phone_number}</p>
                                <p><strong>Email</strong> {itemIter.email}</p>
                                <p><strong>Questions/Concerns:</strong> {itemIter.questions_concerns}</p>
                            </div> 
                            )
                            : <p style={{marginTop: "5rem"}}>There are no signed up volunteers.</p>
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
        </div>
    );
}

export default ViewVolunteers; 