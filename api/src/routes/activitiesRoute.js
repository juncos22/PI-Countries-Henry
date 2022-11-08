const express = require('express');
const { Activity, Country } = require('../db');
const activitiesRoute = express.Router();

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
        const countriesArr = await Promise.all(countries.map(id => Country.findByPk(id)))
        // console.log(countriesArr);
        const activity = await Activity.create(newActivity)
        activity.addCountries(countriesArr)
        return res.status(200).json(activity)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

module.exports = activitiesRoute