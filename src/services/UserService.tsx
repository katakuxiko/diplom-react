import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IUser} from "../models/IUser"

export default class UserService {
  static async fetchUsers():Promise<AxiosResponse<IUser>>{
  console.log("Fetching users...")
	return $api.get('/api/lists/')
  }
}
