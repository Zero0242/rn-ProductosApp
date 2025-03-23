import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities';
import {TesloProduct} from '../../infraestructure/interfaces/product.response';
import {TesloProductMapper} from '../../infraestructure/mapper/product-mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 10,
): Promise<Product[]> => {
  try {
    const {data} = await tesloApi.get<TesloProduct[]>(
      `/api/products?limit=${limit}&offset=${limit * page}`,
    );

    return data.map(TesloProductMapper.tesloToEntity);
  } catch (error) {
    console.error(`Error obtener productos: ${error}`);

    return [];
  }
};
