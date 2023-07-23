
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {

    swapCurrencies() {
    const tempCurrency = this.currencyFrom;
    this.currencyFrom = this.currencyTo;
    this.currencyTo = tempCurrency;

    if (this.result !== 0 && this.amount !== 0) {
      const tempAmount = this.amount;
      this.amount = this.result;
      this.result = tempAmount;
    }

    this.convertCurrency();
  }

  amount: number = 0;
  currencyFrom: string = 'UAH';
  currencyTo: string = 'USD';
  result: number = 0;
  currencies: string[] = ['UAH', 'USD', 'EUR']; 

  exchangeRates: { [currency: string]: number } = {};

 private apiKey = '03a337a650c87543eada2fe1';
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/all`;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates() {
    this.http.get<any>(this.apiUrl).subscribe(
      (data: any) => {
        this.exchangeRates = data.conversion_rates;
        this.convertCurrency();
      },
      (error: any) => {
        console.error('Ошибка при получении курсов валют:', error);
        this.exchangeRates = {
          UAH: 1,
          USD: 36.5,
          EUR: 39.7
        };
        this.convertCurrency();
      }
    );
  }

  convertCurrency() {
    const rateFrom = this.exchangeRates[this.currencyFrom];
    const rateTo = this.exchangeRates[this.currencyTo];

    if (this.amount && rateFrom && rateTo) {
      if (this.currencyFrom !== this.currencyTo) {
        this.result = (this.amount / rateFrom) * rateTo;
      } else {
        this.result = this.amount; 
      }
       this.result = Math.round(this.result * 100) / 100;
    } else {
      this.result = 0;
    }
  }

  reverseConvertCurrency() {
    const rateFrom = this.exchangeRates[this.currencyFrom];
    const rateTo = this.exchangeRates[this.currencyTo];

    if (this.result && rateFrom && rateTo) {
      if (this.currencyFrom !== this.currencyTo) {
        this.amount = (this.result / rateTo) * rateFrom;
      } else {
        this.amount = this.result; 
      }
       this.result = Math.round(this.result * 100) / 100;
    } else {
      this.amount = 0;
    }
  }
}
