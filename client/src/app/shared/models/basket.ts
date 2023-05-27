import * as cuid from 'cuid';

export interface Basket {
  id: string;
  basketItems: BasketItem[];
}

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export class Basket implements Basket {
  id: string = cuid();
  basketItems: BasketItem[] = [];
}

export interface BasketTotal {
  subTotal: number;
  shipping: number;
  total: number;
}
