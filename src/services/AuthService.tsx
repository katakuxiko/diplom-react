import {$api} from '../http';
import {AxiosResponse} from 'axios';
import { AuthResponse } from '../models/response/AuthResonse';

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/sign-in", { username, password });
  }
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/sign-up", {
      username,
      email,
      password,
    });
  }
  static async refresh(oldToken: string): Promise<AxiosResponse<AuthResponse>>{
    return $api.post<AuthResponse>("/auth/refresh", {"token": oldToken});
  }
};

