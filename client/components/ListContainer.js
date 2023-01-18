import { useContext } from "react";
import React from "react";
import ListItem from "./ListItem.js";
import { DataContext } from "./App.js";

const receivedData = useContext(DataContext);

const ListContainer = (props) => {
    const toRender = [];
    receivedData.forEach(location => {
        toRender.push(<ListItem 
            name={location.name}
            location_category={location.location_category}
            lgbtq_category={location.lgbtq_category}
            address_street={location.address_street}
            address_city={location.address_city}
            address_state={location.address_state}
            address_zipcode={location.address_zipcode}
            safe_yes_votes={location.safe_yes_votes}
            safe_no_votes={location.safe_no_votes}
            description={location.description}/>)
    })
    return (
        <div>
            {toRender}
        </div>
    )
}

export default ListContainer;