import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';
import {AppConstants} from '../constants/app-constants';

const tesloApi: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// ? Referencia al api del calendario del curso de ReactJS
// const token = localStorage.getItem("token");
// if (token) config.headers["x-token"] = token;
// return config;
tesloApi.interceptors.request.use(async config => {
  const token: string | null = await AsyncStorage.getItem(AppConstants.token);
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export {tesloApi};
