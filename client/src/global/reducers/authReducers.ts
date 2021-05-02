import { _AUTH } from '../store';
import { Action, ADD_AUTH, Auth, REMOVE_AUTH } from '../types';

export const authReducer = (state: Auth | null = null, action: Action) => {
	switch (action.type) {
		case ADD_AUTH:
			localStorage.setItem(_AUTH, JSON.stringify(action.payload));

			return { ...action.payload };

		case REMOVE_AUTH:
			localStorage.clear();

			return null;

		default:
			return state;
	}
};
