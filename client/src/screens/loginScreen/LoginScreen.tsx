import React from 'react';
import { Button, Divider, Form, Input, Tooltip, notification } from 'antd';
import {
	MobileOutlined,
	LockOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Layout from '../../components/layout/Layout';
import useAuth from '../../hooks/useAuth';
import { BD_PHONE_REGEX, variants } from '../../helper/misc';

interface InputValues {
	phone: string;
	password: string;
}

const layout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
};

const tailLayout = {
	wrapperCol: { span: 24 },
};

const LoginScreen: React.FC = () => {
	const { login, loading } = useAuth();

	const onFinish = async ({ phone, password }: InputValues) => {
		try {
			await login({
				variables: {
					phone,
					password,
				},
			});

			notification.success({ message: 'successfully logged in' });
		} catch (error) {
			notification.error({ message: error.message });
		}
	};

	return (
		<Layout className='login' title='Sign In'>
			<motion.div
				className='login__space'
				variants={variants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<h1>Login</h1>
				<Form
					{...layout}
					name='basic'
					initialValues={{ phone: '', password: '' }}
					onFinish={onFinish}
				>
					<Form.Item
						name='phone'
						rules={[
							{ required: true, message: 'Please input your number!' },
							{
								pattern: BD_PHONE_REGEX,
								message: 'Phone number eg.(017..)',
							},
						]}
					>
						<Input
							prefix={<MobileOutlined />}
							suffix={
								<Tooltip title='Your 11 digit phone number'>
									<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
								</Tooltip>
							}
							placeholder='Enter your phone number'
							size='large'
						/>
					</Form.Item>

					<Form.Item
						name='password'
						rules={[
							{ required: true, message: 'Please input your password!' },
							{ min: 6, message: 'Password must be 6 charecters and above' },
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder='Password'
							size='large'
						/>
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button
							type='primary'
							loading={loading}
							size='large'
							htmlType='submit'
							block
						>
							Sign in with password
						</Button>
					</Form.Item>
				</Form>
				<Divider style={{ borderColor: '#a7a7a7' }} plain>
					or
				</Divider>
				<Link to='/login/others'>
					<Button
						type='default'
						loading={loading}
						size='large'
						htmlType='button'
						block
					>
						Sign in via other means instead!
					</Button>
				</Link>
				<p className='m-t-15 text-center'>
					Don't have an account? <Link to='/register'>Sign up</Link>
				</p>
			</motion.div>
		</Layout>
	);
};

export default LoginScreen;
