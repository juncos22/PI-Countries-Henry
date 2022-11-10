import axios from 'axios';

export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const CREATING_ACTIVITY = 'CREATING_ACTIVITY'

const baseUrl = 'http://localhost:3001';

export function createActivity(name, difficulty, duration, season, countries) {
    return async function (dispatch) {
        dispatch({ type: CREATING_ACTIVITY })
        axios.post(`${baseUrl}/activities`, {
            name,
            difficulty,
            duration,
            season,
            countries
        }).then(res => {
            console.log(res.data);
            dispatch({ type: CREATE_ACTIVITY, payload: res.data })
        }).catch(error => console.log(error))
    }
}