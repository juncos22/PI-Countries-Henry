import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const FILTER_COUNTRIES_BY_NAME = 'FILTER_COUNTRIES_BY_NAME'
export const FIND_COUNTRY_BY_ID = 'FIND_COUNTRY_BY_ID'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const ORDER_BY_NAME_ASC = 'ORDER_BY_NAME'
export const ORDER_BY_NAME_DESC = 'ORDER_BY_NAME_DESC'
export const ORDER_BY_POPULATION_ASC = 'ORDER_BY_POPULATION_ASC'
export const ORDER_BY_POPULATION_DESC = 'ORDER_BY_POPULATION_DESC'

const baseUrl = 'http://localhost:3001';

export function getAllCountries() {
    return function (dispatch) {
        dispatch({ type: GET_COUNTRIES })
        axios.get(`${baseUrl}/countries`)
            .then(res => dispatch({ type: GET_ALL_COUNTRIES, payload: res.data }))
            .catch(error => console.log(error))
    }
}

export function filterCountriesByName(name) {
    return function (dispatch) {
        dispatch({ type: GET_COUNTRIES })
        axios.get(`${baseUrl}/countries?name=${name}`)
            .then(res => {
                console.log(res.data);
                dispatch({ type: FILTER_COUNTRIES_BY_NAME, payload: res.data })
            }).catch(error => console.log(error))
    }
}

export function findCountryById(idPais) {
    return function (dispatch) {
        dispatch({ type: GET_COUNTRIES })
        axios.get(`${baseUrl}/countries/${idPais}`)
            .then(res => {
                console.log(res.data);
                dispatch({ type: FIND_COUNTRY_BY_ID, payload: res.data })
            }).catch(error => console.log(error))
    }
}

export function filterByContinent(continent) {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent
    }
}

export function filterByActivity(activity) {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity
    }
}

export function orderByNameAsc() {
    return {
        type: ORDER_BY_NAME_ASC
    }
}

export function orderByNameDesc() {
    return {
        type: ORDER_BY_NAME_DESC
    }
}

export function orderByPopulationAsc() {
    return {
        type: ORDER_BY_POPULATION_ASC
    }
}

export function orderByPopulationDesc() {
    return {
        type: ORDER_BY_POPULATION_DESC
    }
}
