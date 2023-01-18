import React, { useState } from "react";
import { Chip } from "@mui/material";

const ListItem = (props) => {
    const [votes, incrementVotes] = useState({
        yes: props.safe_yes_votes,
        no: props.safe_no_votes,
    })

    const handleVote = (method, id) => {
        const voteMethod = (method === 'increment') ? 'yes' : 'no';
        const newVotes = {...votes};
        newVotes[voteMethod]++;
        incrementVotes(newVotes);

        const body = JSON.stringify({
            method,
            id
        })
        fetch('/locations', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body,
        })
    }


    return (
        <div className="list_item">
            <strong>{props.name}</strong> <br/>
            Address: {props.address_street}, {props.address_city}, {props.address_state}, {props.address_zipcode} <br/>
            Category: {props.location_category} <br/>
            Description: {props.description} <br/>
            LGBT+-focused?: {props.lgbtq_category} <br/>
            <b>{votes.yes}</b> people found this location <b>safe</b><br/>
            <b>{votes.no}</b> people found this location <b>unsafe</b> <br/>
            <br/>
            <em id="safety_query">Have you found this place to be safe?</em> <br/>
            <div className="chip_tray">
                <Chip 
                    label="yeah" 
                    variant="outlined" 
                    sx={{marginLeft: "1rem", marginRight: "1rem", borderColor: "salmon"}}
                    onClick={() => handleVote('increment', props.id)}
                >
                    Yeah
                </Chip> 
                <Chip 
                    label="nah" 
                    variant="outlined" 
                    sx={{borderColor: "salmon"}}
                    onClick={() => handleVote('decrement', props.id)}
                >
                    Nah
                </Chip>
            </div>
        </div>
    )
}

export default ListItem;