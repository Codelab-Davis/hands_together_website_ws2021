import React, { useEffect } from 'react';
import "../../css/cancel_donation.css";
import { useParams } from "react-router";
const axios = require('axios');

function CancelDonation() {
    let id = useParams();

    useEffect(() => {
        axios.post('http://localhost:5000/stripe/cancel_donate/' + id.id)
    }, [])
    
    return(
        <div>
        <h1 className="cancel-donation-header">Cancelled Recurring Donation</h1>
        <p className="cancel-donation-text">We’ve processed your request and cancelled your recurring donation. A confirmation email should be on its way.</p>
        </div>
    )
}

export default CancelDonation;