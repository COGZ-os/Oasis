const { Location } = require('../models/locationModels');
const { Op } = require('sequelize');
const dotenv = require('dotenv');
const { get } = require('../routes/authRouter');
const { MAPS_API_KEY } = process.env;
const apiKey = MAPS_API_KEY;
// import fetch from "node-fetch";
const http = require('http');

const axios = require('axios');


const locationsController = {
    async getLocations(req, res, next) {
        const { search_type, payload } = req.query;
        let conditions;
        if (search_type === 'lgbtq_category') {
            conditions = {
                lgbtq_category: payload
            }
        } else if (search_type === 'location_category') {
            conditions = {
                location_category: payload
            }
        } else if (search_type === 'name') {
            conditions = {
                name: {
                    [Op.like]: `%${payload}%`
                  }
            }
        } else if (search_type === 'address') {
            conditions = {
                address_street: {
                    [Op.like]: `%${payload}%`
                  }
            }
        } else {
            conditions = {};
        }
        try {
            const locations = await Location.findAll({
                where: conditions
            });
            res.locals.locations = locations;
            return next();
        } catch (err) {
            return next(err);
        }
    },
    
    async createLocation(req, res, next) {
        console.log('creating location');
        const {
            user_id,
            name,
            location_category,
            lgbtq_category,
            address_street,
            address_city,
            address_state,
            address_zipcode,
            description,
        } = req.body;
        
        let streetAddress = address_street + ', ' + address_city + ', ' + address_state;
        streetAddress = streetAddress.replaceAll(' ', '%20')
        let location;
        try {
            location = await getLonLatFromAddress(streetAddress);
        }
        catch(err) {
            console.log(err);
        }
        const newLocation = {
            user_id,
            name,
            location_category,
            lgbtq_category,
            address_street,
            address_city,
            address_state,
            address_zipcode,
            description,
            safe_yes_votes: 0,
            safe_no_votes: 0,
            latitude: location ? location.lat : 0,
            longitude: location ? location.lng : 0
        };
        try {
            const newLocationFromDB = await Location.create(newLocation);
            console.log(newLocationFromDB);
            res.locals.newLocation = {'newlocation': newLocationFromDB};
            return next();
        } catch (err) {
            return next(err);
        }
    },

    async voteOnLocation(req, res, next) {
        const { id, method } = req.body;
        try {
            const location = await Location.findOne({ where: { id: id } });
            let voteResult;
            if (method === 'increment') {
                voteResult = await location.increment(['safe_yes_votes'], { by: 1 });
            } else if (method === 'decrement') {
                voteResult = await location.increment(['safe_no_votes'], { by: 1 });
            }
            res.locals.updatedLocation = {updatedLocation: voteResult};
            return next();
        } catch (err) {
            return next(err);
        }
    },

}

const getLonLatFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const location = response.data.results[0].geometry.location;
        return location;
    } catch (error) {
        console.error(error);
    }
}

// {
//     "user_id": 1,
//     "name": "codesmith1",
//     "location_category": "restroom1",
//     "lgbtq_category": "safe",
//     "address_street": "1600 Amphitheatre Parkway",
//     "address_city": "Mountain View",
//     "address_state": "CA",
//     "address_zipcode": "90200",
//     "description":"idk"
// }

module.exports = locationsController