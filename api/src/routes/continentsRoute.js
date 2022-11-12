const express = require('express');
const continentsRoute = express.Router();
const { conn } = require('../db');

continentsRoute.get('/', async (req, res) => {
    try {

        let continents = await conn.model('Countries').findAll({
            attributes: ['continent'],
            group: ['continent']
        })
        // continents = continents.map(c => c.continent)
        return res.status(200).json(continents)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = continentsRoute