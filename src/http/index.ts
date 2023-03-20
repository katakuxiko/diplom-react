import axios from "axios";

export const $api = axios.create({
	withCredentials: false,
	baseURL: "https://go-z7pf.onrender.com",
});
//	http://localhost:8090
//	https://go-z7pf.onrender.com
$api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
