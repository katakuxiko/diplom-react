import axios, { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/IUser';
import AuthService from '../services/AuthService';

export default class Store {
  user = {} as IUser;
  isAuth = false as boolean;
  isLoading = false as boolean;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
  async getLists(){
    
  }
  async login(username: string, password: string)  {
    
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      return response.status;
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        return err.response?.status;
      } else {
        console.log(err);
      }
      ;
    }
  }
  async register(username: string,name: string,password: string) {
    try {
      const response = await AuthService.register(username, name,password);
      console.log(response);
    } catch (err) {
      console.log(err);
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
  async checkAuth(){
    this.setLoading(true);
      try{
        localStorage.getItem("token") ? this.setAuth(true) : this.setAuth(false);
        //const response = await axios.get<AuthResponse>(`${API_URL}`)
      } catch (e) {
        console.log(e);
      } finally {
        this.setLoading(false)
      }
  }
};
