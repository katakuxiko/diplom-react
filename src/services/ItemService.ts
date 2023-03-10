import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IButton, IItemResponse, IItemResponseGet } from "../models/response/ItemResponse";

export default class ItemService {
  static async postItem(
    id: string,
    title: string,
    description: string,
    buttons: IButton[],
    condition: string
  ): Promise<AxiosResponse<IItemResponse>> {
    return $api.post(`/api/lists/${id}/items/`, { title, description, buttons, condition});
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
  static async getNextPageId (
    bookId: string,
    variables: string,
    page: string
  ){
    if (variables===""&&variables=== null && variables===undefined){
      variables="none"
    }
    console.log(variables)
    return $api.get(`/api/lists/${bookId}/items/item?variables=${variables}&page=${+page+1}`);
  }
}
