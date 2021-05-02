import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import LoginScreen from '../../screens/loginScreen/LoginScreen';
import RegisterScreen from '../../screens/registerScreen/RegisterScreen';
import OtpScreen from '../../screens/otpScreen/OtpScreen';
import Error from '../../screens/error/Error';
import AuthRoute from './AuthRoutes';

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

				<Route path='/otp/verify' component={OtpScreen} exact />

				{/* redirects */}

				<Redirect path='/' to='/login' exact />

				{/* 404 */}

				<Route component={Error} />
			</Switch>
		</AnimatePresence>
	);
};

export default AppRoutes;
