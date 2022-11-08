import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const FILTER_COUNTRIES_BY_NAME = 'FILTER_COUNTRIES_BY_NAME'
export const FIND_COUNTRY_BY_ID = 'FIND_COUNTRY_BY_ID'

const baseUrl = 'http://localhost:3001';

export function getAllCountries() {
    return async function (dispatch) {
        try {
            dispatch({ type: GET_COUNTRIES })
            const res = await axios.get(`${baseUrl}/countries`)
            console.log(res.data);
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
            console.log(res.data);
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
            console.log(res.data);
            dispatch({ type: FIND_COUNTRY_BY_ID, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}