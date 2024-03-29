import { $api } from "../http";
import { AxiosResponse } from "axios";
import IList, { ISList } from "../models/IList";
import { ListResponse } from "../models/response/ListResponse";

export default class ListService {
	static async fetchLists(limit?: number): Promise<AxiosResponse<IList>> {
		return $api.get(`/api/lists/?limit=${limit}`);
	}
	static async fetchMyLists(): Promise<AxiosResponse<IList>> {
		console.log("Fetching userLists...");
		return $api.get("/api/user-variables/");
	}
	static async fetchList(
		id: number | string | undefined
	): Promise<AxiosResponse<ISList>> {
		console.log("Fetching list...");
		return $api.get(`/api/lists/${id}`);
	}
	static async postList(
		title: string,
		description: string,
		img: string
	): Promise<AxiosResponse<ListResponse>> {
		return $api.post("/api/lists/", { title, description, img });
	}
	static async updateList(
		id: number | string | undefined,
		title: string,
		description: string,
		img: string
	): Promise<AxiosResponse<ListResponse>> {
		return $api.put(`/api/lists/${id}`, { title, description, img });
	}
	static async deleteList(
		id: number | string
	): Promise<AxiosResponse<ListResponse>> {
		return $api.delete(`/api/lists/${id}`);
	}
}
