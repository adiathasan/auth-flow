import { useMutation } from '@apollo/client';
import { Auth } from '../global/types';

import { GET_OTP, VERIFY_OTP } from '../graphql/mutations/otpMutation';

type Type = 'sms' | 'email';

export interface OtpData {
	type: Type;
	code: number;
}

export interface InputOtp {
	type: Type;
	payload: string;
}

export interface InputVerifyOtp extends InputOtp {
	code: number;
}

const useOtp = () => {
	const [getOtp, { data: otpData, loading: otpLoading }] = useMutation<
		{
			getOtp: OtpData;
		},
		InputOtp
	>(GET_OTP);

	const [
		verifyOtp,
		{ data: verifyOtpData, loading: verifyOtpLoading },
	] = useMutation<
		{
			verifyOtp: Auth;
		},
		InputVerifyOtp
	>(VERIFY_OTP);

	return {
		getOtp,
		otpData,
		otpLoading,
		verifyOtpData,
		verifyOtp,
		verifyOtpLoading,
	};
};

export default useOtp;
