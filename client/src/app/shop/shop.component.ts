import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  shopParams = new ShopParams();
  searchTerms: string = '';

  totalCount: Number = 0;
  itemsCount: Number = 0;

  brands: Brand[] = [];
  types: Type[] = [];

  sortList = [
    { name: 'A-Z', value: 'a-z' },
    { name: 'Z-A', value: 'z-a' },
    { name: 'Price Low to High', value: 'priceAsc' },
    { name: 'Price Hight to Low', value: 'priceDes' },
  ];

  selectedBrand: number = 0;
  selectedType: number = 0;
  selectedSort: string = '';

  constructor(private shop: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shop.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
        this.itemsCount =
          response.data.length + response.pageSize * (response.pageIndex - 1);
        console.log(this.products);
      },
      error: (err) => console.error(err),
    });
  }

  getBrands() {
    this.shop.getBrands().subscribe({
      next: (response) => (this.brands = response),
      error: (err) => console.error(err),
    });
  }

  getTypes() {
    this.shop.getTypes().subscribe({
      next: (response) => (this.types = response),
      error: (err) => console.error(err),
    });
  }

  filterByBrand(brandId: number) {
    this.selectedBrand = brandId;
    this.shopParams.brandId = brandId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  filterByType(typeId: number) {
    this.selectedType = typeId;
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  sort(event: any) {
    this.selectedSort = event.target.value;
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event) {
    this.shopParams.pageIndex = event;
    this.getProducts();
  }

  search() {
    this.shopParams.searchTerm = this.searchTerms;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  resetAll() {
    this.shopParams = new ShopParams();
    this.searchTerms = '';
    this.selectedBrand = 0;
    this.selectedType = 0;
    this.selectedSort = '';
    this.getProducts();
  }
}
