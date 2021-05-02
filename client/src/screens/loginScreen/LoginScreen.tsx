import React from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { motion } from 'framer-motion';

import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import { variants } from '../../App';
import useAuth from '../../hooks/useAuth';

interface InputValues {
	name: string;
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

	const onFinish = (values: InputValues) => {
		console.log(values);
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
					initialValues={{ number: '', password: '' }}
					onFinish={onFinish}
				>
					<Form.Item
						name='number'
						rules={[{ required: true, message: 'Please input your number!' }]}
					>
						<Input placeholder='Enter your phone number' size='large' />
					</Form.Item>

					<Form.Item
						name='password'
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password placeholder='Password' size='large' />
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
					Don't have an account? <Link to='/profile/eee'>Sign up</Link>
				</p>
			</motion.div>
		</Layout>
	);
};

export default LoginScreen;
