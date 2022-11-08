import { CREATE_ACTIVITY, CREATING_ACTIVITY } from "../actions/activityActions";

const initialState = {
    activity: {},
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
        default:
            return { ...state }
    }
}