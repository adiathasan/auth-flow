import { useMutation } from '@apollo/client';
import React from 'react';
import { LOGIN_USER } from '../graphql/mutations/loginMutation';

const useAuth = () => {
	const [login, { loading, data, error }] = useMutation(LOGIN_USER);

	return { login, loading };
};

export default useAuth;
