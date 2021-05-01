import { ApolloServer, gql } from 'apollo-server';
import { connectDb } from './config/db';

const PORT = process.env.PORT || 5000;

const typeDefs = gql`
	type Query {
		test: String!
	}

	type Mutation {
		setTest: String!
	}
`;

const resolvers = {
	Query: {
		test: () => 'hey',
	},
	Mutation: {
		setTest: () => 'test locked',
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

connectDb(() => {
	// server

	apolloServer.listen(PORT).then(() => {
		console.log(`server runnig on ${PORT}`);
	});
});
