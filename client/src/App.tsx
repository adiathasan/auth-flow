import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './components/routes/AppRoutes';

export const variants = {
	hidden: { scale: 0.9, opacity: 0 },
	visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
	exit: { scale: 0.9, opacity: 0 },
};

const App: React.FC = () => {
	return (
		<div className='app'>
			<Router>
				<AppRoutes />
			</Router>
		</div>
	);
};

export default App;
