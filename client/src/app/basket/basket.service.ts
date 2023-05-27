import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotal } from '../shared/models/basket';
import { Product } from '../shared/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.baseUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotal = new BehaviorSubject<BasketTotal | null>(null);
  basketTotal$ = this.basketTotal.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http
      .get<Basket>(this.baseUrl + 'basket', { params: params })
      .subscribe({
        next: (res) => {
          this.basketSource.next(res);
          this.calcBasketTotal();
        },
        error: (err) => console.error(err),
      });
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (res) => {
        this.basketSource.next(res);
        this.calcBasketTotal();
      },
      error: (err) => console.error(err),
    });
  }

  getCurrentBasketValue(): Basket {
    return this.basketSource.value;
  }

  addItemToBasekt(item: Product, qty = 1) {
    const itemToAdd = this.mapProductItemToBasketItem(item);

    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    basket.basketItems = this.addorUpdateItem(
      basket.basketItems,
      itemToAdd,
      qty
    );

    this.setBasket(basket);
  }

  addBasketItemToBasekt(item: BasketItem, qty = 1) {
    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    basket.basketItems = this.addorUpdateItem(basket.basketItems, item, qty);

    this.setBasket(basket);
  }

  removeBasketItemFromBasekt(id: number, qty: number) {
    const basket = this.getCurrentBasketValue();

    if (!basket) return;

    const ItemToRemove = basket.basketItems.find((p) => p.id === id);

    if (ItemToRemove) {
      ItemToRemove.quantity -= qty;

      if (ItemToRemove.quantity === 0) {
        basket.basketItems = basket.basketItems.filter((p) => p.id !== id);
        console.log('hopa');
      }

      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: Basket) {
    return this.http
      .delete<Basket>(this.baseUrl + 'basket?id=' + basket.id)
      .subscribe({
        next: (res) => {
          this.basketSource.next(null);
          this.basketTotal.next(null);
          localStorage.removeItem('basketId');
        },
      });
  }

  private addorUpdateItem(
    basketItems: BasketItem[],
    itemToAdd: BasketItem,
    qty: number
  ): BasketItem[] {
    const item = basketItems.find((x) => x.id == itemToAdd.id);

    if (item) {
      item.quantity += qty;
    } else {
      itemToAdd.quantity = qty;
      basketItems.push(itemToAdd);
    }

    return basketItems;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);

    return basket;
  }

  private mapProductItemToBasketItem(product: Product): BasketItem {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0,
      brand: product.productBrand,
      type: product.productType,
      pictureUrl: product.pictureUrl,
    };
  }

  private calcBasketTotal() {
    const shipping = 0;
    const basket: Basket = this.getCurrentBasketValue();

    if (!basket) return;

    const subTotal = basket.basketItems.reduce(
      (sum, product) => product.price * product.quantity + sum,
      0
    );

    const total = subTotal + shipping;

    this.basketTotal.next({ shipping, subTotal, total });
  }
}
