import { gql } from '@apollo/client';

export const REGEISTER_USER = gql`
	mutation registerUser(
		$name: String!
		$email: String!
		$phone: String!
		$password: String!
	) {
		createUser(
			input: { name: $name, email: $email, phone: $phone, password: $password }
		) {
			_id
			name
			email
		}
	}
`;
