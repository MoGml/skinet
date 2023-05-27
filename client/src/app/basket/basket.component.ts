import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(public basketService: BasketService, private router: Router) {}

  updateBasket(item, qty) {
    this.basketService.addBasketItemToBasekt(item, qty);
  }

  removeBasketItem(item: BasketItem, qty: number) {
    this.basketService.removeBasketItemFromBasekt(item.id, qty);
  }

  deleteBasket(item) {
    this.basketService.deleteBasket(item);
  }

  navigatetoProduct(id: number) {
    this.router.navigateByUrl('/shop/' + id);
  }
}
