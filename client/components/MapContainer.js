import React, { useState, useContext } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent.js";
import Marker from "./Marker.js";
import MAPS_API_KEY from "../../env_workaround.js"
import { DataContext } from "./App.js";


const MapContainer = (props) => {
  const [zoom, setZoom] = useState(14);
  const receivedData = useContext(DataContext);
  // const render = (status) => {
  //   switch (status) {
  //     case Status.LOADING:
  //       return <div>LOADING</div>;
  //     case Status.FAILURE:
  //       return <div>FAILED TO LOAD MAP</div>;
  //     case Status.SUCCESS:
  //       return <MapComponent className="myMap" center={props.userLocation} zoom={zoom}/>;
  //   }
  // };

  const getLonLatFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_API_KEY}`;
    console.log ('url: ', url)
    try {
        const location = await fetch(url)
          .then(data => data.json())
          .then(response => {
            console.log('api response: ', response);
            return response.results[0].geometry.location
          })
        return location;
    } catch (error) {
        console.error(error);
    }
}

// iterate through the locations in received data state and pass each location as a marker to an array
// eg markers.push(<Marker position={position}>)
  const markers = [];
  receivedData.forEach(async (location) => {
    let address = `${location.address_street}, ${location.address_city}, ${location.address_state}`;
    address = address.replaceAll(' ', '%20')


    try {
      const position = await getLonLatFromAddress(address);
      console.log('position: ', position)
      markers.push(<Marker position={position} />)
    }
    catch (error) {
      console.error(error)
    }
  })

  return (
    <Wrapper apiKey={MAPS_API_KEY}>
      <MapComponent className="myMap" center={props.userLocation} zoom={zoom}>
        {markers}
      </MapComponent>
    </Wrapper>
  )
};

export default MapContainer;