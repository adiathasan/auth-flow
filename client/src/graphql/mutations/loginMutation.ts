import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login {
		login {
			token
		}
	}
`;
