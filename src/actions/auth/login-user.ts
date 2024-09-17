import AsyncStorage from '@react-native-async-storage/async-storage';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';
import {mapUser} from './utils/map-user';

export const loginUser = async (email: string, password: string) => {
  try {
    const body = JSON.stringify({email, password});
    const {data} = await tesloApi.post<AuthResponse>('/api/auth/login', body);
    await AsyncStorage.setItem(AppConstants.token, data.token);

    return mapUser(data);
  } catch (error) {
    console.error(`No se pudo autenticar al usuario ${error}`);
    // throw new Error('No se pudo autenticar al usuario');
    return null;
  }
};
