import React, { Dispatch } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import { Action, REMOVE_AUTH } from '../../global/types';
import Layout from '../../components/layout/Layout';

const ProfileScreen: React.FC = () => {
	const dispatch = useDispatch<Dispatch<Action>>();

	return (
		<Layout title='Profile'>
			<h1>Profile</h1>
			<Button
				type='dashed'
				onClick={() => {
					dispatch({ type: REMOVE_AUTH });
				}}
			>
				Logout
			</Button>
		</Layout>
	);
};

export default ProfileScreen;
