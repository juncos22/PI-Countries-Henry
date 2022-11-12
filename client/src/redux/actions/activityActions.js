import axios from 'axios';

export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const CREATING_ACTIVITY = 'CREATING_ACTIVITY'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'

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
        }
    }
}