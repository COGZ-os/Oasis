import React, { useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent.js";
import MAPS_API_KEY from "../../env_workaround.js"


const MapContainer = () => {
  const [center, setCenter] = useState({
    lat: 40.747760,
    lng: -73.993360,
  });
  const [zoom, setZoom] = useState(4);

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <div>LOADING</div>;
      case Status.FAILURE:
        return <div>FAILED TO LOAD MAP</div>;
      case Status.SUCCESS:
        return <MapComponent className="myMap"/>;
    }
  };

  return (
    <Wrapper apiKey={MAPS_API_KEY} render={render}/>
  )
};

export default MapContainer;