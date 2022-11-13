import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const FILTER_COUNTRIES_BY_NAME = 'FILTER_COUNTRIES_BY_NAME'
export const FIND_COUNTRY_BY_ID = 'FIND_COUNTRY_BY_ID'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'
export const GET_CONTINENTS = 'GET_CONTINENTS'

const baseUrl = 'http://localhost:3001';

export function getAllCountries(queryParams) {
    let params = ""
    if (queryParams) {
        queryParams.forEach(qp => {
            for (const key in qp) {
                if (Object.hasOwnProperty.call(qp, key)) {
                    // console.log(key, qp[key]);
                    params += `${key}=${qp[key]}&`
                }
            }
        })
    }
    return async function (dispatch) {
        try {
            dispatch({ type: GET_COUNTRIES })
            const res = await axios.get(`${baseUrl}/countries?${params}`)
            dispatch({ type: GET_ALL_COUNTRIES, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterCountriesByName(name) {
    return async function (dispatch) {
        try {
            dispatch({ type: GET_COUNTRIES })
            const res = await axios.get(`${baseUrl}/countries?name=${name}`)
            dispatch({ type: FILTER_COUNTRIES_BY_NAME, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}

export function findCountryById(idPais) {
    return async function (dispatch) {
        try {
            dispatch({ type: GET_COUNTRIES })
            const res = await axios.get(`${baseUrl}/countries/${idPais}`)
            dispatch({ type: FIND_COUNTRY_BY_ID, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getContinents() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${baseUrl}/continents`)
            dispatch({ type: GET_CONTINENTS, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}

// export function filterByContinent(continent) {
//     return async function (dispatch) {
//         try {
//             // dispatch({ type: GET_COUNTRIES })
//             const res = await axios.get(`${baseUrl}/countries?continent=${continent}`)
//             dispatch({ type: FILTER_BY_CONTINENT, payload: res.data })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// // order puede ser ASC o DESC
// export function orderByName(order) {
//     return async function (dispatch) {
//         try {
//             dispatch({ type: GET_COUNTRIES })
//             const res = await axios.get(`${baseUrl}/countries?orderByName=${order}`)
//             dispatch({ type: ORDER_BY_NAME, payload: res.data })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
// // order puede ser ASC o DESC
// export function orderByPopulation(order) {
//     return async function (dispatch) {
//         try {
//             dispatch({ type: GET_COUNTRIES })
//             const res = await axios.get(`${baseUrl}/countries?orderByPopulation=${order}`)
//             dispatch({ type: ORDER_BY_POPULATION, payload: res.data })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
