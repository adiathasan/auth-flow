import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Store } from '../../global/types';

const AuthRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
	const auth = useSelector((state: Store) => state.auth);

	if (!Component) {
		return null;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				auth ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);
};

export default AuthRoute;
