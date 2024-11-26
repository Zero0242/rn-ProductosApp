import {Gender, Size} from '../../domain/entities';

export class AppConstants {
  static get token() {
    return 'JWT-TOKEN';
  }
  /** FIRMA de los productos nuevos */
  static get blankProduct() {
    return 'BLANCK-PRODUCT';
  }

  static get sizes(): Size[] {
    return [Size.Xxl, Size.Xl, Size.L, Size.M, Size.S, Size.Xs];
  }

  static get genders(): Gender[] {
    return [Gender.Kid, Gender.Unisex, Gender.Men, Gender.Women];
  }
}
