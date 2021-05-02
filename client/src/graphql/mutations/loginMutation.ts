import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($phone: String!, $password: String!) {
		login(input: { phone: $phone, password: $password }) {
			token
			expiresIn
			userId
		}
	}
`;
