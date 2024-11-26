import {isAxiosError} from 'axios';
import {tesloApi} from '../../config/api/tesloApi';
import {AppConstants} from '../../config/constants/app-constants';
import {safeParseInt} from '../../config/helpers/safe-parse-int';
import {Product} from '../../domain/entities';
import {TesloProduct} from '../../infraestructure/interfaces/product.response';
import {TesloProductMapper} from '../../infraestructure/mapper/product-mapper';

export const updateCreateProduct = (
  product: Partial<Product>,
): Promise<Product> => {
  product.stock = safeParseInt(product.stock);
  product.price = safeParseInt(product.price);

  if (product.id && product.id !== AppConstants.blankProduct) {
    return updateProduct(product);
  }
  return createProduct(product);
};

async function createProduct(product: Partial<Product>): Promise<Product> {
  const {images = [], id: _, ...rest} = product;
  const parsedImages: string[] = await trimImages(images);

  try {
    const {data} = await tesloApi.post<TesloProduct>(`/api/products`, {
      images: parsedImages,
      ...rest,
    });

    return TesloProductMapper.tesloToEntity(data);
  } catch (error) {
    console.error(`Error al crear: ${error}`);
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error(`No se pudo crear el producto`);
  }
}

async function updateProduct(product: Partial<Product>) {
  const {images = [], id, ...rest} = product;

  const parsedImages: string[] = await trimImages(images);
  try {
    const {data} = await tesloApi.patch<TesloProduct>(`/api/products/${id}`, {
      images: parsedImages,
      ...rest,
    });

    return TesloProductMapper.tesloToEntity(data);
  } catch (error) {
    console.error(`Error al actualizar: ${error}`);
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error(`No se pudo actualizar el producto con id ${id}`);
  }
}
async function uploadImages(imagePath: string): Promise<string> {
  const formData = new FormData();
  const fileToUpload = {
    uri: imagePath,
    name: imagePath.split('/').pop()!,
  };
  formData.append('file', fileToUpload);

  try {
    const {data} = await tesloApi.postForm<{image: string}>(
      '/api/files/product',
      formData,
    );
    console.log({data});

    return data.image;
  } catch (error) {
    console.error(`Errores ${error}`);
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error('No se pudo subir la imagen :(');
  }
}

const trimImages = async (values: string[]): Promise<string[]> => {
  const previousImages = values.filter(e => !e.startsWith('file'));
  const newImages = values.filter(e => e.startsWith('file'));
  console.log({newImages, previousImages});

  let parsedImages: string[] = [];

  const promises = newImages.map(uploadImages);
  const responses = await Promise.all(promises);
  parsedImages = [...previousImages, ...responses];
  console.log({parsedImages});

  return parsedImages.map(e => e.split('/').pop() ?? '');
};
