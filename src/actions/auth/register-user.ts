import {tesloApi} from '../../config/api/tesloApi';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';
import {mapUserAsync} from './utils/map-user';

interface Options {
  email: string;
  password: string;
  fullname: string;
}

export const registerUser = async (options: Options) => {
  try {
    const body = JSON.stringify(options);
    const {data} = await tesloApi.post<AuthResponse>(
      '/api/auth/register',
      body,
    );

    return await mapUserAsync(data);
  } catch (error) {
    console.error(`No se pudo registrar al usuario : ${error}`);
    // throw new Error('No se pudo registrar al usuario');

    return null;
  }
};
