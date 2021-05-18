import React, { useEffect } from 'react';
import { Button, Empty, message, notification, Skeleton, Tooltip } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ADD_USER, Store } from '../../global/types';
import './profileScreen.scss';
import Layout from '../../components/layout/Layout';
import useProfle from '../../hooks/useProfle';
import { motion } from 'framer-motion';
import { variants } from '../../helper/misc';
import { logoutAction } from '../../global/actions/authActions';

const ProfileScreen: React.FC = () => {
	const user = useSelector((state: Store) => state.user);

	const dispatch = useDispatch();

	const params = useParams<{ id: string }>();

	const { data, error, loading } = useProfle(params.id);

	const logout = () => dispatch(logoutAction());

	useEffect(() => {
		if (loading) {
			message.loading('geting user...');
			return;
		}

		message.destroy();
	}, [loading]);

	useEffect(() => {
		if (data) {
			dispatch({ type: ADD_USER, payload: data.user });
		}
	}, [data, dispatch]);

	useEffect(() => {
		if (error) {
			notification.error({ message: error.message });
		}
	}, [error]);

	return (
		<Layout title='Profile'>
			<motion.div
				variants={variants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<Skeleton loading={loading} active>
					{user ? (
						<div className='profile'>
							<Button
								icon={<LoginOutlined />}
								type='ghost'
								onClick={logout}
								block
							>
								Logout
							</Button>
							<Tooltip title={user._id}>
								<motion.main
									variants={variants}
									initial='hidden'
									animate='visible'
									exit='exit'
								>
									<section>
										<div>name</div>
										<div>{user.name}</div>
									</section>
									<section>
										<div>email</div>
										<div>{user.email}</div>
									</section>
								</motion.main>
							</Tooltip>
						</div>
					) : (
						<Empty />
					)}
				</Skeleton>
			</motion.div>
		</Layout>
	);
};

export default ProfileScreen;
