import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
	query getUser($id: ID!) {
		user(id: $id) {
			_id
			name
			email
		}
	}
`;
