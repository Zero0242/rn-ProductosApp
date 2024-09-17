import {tesloApi} from '../../config/api/tesloApi';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';
import {mapUserAsync} from './utils/map-user';

export const loginUser = async (email: string, password: string) => {
  try {
    const body = JSON.stringify({email, password});
    const {data} = await tesloApi.post<AuthResponse>('/api/auth/login', body);

    return await mapUserAsync(data);
  } catch (error) {
    console.error(`No se pudo autenticar al usuario ${error}`);
    // throw new Error('No se pudo autenticar al usuario');
    return null;
  }
};
