import axios from 'axios';

export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const CREATING_ACTIVITY = 'CREATING_ACTIVITY'

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
            console.log(res.data);
            dispatch({ type: CREATE_ACTIVITY, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
}