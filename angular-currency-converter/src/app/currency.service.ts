import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = '03a337a650c87543eada2fe1';
  private apiUrlUsd = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/USD`;
  private apiUrlEur = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/EUR`;

  private currencyRatesUsd$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private currencyRatesEuro$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.updateCurrencyRatesUsd();
    this.updateCurrencyRatesEuro();
  }

  private updateCurrencyRates(apiUrl: string, subject: BehaviorSubject<any>) {
    this.http.get(apiUrl).subscribe((response: any) => {
      if (response && response.conversion_rates) {
        subject.next(response.conversion_rates);
      }
    });
  }

  private updateCurrencyRatesUsd() {
    this.updateCurrencyRates(this.apiUrlUsd, this.currencyRatesUsd$);
  }

  private updateCurrencyRatesEuro() {
    this.updateCurrencyRates(this.apiUrlEur, this.currencyRatesEuro$);
  }

  getCurrencyRates(): Observable<any> {
    return this.currencyRatesUsd$.asObservable().pipe(
      switchMap((usdRates: any) => {
        return this.currencyRatesEuro$.asObservable().pipe(
          map((euroRates: any) => ({ usdRates, euroRates }))
        );
      })
    );
  }

  getEuroRate(): number {
    const rates = this.currencyRatesEuro$.getValue();
    return rates['UAH'] || 0;
  }

  getDollarRate(): number {
    const rates = this.currencyRatesUsd$.getValue();
    return rates['UAH'] || 0;
  }
}
