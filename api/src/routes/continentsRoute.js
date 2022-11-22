const express = require('express');
const axios = require('axios');
const continentsRoute = express.Router();
const { conn } = require('../db');

continentsRoute.get('/', async (req, res) => {
    try {
        let continents = await conn.model('Countries').findAll({
            attributes: ['continent'],
            group: ['continent']
        })
        if (continents.length) {
            continents = continents.map(c => c.continent)
            return res.status(200).json(continents)
        }
        const response = await axios.get('https://restcountries.com/v3/all')
        response.data.map(d => {
            if (!continents.includes(d.continents[0])) {
                continents.push(d.continents[0])
            }
        })
        return res.status(200).json(continents)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = continentsRoute