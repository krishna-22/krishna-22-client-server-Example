import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Comments_r} from './commentsReducer'
import {Numbers_r} from './numbersReducer'
import {Login_r} from './LogChangeReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments:Comments_r,
            login:Login_r,
            numbers:Numbers_r,
        }),applyMiddleware(thunk,logger)
    );

    return store;
}