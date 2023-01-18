import React, { useContext } from "react";
import ListItem from "./ListItem.js";
import { DataContext } from "./App.js";


const ListContainer = (props) => {
    const receivedData = useContext(DataContext);


    const toRender = [];
    console.log('received: ', receivedData)
    for (let i = 0; i < receivedData.length; i++) {
    // receivedData.forEach(location => {
        const location = receivedData[i];

        toRender.push(<ListItem
            index={i}
            id={location.id} 
            name={location.name}
            location_category={location.location_category}
            lgbtq_category={location.lgbtq_category}
            address_street={location.address_street}
            address_city={location.address_city}
            address_state={location.address_state}
            address_zipcode={location.address_zipcode}
            safe_yes_votes={location.safe_yes_votes}
            safe_no_votes={location.safe_no_votes}
            description={location.description}
            setReceivedData={props.setReceivedData}/>)
    }
    return (
        <div className="list_container">
            {toRender.length === 0 && <p>Search for an address or business name to see results</p>}
            {toRender}
        </div>
    )
}

export default ListContainer;