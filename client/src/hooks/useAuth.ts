import { Dispatch, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { LOGIN_USER } from '../graphql/mutations/loginMutation';
import { Action, ADD_AUTH, Auth, Store } from '../global/types';
import { useHistory } from 'react-router';

const useAuth = () => {
	const { replace } = useHistory();

	const auth = useSelector((state: Store) => state.auth);

	const dispatch = useDispatch<Dispatch<Action>>();

	const [login, { loading, data }] = useMutation<{ login: Auth }>(LOGIN_USER);

	useEffect(() => {
		if (auth) {
			replace(`/profile/${auth.userId}`);
		}
	}, [auth]);

	useEffect(() => {
		if (data) {
			dispatch({ type: ADD_AUTH, payload: data.login });
		}
	}, [data]);

	return { login, loading };
};

export default useAuth;
