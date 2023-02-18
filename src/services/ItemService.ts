import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IItemResponse, IItemResponseGet } from "../models/response/ItemResponse";

export default class ItemService {
  static async postItem(
    id: string,
    title: string,
    description: string
  ): Promise<AxiosResponse<IItemResponse>> {
    return $api.post(`/api/lists/${id}/items/`, { title, description });
  }
  static async getAllItems(
    id: string
  ): Promise<AxiosResponse<IItemResponseGet[]>> {
    return $api.get(`/api/lists/${id}/items/`);
  }
  static async getItemById(
    id: string,
  ): Promise<AxiosResponse<IItemResponseGet>> {
    return $api.get(`/api/items/${id}`);
  }
}
