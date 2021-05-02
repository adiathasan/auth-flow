import { ApolloServer, gql } from 'apollo-server';
import * as dotenv from 'dotenv';

import { connectDb } from './config/db';
import {
	getToken,
	hashPassword,
	isPasswordValid,
	JWT_EXPIRES_IN_DAYS,
	randomFixedInteger,
} from './helper/auth';
import { IUser, User } from './models/user';

dotenv.config();

const PORT = process.env.PORT || 5000;

export interface UserInput {
	input: IUser;
}
export interface LoginInput {
	input: {
		phone: string;
		password: string;
	};
}

type OtpType = 'sms' | 'email';
export interface OtpInput {
	input: {
		type: OtpType;
		payload: string;
	};
}
export interface VerifyInput {
	input: {
		type: OtpType;
		payload: string;
		code: number;
	};
}

let cashedOtp = 0;

const typeDefs = gql`
	type User {
		_id: ID!
		name: String!
		email: String!
		phone: String!
		password: String!
		createdAt: String!
		updatedAt: String!
	}

	type AuthData {
		token: String!
		userId: String!
		expiresIn: Int!
	}

	type Otp {
		type: String!
		code: Int!
	}

	input UserInput {
		name: String!
		email: String!
		phone: String!
		password: String!
	}

	input LoginInput {
		phone: String!
		password: String!
	}

	input OtpInput {
		type: String!
		payload: String!
	}

	input VerifyInput {
		code: Int!
		type: String!
		payload: String!
	}

	type Query {
		user(id: String!): User!
		users: [User!]!
	}

	type Mutation {
		createUser(input: UserInput!): User!
		login(input: LoginInput!): AuthData!
		getOtp(input: OtpInput!): Otp!
		verifyOtp(input: VerifyInput!): AuthData!
	}
`;

const resolvers = {
	Query: {
		users: async () => {
			try {
				const users = await User.find();

				return users.map((user) => ({ ...user._doc }));
			} catch (error) {
				throw error;
			}
		},
		user: async (_parent: any, { id }: { id: string }) => {
			try {
				const user = await User.findById(id);

				if (!user) throw new Error('User not found');

				return { ...user._doc };
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		createUser: async (_parent: any, { input }: UserInput) => {
			try {
				const { email, password, name, phone } = input;

				const isAlreadyRegistered = await User.findOne({ phone });

				if (isAlreadyRegistered)
					throw new Error('Account already exists with this phone number');

				const hashed = await hashPassword(password);

				const newUser = new User({
					email,
					password: hashed,
					name,
					phone,
				});

				await newUser.save();

				return { ...newUser._doc };
			} catch (error) {
				throw error;
			}
		},
		login: async (_parent: any, { input }: LoginInput) => {
			try {
				const ERR_MESSAGE = 'Invalid phone number or password';

				const { phone, password } = input;

				const user = await User.findOne({ phone });

				if (!user) throw new Error(ERR_MESSAGE);

				const doesNotPasswordMatches = !(await isPasswordValid({
					regular: password,
					hashed: user.password,
				}));

				if (doesNotPasswordMatches) throw new Error(ERR_MESSAGE);

				const token = getToken({ userId: user.id });

				return {
					token,
					expiresIn: JWT_EXPIRES_IN_DAYS,
					userId: user.id,
				};
			} catch (error) {
				throw error;
			}
		},
		getOtp: async (_parent: any, { input: { type } }: OtpInput) => {
			try {
				const OTP_NUM = 4;

				switch (type) {
					case 'email':
						// do something for email
						break;
					case 'sms':
						// do something for phone
						break;
					default:
						break;
				}

				// mocking otp

				const otp = randomFixedInteger(OTP_NUM);

				cashedOtp = otp;

				const MIN_TIME_TO_EXPIRE_IN_MIN = 5;

				setTimeout(() => {
					cashedOtp = 0;
				}, 1000 * 60 * MIN_TIME_TO_EXPIRE_IN_MIN);

				return {
					type,
					code: otp,
				};
			} catch (error) {
				throw error;
			}
		},
		verifyOtp: async (
			_parent: any,
			{ input: { type: _t, payload, code } }: VerifyInput
		) => {
			try {
				const isNotVerified = cashedOtp !== code;

				if (isNotVerified) throw new Error('OTP code not valid. Try again');

				const user = await User.findOne({ phone: payload });

				if (user) {
					const token = getToken({ userId: user.id });

					return {
						token,
						expiresIn: JWT_EXPIRES_IN_DAYS,
						userId: user.id,
					};
				}

				throw new Error('User not found to verify');
			} catch (error) {
				throw error;
			}
		},
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

connectDb(() => {
	// server

	apolloServer.listen(PORT).then(() => {
		console.log(`server runnig on ${PORT}`);
	});
});
