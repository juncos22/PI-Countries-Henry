import {
    FILTER_BY_ACTIVITY,
    FILTER_BY_CONTINENT,
    FILTER_COUNTRIES_BY_NAME,
    FIND_COUNTRY_BY_ID,
    GET_ALL_COUNTRIES,
    GET_CONTINENTS,
    GET_COUNTRIES,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_ERROR,
    CLEAN_ERROR
} from "../actions/countryActions";

const initialState = {
    countries: [],
    countryDetail: {},
    continents: [],
    loading: false,
    error: ''
}

export default function countryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                loading: false,
                countries: action.payload
            }
        case FILTER_COUNTRIES_BY_NAME:
            return {
                ...state,
                loading: false,
                countries: action.payload
            }
        case FIND_COUNTRY_BY_ID:
            return {
                ...state,
                loading: false,
                countryDetail: action.payload
            }
        case FILTER_BY_CONTINENT:
            return {
                ...state,
                countries: action.payload
            }
        case FILTER_BY_ACTIVITY:
            return {
                ...state,
                countries: action.payload,
                loading: false
            }
        case ORDER_BY_NAME:
            return {
                ...state,
                countries: action.payload,
                loading: false
            }
        case ORDER_BY_POPULATION:
            return {
                ...state,
                countries: action.payload,
                loading: false
            }
        case GET_CONTINENTS:
            return {
                ...state,
                continents: action.payload
            }
        case GET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CLEAN_ERROR:
            return {
                ...state,
                error: ''
            }
        default:
            return { ...state }
    }
}