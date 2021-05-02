import { useQuery } from '@apollo/client';
import { User } from '../global/types';

import { GET_USER_PROFILE } from '../graphql/queries/profileQuery';

const useProfle = (id: string) => {
	const { data, loading, error } = useQuery<{ user: User }>(GET_USER_PROFILE, {
		variables: {
			id,
		},
	});

	return { data, loading, error };
};

export default useProfle;
