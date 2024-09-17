import {tesloApi} from '../../config/api/tesloApi';
import {AuthResponse} from '../../infraestructure/interfaces/auth-response.interface';
import {mapUserAsync} from './utils/map-user';

export const revalidateUser = async () => {
  try {
    const {data, status} = await tesloApi.get<AuthResponse>(
      '/api/auth/check-status',
    );
    if (status.toString().startsWith('2')) {
      return await mapUserAsync(data);
    }

    return null;
  } catch (error) {
    // throw new Error('Algo inesperado ocurrió');
    console.error(`Algo inesperado ocurrió : ${error}`);

    return null;
  }
};
