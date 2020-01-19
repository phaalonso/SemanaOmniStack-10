const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index -> findAll / show -> findById / store -> criar / update -> atualizar / destroy -> apagar

module.exports = {
    async index (request, response) {
        const devs = await Dev.find();
        console.log(devs);
        return response.json(devs);
    },  
    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            // console.log(apiResponse.data);
            const { name = login , avatar_url, bio } = apiResponse.data;
            console.log(name, avatar_url, bio, github_username, techs, latitude, longitude);
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
    
            dev = await Dev.create({
                github_username, 
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return response.json(dev);
    }
};