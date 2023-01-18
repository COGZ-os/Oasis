const { Location } = require('../models/locationModels');
const { Op } = require('sequelize');
const dotenv = require('dotenv');
const { get } = require('../routes/authRouter');
const { MAPS_API_KEY } = process.env;
const apiKey = MAPS_API_KEY;


const locationsController = {

    async getLocations(req, res, next) {
        const { search_type, lgbtq_category, location_category, name_pattern, address_pattern} = req.body;
        let conditions;
        if (search_type === 'lgbtq_category') {
            conditions = {
                lgbtq_category
            }
        } else if (search_type === 'location_category') {
            conditions = {
                location_category
            }
        } else if (search_type === 'name') {
            conditions = {
                name: {
                    [Op.like]: `%${name_pattern}%`
                  }
            }
        } else if (search_type === 'address') {
            conditions = {
                address_street: {
                    [Op.like]: `%${address_pattern}%`
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
        // '1600 Amphitheatre Parkway, Mountain View, CA'
        const streetAddress = address_street + ', ' + address_city + ', ' + address_state;
        const latLonObj = await getLonLatFromAddress(streetAddress);
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
            latitude: latLonObj.lat,
            longitude: latLonObj.lng
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
                voteResult = await location.decrement(['safe_no_votes'], { by: 1 });
            }
            res.locals.updatedLocation = {updatedLocation: voteResult};
            return next();
        } catch (err) {
            return next(err);
        }
    },

}

const getLonLatFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const location = data.results[0].geometry.location;
        return location;
    } catch (error) {
        console.error(error);
    }
}

module.exports = locationsController