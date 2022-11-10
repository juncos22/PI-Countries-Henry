import {
    FILTER_BY_ACTIVITY,
    FILTER_BY_CONTINENT,
    FILTER_COUNTRIES_BY_NAME,
    FIND_COUNTRY_BY_ID,
    GET_ALL_COUNTRIES,
    GET_COUNTRIES,
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_POPULATION_ASC,
    ORDER_BY_POPULATION_DESC
} from "../actions/countryActions";

const initialState = {
    countries: [],
    countryDetail: {},
    loading: false
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
                countries: state.countries.filter(c => c.continent === action.payload)
            }
        case FILTER_BY_ACTIVITY:
            return {
                ...state,
                countries: state.countries.filter(c => c.activities.includes(action.payload))
            }
        case ORDER_BY_NAME_ASC:
            return {
                ...state,
                countries: state.countries.sort((c1, c2) => c1.name - c2.name)
            }
        case ORDER_BY_NAME_DESC:
            return {
                ...state,
                countries: state.countries.sort((c1, c2) => c2.name - c1.name)
            }
        case ORDER_BY_POPULATION_ASC:
            return {
                ...state,
                countries: state.countries.sort((c1, c2) => c1.population - c2.population)
            }
        case ORDER_BY_POPULATION_DESC:
            return {
                ...state,
                countries: state.countries.sort((c1, c2) => c2.population - c1.population)
            }
        default:
            return { ...state }
    }
}