import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { ProductDetails } from 'src/app/shared/models/productDetails';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetails;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

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
      next: (res) => {
        this.product = res;
        this.bcService.set('@productDetails', this.product.name);
      },
      error: (err) => console.error(err),
    });
  }
}
