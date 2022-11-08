import { FILTER_COUNTRIES_BY_NAME, FIND_COUNTRY_BY_ID, GET_ALL_COUNTRIES, GET_COUNTRIES } from "../actions/countryActions";

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
        default:
            return { ...state }
    }
}