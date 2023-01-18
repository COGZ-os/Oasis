import React from "react";
import ListContainer from "./ListContainer.js"
import MapContainer from "./MapContainer.js";

const Dash = () => {
    return (
        <div className="dashboard">
            <MapContainer/>
            <ListContainer/>
        </div>
    )
}

export default Dash;