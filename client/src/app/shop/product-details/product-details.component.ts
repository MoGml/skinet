import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { ProductDetails } from 'src/app/shared/models/productDetails';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
import { Basket } from 'src/app/shared/models/basket';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetails;
  basket = 1;
  basketQty: number = 0;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private basketService: BasketService,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (res) => {
        this.getProductDetails(res.id);
        console.log(this.product);
      },
    });
  }

  getProductDetails(id: number) {
    this.shopService.getProductDetails(id).subscribe({
      next: (res) => {
        this.product = res;
        this.bcService.set('@productDetails', this.product.name);

        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: (response) => {
            const itemInBsket = response?.basketItems.find((p) => p.id === id);
            if (itemInBsket) {
              this.basket === itemInBsket.quantity;

              console.log(this.basket);
            }
          },
        });
      },
      error: (err) => console.error(err),
    });
  }

  addItemToBasket(item: Product) {
    this.basketService.addItemToBasekt(item, 1);
  }
}
