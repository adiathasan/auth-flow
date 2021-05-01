import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import App from './App';
import { apolloClient } from './config/apolloClient';
import { store } from './global/store';
import 'antd/dist/antd.css';
import './global.scss';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={apolloClient}>
				<App />
			</ApolloProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
