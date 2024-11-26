import {API_URL} from '@env';
import type {Product} from '../../domain/entities';
import type {TesloProduct} from '../interfaces/product.response';

export class TesloProductMapper {
  static tesloToEntity(data: TesloProduct): Product {
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      slug: data.slug,
      stock: data.stock,
      sizes: data.sizes,
      gender: data.gender,
      images: data.images.map(image => `${API_URL}/api/files/product/${image}`),
      tags: data.tags,
    };
  }
}
