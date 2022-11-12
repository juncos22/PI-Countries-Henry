const express = require('express');
const { conn } = require('../db');
const activitiesRoute = express.Router();

activitiesRoute.get('/', async (req, res) => {
    try {
        const activities = await conn.model('Activities').findAll({
            attributes: ['id', 'name']
        })
        return res.status(200).json(activities)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

activitiesRoute.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body
    // console.log({ name, difficulty, duration, season, countries });
    try {
        const newActivity = {
            name,
            difficulty,
            duration,
            season
        }
        const countriesArr = await Promise.all(countries.map(id => conn.model('Countries').findByPk(id)))
        // console.log(countriesArr);
        const activity = await conn.model('Activities').create(newActivity)
        activity.addCountries(countriesArr)
        return res.status(200).json(activity)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

module.exports = activitiesRoute