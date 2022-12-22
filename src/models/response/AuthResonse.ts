import { IUser } from '../IUser';

export interface AuthResponse {
	token: string;
	userId: string;
	user: IUser;
}