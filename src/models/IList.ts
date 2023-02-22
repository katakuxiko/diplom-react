export default interface IList {
	data: ISList[];
}

export  interface ISList {
	id: number | string;
	title: string;
	description: string;
	img: string;
}
