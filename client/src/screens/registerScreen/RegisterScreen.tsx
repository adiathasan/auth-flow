import React from 'react';
import {
	MobileOutlined,
	InfoCircleOutlined,
	LockOutlined,
	MailOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Form, Input, Tooltip, Button, notification } from 'antd';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/layout/Layout';
import useAuth from '../../hooks/useAuth';
import FromLink from '../../components/common/FormLink';
import { variants, BD_PHONE_REGEX } from '../../helper/misc';

interface InputValues {
	phone: string;
	email: string;
	password: string;
	name: string;
}

const layout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
};

const tailLayout = {
	wrapperCol: { span: 24 },
};

const RegisterScreen: React.FC = () => {
	const { registerLoading, register } = useAuth();

	const { push } = useHistory();

	const onFinish = async ({ phone, password, name, email }: InputValues) => {
		try {
			await register({
				variables: {
					phone,
					password,
					name,
					email,
				},
			});

			notification.success({ message: 'Successfully signed up' });
			push('/login');
		} catch (error) {
			notification.error({ message: error.message });
		}
	};

	return (
		<Layout title='Sign up'>
			<motion.div
				className='register__space'
				variants={variants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<h1>Create a new account</h1>
				<Form
					{...layout}
					name='basic'
					initialValues={{ phone: '', password: '', name: '', email: '' }}
					onFinish={onFinish}
				>
					<Form.Item
						requiredMark
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
									<InfoCircleOutlined />
								</Tooltip>
							}
							placeholder='Enter your phone number'
							size='large'
						/>
					</Form.Item>

					<Form.Item
						requiredMark
						name='name'
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input
							prefix={<UserOutlined />}
							suffix={
								<Tooltip title='Your name for the record'>
									<InfoCircleOutlined />
								</Tooltip>
							}
							placeholder='Enter your name'
							size='large'
						/>
					</Form.Item>

					<Form.Item
						requiredMark
						name='email'
						rules={[{ required: true, message: 'Please input your email!' }]}
					>
						<Input
							prefix={<MailOutlined />}
							suffix={
								<Tooltip title='We will send you email'>
									<InfoCircleOutlined />
								</Tooltip>
							}
							placeholder='Enter your email'
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
							loading={registerLoading}
							size='large'
							htmlType='submit'
							block
						>
							Sign Up
						</Button>
					</Form.Item>
				</Form>

				<FromLink link='/login' linkPrefix='Already have an account?'>
					Login
				</FromLink>
			</motion.div>
		</Layout>
	);
};

export default RegisterScreen;
