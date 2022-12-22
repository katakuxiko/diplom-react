import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IList } from "../models/IList";

export default class ListService {
  static async fetchLists(): Promise<AxiosResponse<IList>> {
    console.log("Fetching lists...");
    return $api.get("/api/lists/");
  }
}
