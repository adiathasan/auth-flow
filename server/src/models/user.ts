import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	phone: string;
	password: string;
}

/*

    please got to Document type defination of mongoose and add (_doc: TQueryHelpers) to the declarations,

    otherwise it will fail to compile or configure tsconfig.json => {strict : false}

*/

export interface UserDoc extends Document<any, IUser>, IUser {}

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model<UserDoc>('user', userSchema);
