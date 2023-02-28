import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { usersVariablesResponse } from '../models/response/UsersVariables';

export default class UserService {
	static async updateAllBooksVar(variables:string){
		return $api.put("/api/user-variables/", {
			variables,
		});
	}
	static async getAllBooksVariables(): Promise<AxiosResponse<usersVariablesResponse>>{
		return $api.get("/api/user-variables/variables")
	}
};
