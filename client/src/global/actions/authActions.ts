import { Dispatch } from 'react';
import { _AUTH } from '../store';
import { Action, Auth } from '../types';

/*

    []- Notice that I could have used actions before dispatching it.
    []- Instead I dispatched directly as I'm using graphQl hooks where
    []- I get more flexibiliity for dispatching. 

*/

export const action = () => null;

export const loginAction = (data: Auth) => (dispatch: Dispatch<Action>) => {
	localStorage.setItem(_AUTH, JSON.stringify(data));

	dispatch({ type: 'ADD_AUTH', payload: data });
};

export const logoutAction = () => (dispatch: Dispatch<Action>) => {
	localStorage.clear();

	dispatch({ type: 'REMOVE_AUTH' });
	dispatch({ type: 'REMOVE_USER' });
};
