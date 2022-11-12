const express = require('express');
const countriesRoute = express.Router();
const axios = require('axios');
const { Countries, Activities, CountryActivities, conn, Op } = require('../db');
/**
 * RUTAS PERMITIDAS:
 * GET https://restcountries.com/v3/all
   GET https://restcountries.com/v3/name/{name}
   GET https://restcountries.com/v3/alpha/{code}
 */

countriesRoute.get('/', async (req, res) => {
    let { name, continent, orderByName, activityId, orderByPopulation } = req.query

    console.log(name, continent, activityId, orderByName, orderByPopulation);
    let options = {
        attributes: ['id', 'name', 'flag', 'continent']
        // where: {
        //     [Op.or]: [
        //         {
        //             name: {
        //                 [Op.like]: `%${name[0].toUpperCase() + name.slice(1)}%`
        //             },
        //         },
        //         {
        //             continent: continent,
        //         }
        //     ]
        // },
        // order: [
        //     ['name', orderByName],
        //     ['population', orderByPopulation]
        // ]
    }
    if (name) {
        options = {
            ...options,
            where: {
                name: {
                    [Op.like]: `%${name}%`
                },
            }
        }
    }
    if (continent) {
        options = {
            ...options,
            where: {
                continent: continent,
            }
        }
    }
    if (orderByName) {
        options = {
            ...options,
            order: [
                ['name', orderByName],
            ]
        }
    }
    if (orderByPopulation) {
        options = {
            ...options,
            order: [
                ['population', orderByPopulation],
            ]
        }
    }
    try {
        let countries = await conn.model('Countries').findAll(options)
        if (!countries.length) {
            const response = await axios.get('https://restcountries.com/v3/all')

            response.data.map(d => {
                countries.push({
                    id: d.cca3,
                    name: d.name.common,
                    flag: d.flags[1],
                    continent: d.continents[0],
                    subRegion: d.subregion,
                    capital: d.capital ? d.capital[0] : "N/A",
                    population: d.population,
                    area: d.area
                })
            })
            await Countries.bulkCreate(countries)

            countries = countries.map(c => (
                {
                    id: c.id,
                    name: c.name,
                    flag: c.flag,
                    continent: c.continent,
                    population: c.population,
                    Activities: c.Activities
                }
            ))
        }
        return res.status(200).json(countries)
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
        const country = await conn.model('Countries').findOne({
            attributes: ['id', 'name', 'continent', 'capital', 'flag', 'subRegion', 'area', 'population'],
            include: Activities,
            where: {
                id: idPais
            }
        })
        if (!country) {
            return res.status(404).send('Country not found')
        }
        return res.status(200).json(country.toJSON())
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

// countriesRoute.get('/continent/:continent', async (req, res) => {
//     const { continent } = req.params
//     try {
//         const countries = await conn.model('Countries').findAll({
//             where: {
//                 continent
//             }
//         })
//         return res.status(200).json(countries)
//     } catch (error) {
//         return res.status(500).send(error.message)
//     }
// })
// countriesRoute.get('/activity/:idActivities', async (req, res) => {
//     const { idActivities } = req.params
//     try {
//         // const activity = await Activities.findByPk(idActivities)
//         // console.log(activity);
//         const countries = await conn.model('Countries').findAll({
//             attributes: ['id', 'name', 'flag', 'continent'],
//             include: Activities
//         })
//         console.log(countries);
//         return res.status(200).json(countries)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error)
//     }
// })

// countriesRoute.get('/:idActivities', async (req, res) => {
//     const { idActivities } = req.params
//     try {
//         const countries = await conn.model('Countries').findAll({
//             where: {
//                 Activities: {
//                     [Op.in]: Number(idActivities)
//                 }
//             }
//         })
//         return res.status(200).json(countries)
//     } catch (error) {
//         return res.status(500).send(error.message)
//     }
// })

module.exports = countriesRoute