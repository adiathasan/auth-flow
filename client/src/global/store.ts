import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './reducers/authReducers';
import { Store } from './types';

const reducer = combineReducers({
	auth: authReducer,
});

export const _AUTH = 'auth';

const hasAuthInfo = localStorage.getItem(_AUTH);

const authFromLocalStorage = hasAuthInfo ? JSON.parse(hasAuthInfo) : null;

const initilaState: Store = {
	auth: authFromLocalStorage,
};

export const store = createStore(
	reducer,
	initilaState,
	composeWithDevTools(applyMiddleware(thunk))
);
