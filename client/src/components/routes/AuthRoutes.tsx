import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const AuthRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
	if (!Component) {
		return null;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				'user' ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);
};

export default AuthRoute;
