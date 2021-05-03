import React, { useState } from 'react';
import {
	Button,
	Divider,
	Form,
	Input,
	Tooltip,
	notification,
	message,
} from 'antd';
import {
	MobileOutlined,
	LockOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/layout/Layout';
import FromLink from '../../components/common/FormLink';
import useAuth from '../../hooks/useAuth';
import useOtp from '../../hooks/useOtp';
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

const styles = { borderColor: '#a7a7a7' };

const LoginScreen: React.FC = () => {
	const [isOthers, setIsOthers] = useState(false);

	const { push } = useHistory();

	const { login, loading } = useAuth();

	const { getOtp, otpLoading } = useOtp();

	/*
		@normal func (login)
	*/

	const onFinish = async ({ phone, password }: InputValues) => {
		try {
			await login({
				variables: {
					phone,
					password,
				},
			});

			notification.success({ message: 'Successfully logged in', duration: 3 });
		} catch (error) {
			notification.error({ message: error.message });
		}
	};

	/*
		@others way func (otp)
	*/

	const onFinishOthers = async ({ phone }: { phone: string }) => {
		try {
			const hide = message.loading('Sending OTP code', 0);

			const { data } = await getOtp({
				variables: {
					type: 'email',
					payload: phone,
				},
			});

			hide();

			notification.info({
				message: 'OTP has been sent to you email',
				duration: 3,
			});

			/*
				@sending otp code via state for just mocking 
			*/

			push({
				pathname: '/otp/verify',
				state: { phone, code: data?.getOtp.code },
			});
		} catch (error) {
			message.destroy();
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
					initialValues={isOthers ? { phone: '' } : { phone: '', password: '' }}
					onFinish={isOthers ? onFinishOthers : onFinish}
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
					{!isOthers && (
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
					)}

					<Form.Item {...tailLayout}>
						<Button
							type='primary'
							loading={loading || otpLoading}
							size='large'
							htmlType='submit'
							block
						>
							Sign in {!isOthers && 'with password'}
						</Button>
					</Form.Item>
				</Form>
				<Divider style={styles} plain>
					or
				</Divider>
				<Button
					onClick={() => setIsOthers((old) => !old)}
					type='default'
					loading={loading || otpLoading}
					size='large'
					htmlType='button'
					block
				>
					{isOthers
						? 'Sign in with password'
						: 'Sign in via other means instead!'}
				</Button>

				<FromLink link='/register' linkPrefix="Don't have an account?">
					Sign up
				</FromLink>
			</motion.div>
		</Layout>
	);
};

export default LoginScreen;
