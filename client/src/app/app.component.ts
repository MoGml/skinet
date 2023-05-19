import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'skinet';
  products: Product[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get<Pagination<Product[]>>(
        'https://localhost:5001/api/Products?pageSize=50'
      )
      .subscribe({
        next: (response) => (this.products = response.data),
        error: (err) => console.error(err),
        complete: () => {
          console.log('Completed');
        },
      });
  }
}
