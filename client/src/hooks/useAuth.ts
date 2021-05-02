import { Dispatch, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { LOGIN_USER } from '../graphql/mutations/loginMutation';
import { Action, ADD_AUTH, Auth, Store } from '../global/types';
import { REGEISTER_USER } from '../graphql/mutations/registerMutation';

const useAuth = () => {
	const { replace } = useHistory();

	const auth = useSelector((state: Store) => state.auth);

	const dispatch = useDispatch<Dispatch<Action>>();

	const [login, { loading, data }] = useMutation<{ login: Auth }>(LOGIN_USER);

	const [register, { loading: registerLoading }] = useMutation<{
		createUser: { _id: string };
	}>(REGEISTER_USER);

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

	return { login, loading, registerLoading, register };
};

export default useAuth;
