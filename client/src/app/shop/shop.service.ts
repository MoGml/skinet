import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
import { ProductDetails } from '../shared/models/productDetails';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //https://localhost:5001/api/Products?PageIndex=1&PageSize=1&BrandId=1&TypeId=1&Sort=z-a&SearchTerm=a-z

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId > 0)
      params = params.append('BrandId', shopParams.brandId);
    if (shopParams.typeId > 0)
      params = params.append('TypeId', shopParams.typeId);
    if (shopParams.sort) params = params.append('Sort', shopParams.sort);
    params = params.append('PageSize', shopParams.pageSize);
    params = params.append('PageIndex', shopParams.pageIndex);
    if (shopParams.searchTerm)
      params = params.append('SearchTerm', shopParams.searchTerm);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'Products', {
      params: params,
    });
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'Products/brands');
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'Products/types');
  }

  getProductDetails(id: number) {
    return this.http.get<ProductDetails>(this.baseUrl + 'Products/' + id);
  }
}
