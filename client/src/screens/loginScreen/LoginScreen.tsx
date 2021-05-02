import React from 'react';
import { Button, Form, Input } from 'antd';
import { motion } from 'framer-motion';

import Layout from '../../components/layout/Layout';

interface InputValues {
	name: string;
	password: string;
}

const layout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
};

const tailLayout = {
	wrapperCol: { offset: 0, span: 24 },
};

const LoginScreen: React.FC = () => {
	const onFinish = (values: InputValues) => {
		console.log(values);
	};

	return (
		<Layout className='login' title='Sign In'>
			<motion.div className='login__space'>
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
						<Button type='primary' size='large' htmlType='submit' block>
							Sign in with password
						</Button>
					</Form.Item>
				</Form>
			</motion.div>
		</Layout>
	);
};

export default LoginScreen;
