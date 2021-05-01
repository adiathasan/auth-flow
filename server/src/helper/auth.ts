import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SALT = 10;

export const JWT_SECRET = '_SECRET';

export const JWT_EXPIRES_IN_DAYS = 2;

export interface Password {
	regular: string;
	hashed: string;
}

export const hashPassword = async (password: string) => {
	try {
		const hashed = await bcrypt.hash(password, SALT);

		return hashed;
	} catch (error) {
		throw error;
	}
};

export const isPasswordValid = async ({ regular, hashed }: Password) => {
	try {
		return await bcrypt.compare(regular, hashed);
	} catch (error) {
		throw error;
	}
};

export const getToken = <T extends {}>(payload: T) => {
	return jwt.sign({ ...payload }, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN_DAYS + 'd',
	});
};

export const randomFixedInteger = (length: number) => {
	return Math.floor(
		Math.pow(10, length - 1) +
			Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
	);
};
