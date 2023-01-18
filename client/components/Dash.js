import React, { useEffect } from "react";
import ListContainer from "./ListContainer.js"
import MapContainer from "./MapContainer.js";

const Dash = (props) => {
    
    // on initial render, fetch safe locations based on either users current location if allowed or default location
    useEffect(() => {
        if ('geolocation' in navigator) {
            console.log('geolocation available') ;
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
            })
        } else {
            console.log('geolocation not available');
        }
        // Need to determine how to send default location with get request - header or query string?
        fetch('/locations')
            .then(response => response.json())
            .then(response => props.setReceivedData(response));
    }, [])

    return (
        <div className="dashboard">
            <MapContainer/>
            <ListContainer/>
        </div>
    )
}

export default Dash;