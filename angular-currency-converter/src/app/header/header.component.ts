
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  euroToHryvniaRate: number = 0;
  dollarToHryvniaRate: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.subscription = this.currencyService.getCurrencyRates().subscribe((response: any) => {
      this.euroToHryvniaRate = this.currencyService.getEuroRate();
      this.dollarToHryvniaRate = this.currencyService.getDollarRate();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}




