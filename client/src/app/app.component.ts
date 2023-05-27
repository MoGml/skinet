import { Component, OnInit } from '@angular/core';
import { Product } from './shared/models/product';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'skinet';

  productCount: number = 0;

  constructor(private baskerService: BasketService) {}

  ngOnInit(): void {
    // const baskeId = localStorage.getItem('basketId');
    // if (baskeId) {
    //   this.baskerService.getBasket(baskeId);
    // }
  }
}
