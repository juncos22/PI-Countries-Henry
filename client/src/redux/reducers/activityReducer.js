import {
    CLEAN_ERROR,
    CREATE_ACTIVITY,
    CREATING_ACTIVITY,
    GET_ACTIVITIES,
    GET_ERROR
} from "../actions/activityActions";

const initialState = {
    activity: {},
    activities: [],
    loading: false,
    error: ''
}

export default function activityReducer(state = initialState, action) {
    switch (action.type) {
        case CREATING_ACTIVITY:
            return {
                ...state,
                loading: true
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                loading: false,
                activity: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
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