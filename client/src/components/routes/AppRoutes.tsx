import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import LoginScreen from '../../screens/loginScreen/LoginScreen';
import AuthRoute from './AuthRoutes';

const AppRoutes: React.FC = () => {
	return (
		<Switch>
			{/* authenticated routes */}
			<AuthRoute path='/profile/:id' component={ProfileScreen} exact />

			{/* common routes */}

			<Route path='/login' component={LoginScreen} exact />

			{/* redirects */}

			<Redirect path='/' to='/login' exact />

			{/* 404 */}

			<Route component={() => <h1>OOPS || 404 page</h1>} />
		</Switch>
	);
};

export default AppRoutes;
