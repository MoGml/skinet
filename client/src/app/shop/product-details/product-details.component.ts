import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { ProductDetails } from 'src/app/shared/models/productDetails';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetails;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    console.log(
      this.route.params.subscribe({
        next: (res) => {
          this.getProductDetails(res.id);
          console.log(this.product);
        },
      })
    );
  }

  getProductDetails(id: number) {
    this.shopService.getProductDetails(id).subscribe({
      next: (res) => (this.product = res),
      error: (err) => console.error(err),
    });
  }
}
