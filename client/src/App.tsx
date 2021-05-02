import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './components/routes/AppRoutes';

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
