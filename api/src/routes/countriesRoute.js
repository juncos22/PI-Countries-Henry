const express = require('express');
const countriesRoute = express.Router();
const axios = require('axios');
const { Country, Activity, Op } = require('../db');
/**
 * RUTAS PERMITIDAS:
 * GET https://restcountries.com/v3/all
   GET https://restcountries.com/v3/name/{name}
   GET https://restcountries.com/v3/alpha/{code}
 */

countriesRoute.get('/', async (req, res) => {
    let { name } = req.query
    try {
        if (!name) {
            const countries = await Country.findAll({
                attributes: ['name', 'flag', 'continent']
            })
            if (!countries.length) {
                const response = await axios.get('https://restcountries.com/v3/all')

                response.data.map(d => {
                    countries.push({
                        id: d.cca3,
                        name: d.name.common,
                        flag: d.flags[1],
                        continent: d.continents[0],
                        subRegion: d.subregion,
                        capital: d.capital ? d.capital[0] : "",
                        population: d.population,
                        area: d.area
                    })
                })
                await Country.bulkCreate(countries)
            }
            return res.status(200).json(countries.map(c => (
                {
                    name: c.name,
                    flag: c.flag,
                    continent: c.continent
                }
            )))
        }
        name = name[0].toUpperCase() + name.slice(1)
        // console.log(name);
        const countries = await Country.findAll({
            attributes: ['name', 'flag', 'continent'],
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        let data = countries.length ? countries : 'Country not found'
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

/**
 * Preguntar si el area está en metros para saber bien la conversión
 */
countriesRoute.get('/:idPais', async (req, res) => {
    const { idPais } = req.params
    try {
        const country = await Country.findOne({
            attributes: ['id', 'name', 'continent', 'capital', 'flag', 'subRegion', 'area', 'population'],
            include: Activity,
            where: {
                id: idPais
            }
        })
        if (!country) {
            return res.status(404).send('Country not found')
        }
        return res.status(200).json(country)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})


module.exports = countriesRoute