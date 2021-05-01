export const ADD_AUTH = 'ADD_AUTH';

export const REMOVE_AUTH = 'REMOVE_AUTH';

export const ADD_USER = 'ADD_USER';

export const REMOVE_USER = 'REMOVE_USER';

export interface Auth {
	token: string;
	expiresIn: number;
}

export interface Store {
	auth: Auth;
}

export type Action =
	| { type: typeof ADD_AUTH; payload: Auth }
	| { type: typeof REMOVE_AUTH; payload: null };
