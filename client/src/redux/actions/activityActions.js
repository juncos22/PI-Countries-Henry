import axios from 'axios';

export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const CREATING_ACTIVITY = 'CREATING_ACTIVITY'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const GET_ERROR = 'GET_ERROR'
export const CLEAN_ERROR = 'CLEAN_ERROR'

const baseUrl = 'http://localhost:3001';

export function createActivity(name, difficulty, duration, season, countries) {
    return async function (dispatch) {
        try {
            dispatch({ type: CREATING_ACTIVITY })
            const res = await axios.post(`${baseUrl}/activities`, {
                name,
                difficulty,
                duration,
                season,
                countries
            })
            dispatch({ type: CREATE_ACTIVITY, payload: res.data })
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_ERROR, payload: error.message })
            setTimeout(() => {
                dispatch({ type: CLEAN_ERROR })
            }, 2000);
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${baseUrl}/activities`)
            dispatch({ type: GET_ACTIVITIES, payload: res.data })
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_ERROR, payload: error.message })
            setTimeout(() => {
                dispatch({ type: CLEAN_ERROR })
            }, 2000);
        }
    }
}