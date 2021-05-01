import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

interface Auth {
	token: string;
}

const authLink = setContext((_, { headers }) => {
	// get the token from local storage if it exists

	const auth: Auth = localStorage.getItem('auth')
		? JSON.parse(localStorage.getItem('auth') as string)
		: { token: null };

	const token: string = auth.token;

	if (token) {
		return {
			headers: {
				...headers,
				Authorization: `Bearer ${token}`,
			},
		};
	}

	return {
		headers: {
			...headers,
		},
	};
});

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_GRAPHQL_URI,
});

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});
