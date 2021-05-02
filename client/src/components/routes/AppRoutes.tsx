import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import LoginScreen from '../../screens/loginScreen/LoginScreen';
import RegisterScreen from '../../screens/registerScreen/RegisterScreen';
import AuthRoute from './AuthRoutes';
import Error from '../../screens/error/Error';

const AppRoutes: React.FC = () => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.key}>
				{/* authenticated routes */}
				<AuthRoute path='/profile/:id' component={ProfileScreen} exact />

				{/* common routes */}

				<Route path='/login' component={LoginScreen} exact />

				<Route path='/register' component={RegisterScreen} exact />

				{/* redirects */}

				<Redirect path='/' to='/login' exact />

				{/* 404 */}

				<Route component={Error} />
			</Switch>
		</AnimatePresence>
	);
};

export default AppRoutes;
