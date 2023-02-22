export interface IItemResponse{
	id: number;
}

export interface IButton {
  btnName: string;
  btnAction: number;
  btnVar: string;
}

export interface IItemResponseGet {
  id: number;
  title: string;
  description: string;
  condition: string;
  buttons: IButton[];
  done: boolean;
}