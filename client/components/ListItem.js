import React from "react";

const ListItem = (props) => {
    return (
        <div>
            Name: {props.name} <br/>
            Address: {props.address_street}, {props.address_city}, {props.address_state}, {props.address_zipcode} <br/>
            Category: {props.location_category} <br/>
            Description: {props.description} <br/>
            LGBT+-focused?: {props.lgbtq_category} <br/>
            {props.safe_yes_votes} people found this location safe <br/>
            {props.safe_no_votes} people found this location unsafe <br/>
        </div>
    )
}

export default ListItem;