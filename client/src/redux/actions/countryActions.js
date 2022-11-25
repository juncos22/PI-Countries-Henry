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
export const GET_ERROR = 'GET_ERROR'
export const CLEAN_ERROR = 'CLEAN_ERROR'

const baseUrl = 'https://picountries-v1.up.railway.app';

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
            dispatch({ type: GET_ERROR, payload: error.message })
            setTimeout(() => {
                dispatch({ type: CLEAN_ERROR })
            }, 2000);
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
            dispatch({ type: GET_ERROR, payload: error.message })
            setTimeout(() => {
                dispatch({ type: CLEAN_ERROR })
            }, 2000);
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
            dispatch({ type: GET_ERROR, payload: error.message })
            setTimeout(() => {
                dispatch({ type: CLEAN_ERROR })
            }, 2000);
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
            dispatch({ type: GET_ERROR, payload: error.message })
            setTimeout(() => {
                dispatch({ type: CLEAN_ERROR })
            }, 2000);
        }
    }
}
