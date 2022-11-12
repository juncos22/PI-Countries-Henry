import { CREATE_ACTIVITY, CREATING_ACTIVITY, GET_ACTIVITIES } from "../actions/activityActions";

const initialState = {
    activity: {},
    activities: [],
    loading: false
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
        default:
            return { ...state }
    }
}