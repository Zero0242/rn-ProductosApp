import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {Gender, Product} from '../../domain/entities';
import {TesloProduct} from '../../infraestructure/interfaces/product.response';
import {TesloProductMapper} from '../../infraestructure/mapper/product-mapper';

const blankProduct: Product = {
  id: '',
  title: '',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  images: [],
  sizes: [],
  tags: [],
  gender: Gender.Unisex,
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === AppConstants.blankProduct) return blankProduct;

  try {
    const {data} = await tesloApi.get<TesloProduct>(`/api/products/${id}`);
    return TesloProductMapper.tesloToEntity(data);
  } catch (error) {
    console.error(`Producto con id ${id} con error: ${error}`);
    throw new Error(`Producto con id ${id} no encontrado`);

    // return null;
  }
};
