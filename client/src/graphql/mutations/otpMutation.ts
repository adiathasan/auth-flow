import { gql } from '@apollo/client';

export const GET_OTP = gql`
	mutation getOtp($type: String!, $payload: String!) {
		getOtp(input: { type: $type, payload: $payload }) {
			type
			code
		}
	}
`;

export const VERIFY_OTP = gql`
	mutation verifyOtp($code: Int!, $type: String!, $payload: String!) {
		verifyOtp(input: { code: $code, type: $type, payload: $payload }) {
			token
			expiresIn
			userId
		}
	}
`;
