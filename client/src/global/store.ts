import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './reducers/authReducers';
import { userReducer } from './reducers/userReducers';
import { Store } from './types';

const reducer = combineReducers({
	auth: authReducer,
	user: userReducer,
});

export const _AUTH = 'auth';

const hasAuthInfo = localStorage.getItem(_AUTH);

const authFromLocalStorage = hasAuthInfo ? JSON.parse(hasAuthInfo) : null;

const initilaState: Store = {
	auth: authFromLocalStorage,
	user: null,
};

export const store = createStore(
	reducer,
	initilaState,
	composeWithDevTools(applyMiddleware(thunk))
);
