import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'convert-currency',
    loadChildren: () =>
      import('./modules/convert-currency/convert-currency.module').then((m) => m.ConvertCurrencyModule),
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'convert-currency'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'convert-currency'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
