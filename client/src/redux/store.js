import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import countryReducer from './reducers/countryReducer';
import activityReducer from './reducers/activityReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ countryReducer, activityReducer })

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);