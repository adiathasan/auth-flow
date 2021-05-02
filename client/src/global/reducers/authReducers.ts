import { Action, ADD_AUTH, Auth, REMOVE_AUTH } from '../types';

export const userLoginReducer = (state: Auth | null = null, action: Action) => {
	switch (action.type) {
		case ADD_AUTH:
			return { ...action.payload };

		case REMOVE_AUTH:
			return null;

		default:
			return state;
	}
};
