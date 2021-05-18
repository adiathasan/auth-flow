import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LOGIN_USER } from '../graphql/mutations/loginMutation';
import { Auth, Store } from '../global/types';
import { REGEISTER_USER } from '../graphql/mutations/registerMutation';
import { loginAction } from '../global/actions/authActions';

const useAuth = () => {
	const { replace } = useHistory();

	const auth = useSelector((state: Store) => state.auth);

	const dispatch = useDispatch();

	const [login, { loading, data }] = useMutation<{ login: Auth }>(LOGIN_USER);

	const [register, { loading: registerLoading }] =
		useMutation<{
			createUser: { _id: string };
		}>(REGEISTER_USER);

	useEffect(() => {
		if (auth) {
			replace(`/profile/${auth.userId}`);
		}
	}, [auth, replace]);

	useEffect(() => {
		if (data) {
			dispatch(loginAction(data.login));
		}
	}, [data, dispatch]);

	return { login, loading, registerLoading, register };
};

export default useAuth;
