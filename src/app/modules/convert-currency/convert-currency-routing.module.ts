import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {
    path: 'converter',
    component: ConverterComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'converter'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'converter'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvertCurrencyRoutingModule { }
