import React, { Dispatch, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Action, REMOVE_AUTH, Store } from '../../global/types';
import { useHistory } from 'react-router';

const ProfileScreen: React.FC = () => {
	const dispatch = useDispatch<Dispatch<Action>>();

	const { replace } = useHistory();

	const auth = useSelector((state: Store) => state.auth);

	useEffect(() => {
		if (!auth) replace('/login');
	}, [auth]);

	return (
		<div>
			<h1>Profile</h1>
			<Button
				type='dashed'
				onClick={() => {
					dispatch({ type: REMOVE_AUTH });
				}}
			>
				Logout
			</Button>
		</div>
	);
};

export default ProfileScreen;
