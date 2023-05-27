import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basketCount: number;

  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    const baskeId = localStorage.getItem('basketId');
    if (baskeId) {
      this.basketService.getBasket(baskeId);
      // console.log('basketId: ' + baskeId);
    }

    this.basketService.basketSource$.subscribe({
      next: (res) => {
        if (res) {
          this.basketCount = res.basketItems.length;
          // console.log(this.basketCount);
          // console.log(this.basketService.getCurrentBasketValue());
        }
      },
    });
  }
}
