import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import IList from "../models/IList";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import ListService from "../services/ListService";

export default class Store {
	list = {} as IList;
	user = {} as IUser;
	isAuth = false as boolean;
	isLoading = false as boolean;
	isListLoading = false as boolean;
	constructor() {
		makeAutoObservable(this);
	}
	setListLoading(val: boolean) {
		this.isListLoading = val;
	}
	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setList(list: IList) {
		this.list = list;
	}
	setUser(user: IUser) {
		this.user = user;
	}
	setLoading(loading: boolean) {
		this.isLoading = loading;
	}
	async login(username: string, password: string) {
		try {
			const response = await AuthService.login(username, password);
			console.log(response);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("id", response.data.userId);
			localStorage.setItem("username", response.data.user.username);
			localStorage.setItem("email", response.data.user.email);
			this.setUser(response.data.user);
			this.setAuth(true);
			return response.status;
		} catch (err: any | AxiosError) {
			if (axios.isAxiosError(err)) {
				// console.log(err);
				return err.response?.status;
			} else {
				console.log(err);
			}
		}
	}
	async register(username: string, email: string, password: string) {
		try {
			const response = await AuthService.register(
				username,
				email,
				password
			);
			console.log(response);
			return response.status;
		} catch (err) {
			console.log(err);
			return 400;
		}
	}
	async logout() {
		try {
			this.setAuth(false);
			localStorage.removeItem("token");
		} catch (err) {
			console.log(err);
		}
	}
	async refresh() {
		const response = await AuthService.refresh(
			localStorage.getItem("token") as string
		);
		// console.log(response);
		localStorage.setItem("token", response.data.token);

		// console.log(response);
	}
	async postLists(title: string, description: string, imgUrl: string) {
		const response = await ListService.postList(title, description, imgUrl);
		console.log(response.data.id);
		return response.data.id;
	}
	async updateList(id:string,title: string, description: string, imgUrl: string) {
		const response = await ListService.updateList(id,title, description, imgUrl);
		console.log(response.data.id);
		return response.data.id;
	}
	// async fetchList() {
	//   this.setListLoading(true);
	//   const response = await ListService.fetchLists().finally(() =>{
	//     this.setListLoading(false);
	//   }
	//   )
	//   const data = response.data;
	//   console.log(data);
	//   return data;
	// }
	async checkAuth() {
		this.setLoading(true);
		try {
			localStorage.getItem("token")
				? this.setAuth(true)
				: this.setAuth(false);
			if (localStorage.getItem("username") != null) {
				this.user.email = localStorage.getItem("email") as string;
				this.user.username = localStorage.getItem("username") as string;
			}
		} catch (e) {
			console.log(e);
		} finally {
			this.setLoading(false);
		}
	}
}
