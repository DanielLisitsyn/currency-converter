import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyService } from './currency.service';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { FormsModule } from '@angular/forms'; 



@NgModule({
  declarations: [AppComponent, HeaderComponent, CurrencyConverterComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule ], 
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
