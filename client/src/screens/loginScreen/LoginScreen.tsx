import React, { useState } from 'react';
import { Button } from 'antd';

import { useDispatch } from 'react-redux';
import { Action, ADD_AUTH } from '../../global/types';
import { Dispatch } from 'redux';

const LoginScreen: React.FC = () => {
	const dispatch = useDispatch<Dispatch<Action>>();

	const [value, setValue] = useState('');

	return (
		<div className='login'>
			<h1>Login</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log('//');

					dispatch({
						type: ADD_AUTH,
						payload: {
							expiresIn: 20,
							token: value,
						},
					});
				}}
			>
				<input
					type='text'
					onChange={(e) => setValue(e.target.value)}
					value={value}
					placeholder='tokenize me'
				/>
				<Button type='primary' typeof='submit'>
					submit
				</Button>
			</form>
		</div>
	);
};

export default LoginScreen;
