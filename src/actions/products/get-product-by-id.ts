import {tesloApi} from '../../config/api/tesloApi';
import {TesloProduct} from '../../infraestructure/interfaces/product.response';
import {TesloProductMapper} from '../../infraestructure/mapper/product-mapper';

export const getProductById = async (id: string) => {
  try {
    const {data} = await tesloApi.get<TesloProduct>(`/api/products/${id}`);
    return TesloProductMapper.tesloToEntity(data);
  } catch (error) {
    console.error(`Producto con id ${id} con error: ${error}`);
    throw new Error(`Producto con id ${id} no encontrado`);

    // return null;
  }
};
