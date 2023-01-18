import React, { useEffect, useState } from "react";
import ListContainer from "./ListContainer.js"
import MapContainer from "./MapContainer.js";

const Dash = (props) => {
    const [userLocation, setUserLocation] = useState({
        lat: 40.747760,
        lng: -73.993360,
        // lat: 40,
        // lng: -73
      })
    // on initial render, fetch safe locations based on either users current location if allowed or default location
    useEffect(() => {
        if ('geolocation' in navigator) {
            console.log('geolocation available') ;
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
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
            <MapContainer userLocation={userLocation}/>
            <ListContainer/>
        </div>
    )
}

export default Dash;