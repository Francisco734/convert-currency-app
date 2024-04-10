import { Component, OnInit } from '@angular/core';
import { FLAG_URL } from 'src/app/config/config';
import { catchError, throwError, of, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConvertCurrencyService } from '../../services/convert-currency.service';
import { ConversionHistoryService } from '../../services/conversion-history.service';
import { v4 as uuid } from 'uuid';

type currency = {
  id: number;
  acronym: string;
  description: string;
  flag: string;
  symbol: string;
};

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  amount: string = '';
  loading: boolean = false;
  errors: any[] = [];
  contentdropdown: boolean = false;
  flag_url: string = FLAG_URL;

  currencyFrom: currency[] = [
    {
      id: 1,
      acronym: 'USD',
      description: 'United States Dollar',
      flag: '/unitedstates.png',
      symbol: '$',
    },
    {
      id: 2,
      acronym: 'PLN',
      description: 'Zloty',
      flag: '/poland.png',
      symbol: 'zł',
    },
  ];

  currencyTo: currency[] = [
    {
      id: 1,
      acronym: 'EUR',
      description: 'Euro',
      flag: '/euro.png',
      symbol: '€',
    },
    {
      id: 2,
      acronym: 'CAD',
      description: 'Canadian Dollar',
      flag: '/canada.png',
      symbol: '$',
    },
    {
      id: 3,
      acronym: 'JPY',
      description: 'Japanese Yen',
      flag: '/japan.png',
      symbol: '¥',
    },
    {
      id: 4,
      acronym: 'GBP',
      description: 'British Pound',
      flag: '/unitedkingdom.png',
      symbol: '£',
    },
    {
      id: 5,
      acronym: 'ARS',
      description: 'Argentine Peso',
      flag: '/argentina.png',
      symbol: '$',
    },
    {
      id: 6,
      acronym: 'CNY',
      description: 'Chinese Yuan',
      flag: '/china.png',
      symbol: '¥',
    },
    {
      id: 7,
      acronym: 'KRW',
      description: 'South Korean Won',
      flag: '/southkorea.png',
      symbol: '₩',
    },
    {
      id: 8,
      acronym: 'AUD',
      description: 'Australian Dollar',
      flag: '/australia.png',
      symbol: '$',
    },
    {
      id: 9,
      acronym: 'NZD',
      description: 'New Zealand Dollar',
      flag: '/newzealand.png',
      symbol: '$',
    },
    {
      id: 10,
      acronym: 'XYZ',
      description: 'Dummy Currency',
      flag: '',
      symbol: '',
    },
  ];

  selectedCurrencyFrom: currency = this.currencyFrom[0];
  displayResult: any = [];
  controlResult: boolean = false;

  constructor(
    public convert: ConvertCurrencyService,
    public history: ConversionHistoryService
  ) {}

  ngOnInit(): void {}

  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }

  selectCurrencyFrom(selected: currency) {
    this.selectedCurrencyFrom = selected;
    this.contentdropdown = !this.contentdropdown;
    this.controlResult = false;
  }

  onKey(event: any) {
    this.controlResult = false;
    this.amount = event.target.value;
    this.errors = [];
  }

  convertCurrency() {
    if (this.amount === '') {
      alert('Debe ingresar un importe');
    } else {
      this.loading = true;
      this.displayResult = [];
      this.controlResult = true;
      this.errors = [];
      let storeId = uuid();

      const convertArray = this.currencyTo.map((x) =>
        this.convert
          .convert(this.selectedCurrencyFrom.acronym, x.acronym, this.amount)
          .pipe(
            map((result: any) => {
              result.new_flag = x.flag;
              result.new_description = x.description;
              result.new_symbol = x.symbol
              return result;
            }),
            catchError((err: any) => {
              let excep = {
                msj: err.error.error,
                description: x.description,
                error: true,
              };
              return of(excep);
            })
          )
      );

      merge(...convertArray).subscribe((result: any) => {
        if (result && !result.error) {
          let toStore = {
            amount_origin: result.old_amount,
            currency_origin: result.old_currency,
            description_origin: this.selectedCurrencyFrom.description,
            flag_origin: this.selectedCurrencyFrom.flag,
            symbol_origin: this.selectedCurrencyFrom.symbol,
            amount_final: result.new_amount,
            currency_final: result.new_currency,
            description_final: result.new_description,
            flag_final: result.new_flag,
            symbol_final: result.new_symbol,
            transaction_id: storeId,
          };
          this.displayResult.push(result);
          this.storeConversion(toStore);
        } else {
          this.errors.push(result);
        }
        this.loading = false;
      });
    }
  }

  storeConversion(store: any) {
    this.history
      .store(store)
      .pipe(
        catchError((err: any) => {
          //console.log(err);
          let msj = err.message;
          return throwError(() => new Error(msj));
        })
      )
      .subscribe((data: any) => {
        //console.log(data);
        return true;
      });
  }
}
