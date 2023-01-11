import {createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tripReducer from './reducers';

const rootReducer = combineReducers({ tripReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
