import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertCurrencyRoutingModule } from './convert-currency-routing.module';
import { ConverterComponent } from './components/converter/converter.component';
import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './components/history/history.component';


@NgModule({
  declarations: [
    ConverterComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    ConvertCurrencyRoutingModule,
    SharedModule
  ]
})
export class ConvertCurrencyModule { }
