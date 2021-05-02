import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const Error = () => {
	const { goBack } = useHistory();

	return (
		<Layout title='Oops! 404'>
			<Result
				status='404'
				title='404'
				subTitle='Sorry, the page you visited does not exist.'
				extra={
					<Button type='primary' onClick={goBack}>
						Back Home
					</Button>
				}
			/>
		</Layout>
	);
};

export default Error;
