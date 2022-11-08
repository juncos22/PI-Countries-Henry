import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countryReducer from './reducers/countryReducer';
import activityReducer from './reducers/activityReducer';

const reducers = combineReducers({ countryReducer, activityReducer })
const store = createStore(reducers, applyMiddleware(thunk));

export default store;