import React, {
	Dispatch,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Divider, notification, message } from 'antd';
import { useDispatch } from 'react-redux';
import { MailOutlined, MobileOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import './otpScreen.scss';
import Layout from '../../components/layout/Layout';
import { variants } from '../../helper/misc';
import useOtp from '../../hooks/useOtp';
import { Action, ADD_AUTH } from '../../global/types';
import FromLink from '../../components/common/FormLink';

export interface StateProps {
	phone: string;
	code: number;
}

const styles = {
	icon: { transform: 'scale(1.6) translateY(-4px) translateX(-2px)' },
	divider: { borderColor: '#a7a7a7' },
};

const OtpScreen: React.FC = () => {
	const dispatch = useDispatch<Dispatch<Action>>();

	const ref1 = useRef() as MutableRefObject<HTMLInputElement>;
	const ref2 = useRef() as MutableRefObject<HTMLInputElement>;
	const ref3 = useRef() as MutableRefObject<HTMLInputElement>;
	const ref4 = useRef() as MutableRefObject<HTMLInputElement>;

	const formRef = useRef() as MutableRefObject<HTMLFormElement>;

	const [disabled, setDisabled] = useState(true);

	const [isPhoneActive, setIsPhoneActive] = useState(false);

	const { replace } = useHistory();

	const { verifyOtp, verifyOtpLoading, otpLoading, getOtp } = useOtp();

	const { state } = useLocation<StateProps>();

	// reset value

	const reset = () => {
		ref1.current.disabled = false;
		ref2.current.disabled = false;
		ref3.current.disabled = false;
		ref4.current.disabled = false;

		ref1.current.value = '';
		ref2.current.value = '';
		ref3.current.value = '';
		ref4.current.value = '';

		ref1.current.focus();
		setDisabled(true);
	};

	// verify

	const handleVerify = async () => {
		const code =
			ref1.current.value +
			ref2.current.value +
			ref3.current.value +
			ref4.current.value;

		try {
			const { data } = await verifyOtp({
				variables: {
					code: Number(code),
					payload: state.phone,
					type: isPhoneActive ? 'sms' : 'email',
				},
			});

			if (data) {
				dispatch({ type: ADD_AUTH, payload: data.verifyOtp });

				notification.success({
					message: 'Successfully logged in',
					duration: 3,
				});

				message.destroy();

				replace(`/profile/${data.verifyOtp.userId}`);
			}
		} catch (error) {
			reset();
			notification.error({ message: error.message });
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (event.target.name) {
			case 'one':
				ref1.current.disabled = true;
				ref2.current.focus();

				break;
			case 'two':
				ref2.current.disabled = true;
				ref3.current.focus();

				break;
			case 'three':
				ref3.current.disabled = true;
				ref4.current.focus();

				break;
			case 'four':
				ref4.current.disabled = true;
				setDisabled(false);
				handleVerify();
				break;
		}
	};

	// resend

	const handleResendOtp = async () => {
		reset();
		setIsPhoneActive((old) => !old);

		try {
			const hide = message.loading('Sending OTP code', 0);

			const { data } = await getOtp({
				variables: {
					type: isPhoneActive ? 'email' : 'sms',
					payload: state.phone,
				},
			});

			hide();

			message.destroy();

			if (data) {
				message.loading(`OTP - ${data.getOtp.code}`, 20);
			}
		} catch (error) {
			notification.error({ message: error.message });
		}
	};

	/*
        @route checking
    */

	useEffect(() => {
		if (!state) {
			replace('/login');
			return;
		}

		message.loading(`OTP - ${state.code}`, 20);
	}, [state, replace]);

	return (
		<Layout title='Verify Otp' className='otp'>
			<motion.div
				className='otp__space'
				variants={variants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				{isPhoneActive ? (
					<div className='otp_header'>
						<MobileOutlined style={styles.icon} />
						<h1 className='text-center'>
							OTP has been sent to your <strong>Phone</strong>
						</h1>
					</div>
				) : (
					<div className='otp_header'>
						<MailOutlined style={styles.icon} />
						<h1 className='text-center'>
							OTP has been sent to your <strong>Email</strong>
						</h1>
					</div>
				)}
				<form ref={formRef} onSubmit={handleVerify}>
					<input
						ref={ref1}
						onChange={(e) => handleChange(e)}
						type='number'
						min={0}
						max={9}
						name='one'
					/>
					<input
						ref={ref2}
						onChange={(e) => handleChange(e)}
						type='number'
						min={0}
						max={9}
						name='two'
					/>
					<input
						ref={ref3}
						onChange={(e) => handleChange(e)}
						type='number'
						min={0}
						max={9}
						name='three'
					/>
					<input
						ref={ref4}
						onChange={(e) => handleChange(e)}
						type='number'
						min={0}
						max={9}
						name='four'
					/>
				</form>
				<Button
					size='large'
					loading={verifyOtpLoading || otpLoading}
					disabled={disabled}
					type='primary'
					block
				>
					SUBMIT
				</Button>
				<Divider style={styles.divider} plain>
					or
				</Divider>
				<Button
					onClick={handleResendOtp}
					disabled={otpLoading}
					loading={verifyOtpLoading || otpLoading}
					icon={isPhoneActive ? <MailOutlined /> : <MobileOutlined />}
					size='large'
					type='ghost'
					block
				>
					SEND OTP TO MY <strong>{isPhoneActive ? ' EMAIL' : ' PHONE'}</strong>
				</Button>
				<FromLink linkPrefix='Go back to' link='/login'>
					Login
				</FromLink>
			</motion.div>
		</Layout>
	);
};

export default OtpScreen;
