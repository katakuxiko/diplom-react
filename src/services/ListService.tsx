import { $api } from "../http";
import { AxiosResponse } from "axios";
import IList from "../models/IList";
import {ListResponse} from "../models/response/ListResponse"


export default class ListService {
  static async fetchLists(): Promise<AxiosResponse<IList>> {
    console.log("Fetching lists...");
    return $api.get("/api/lists/");
  }
  static async postList(
    title: string,
    description: string,
    img: string
  ): Promise<AxiosResponse<ListResponse>> {
    return $api.post("/api/lists/", { title, description, img });
  }
  static async deleteList(id:number): Promise<AxiosResponse<ListResponse>> {
    return $api.delete(`/api/lists/${id}`);
  }
}
