import { Action, ADD_USER, REMOVE_USER, User } from '../types';

export const userReducer = (state: User | null = null, action: Action) => {
	switch (action.type) {
		case ADD_USER:
			return { ...action.payload };

		case REMOVE_USER:
			return null;

		default:
			return state;
	}
};
